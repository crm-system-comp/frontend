import { useState, useEffect, useRef } from "react";
import {
  TextField,
  Button,
  Stack,
  Typography,
  InputLabel,
  Alert,
  MenuItem,
  Select,
  FormControl,
  FormHelperText,
} from "@mui/material";
import ImagePreview from "./ImagePreview";
import { useCreateOrderMutation } from "../api/orders";
import { NavLink } from "react-router-dom";
import { isLoggedIn } from "../../session";

const SIZE_OPTIONS = ["A4", "A3", "A2", "A1"];
const TYPE_PRICES = {
  картина: 150,
  постер: 100,
};

const OrderForm = ({ user, onAuthRequired }) => {
  const [formData, setFormData] = useState({
    type: "",
    size: "",
    style: "",
    quantity: 1,
    total_price: "",
    full_name: "",
    contact_info: "",
  });
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [error, setError] = useState(null);

  const [createOrder, { isLoading, isSuccess }] = useCreateOrderMutation();
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "quantity" ? parseInt(value) || 1 : value,
    }));
  };

  useEffect(() => {
    if (formData.type && formData.quantity > 0) {
      const pricePerItem = TYPE_PRICES[formData.type] || 0;
      const total = pricePerItem * formData.quantity;
      setFormData((prev) => ({
        ...prev,
        total_price: total,
      }));
    }
  }, [formData.type, formData.quantity]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLoggedIn()) {
      onAuthRequired();
      return;
    }

    try {
      await createOrder({
        ...formData,
        files: images,
      }).unwrap();
      setFormData({
        type: "",
        size: "",
        style: "",
        quantity: 1,
        total_price: "",
        full_name: "",
        contact_info: "",
      });
      setImages([]);
      setImagePreviews([]);
      setError(null);
    } catch (err) {
      console.error("Ошибка при создании заказа:", err);
      setError("Не удалось создать заказ. Попробуйте позже.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={3}>
        {error && <Alert severity="error">{error}</Alert>}
        {isSuccess && (
          <Alert severity="success">
            Заказ успешно создан! <br />
            Посмотреть статус заказа можно в{" "}
            <NavLink to={"/profile"} style={{ color: "blue" }}>
              личном кабинете
            </NavLink>
          </Alert>
        )}

        <FormControl required>
          <InputLabel id="type-label">Тип</InputLabel>
          <Select
            labelId="type-label"
            name="type"
            value={formData.type}
            onChange={handleChange}
          >
            <MenuItem value="картина">Картина</MenuItem>
            <MenuItem value="постер">Постер</MenuItem>
          </Select>
        </FormControl>

        <FormControl required>
          <InputLabel id="size-label">Размер</InputLabel>
          <Select
            labelId="size-label"
            name="size"
            value={formData.size}
            onChange={handleChange}
          >
            {SIZE_OPTIONS.map((size) => (
              <MenuItem key={size} value={size}>
                {size}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="Стиль (необязательно)"
          name="style"
          value={formData.style}
          onChange={handleChange}
        />

        <TextField
          label="Количество"
          name="quantity"
          type="number"
          value={formData.quantity}
          onChange={handleChange}
          inputProps={{ min: 1 }}
          required
        />

        <TextField
          label="Общая цена"
          name="total_price"
          type="number"
          value={formData.total_price}
          disabled
        />

        <TextField
          label="ФИО"
          name="full_name"
          value={formData.full_name}
          onChange={handleChange}
          required
        />

        <TextField
          label="Контактная информация"
          name="contact_info"
          value={formData.contact_info}
          onChange={handleChange}
          required
        />
        <div>
          <InputLabel>Изображения*</InputLabel>
          <Button
            variant="outlined"
            onClick={() => fileInputRef.current.click()}
          >
            Загрузить изображения
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleImageChange}
            required
          />
        </div>

        {imagePreviews.length > 0 && <ImagePreview images={imagePreviews} />}

        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={isLoading}
        >
          {isLoading ? "Отправка..." : "Создать заказ"}
        </Button>
      </Stack>
    </form>
  );
};

export default OrderForm;
