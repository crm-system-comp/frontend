import { useState } from "react";
import {
  TextField,
  Button,
  Stack,
  Typography,
  InputLabel,
  Alert,
} from "@mui/material";
import ImagePreview from "./ImagePreview";
import { useCreateOrderMutation } from "../api/orders";

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
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
        {isSuccess && <Alert severity="success">Заказ успешно создан!</Alert>}
        <TextField
          label="Тип"
          name="type"
          value={formData.type}
          onChange={handleChange}
          required
        />
        <TextField
          label="Размер"
          name="size"
          value={formData.size}
          onChange={handleChange}
          required
        />
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
          required
        />
        <TextField
          label="Общая цена"
          name="total_price"
          type="number"
          value={formData.total_price}
          onChange={handleChange}
          required
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
          <InputLabel>Загрузить изображения</InputLabel>
          <input type="file" multiple accept="image/*" onChange={handleImageChange} />
        </div>
        {imagePreviews.length > 0 && <ImagePreview images={imagePreviews} />}
        <Button type="submit" variant="contained" color="primary" disabled={isLoading}>
          {isLoading ? "Отправка..." : "Создать заказ"}
        </Button>
      </Stack>
    </form>
  );
};

export default OrderForm;
