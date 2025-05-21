import { Box, Typography, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDrop } from "react-dnd";
import DraggableOrder from "./DraggableOrder";

const Column = ({ title, orders, onDrop, onDelete }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "ORDER",
    drop: (item) => {
      if (item.status !== title) {
        onDrop(item, title);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <Box
      ref={drop}
      sx={{
        minHeight: 400,
        minWidth: 300,
        p: 2,
        backgroundColor: isOver ? "#e3f2fd" : "#f5f5f5",
        borderRadius: 2,
        border: "1px solid #ccc",
        width: 200,
      }}
    >
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      {orders.map((order) => (
        <Box key={order.id} position="relative">
          <DraggableOrder order={order} />
          <IconButton
            onClick={() => onDelete(order.id)}
            sx={{ position: "absolute", top: 10, right: 10 }}
          >
            <DeleteIcon color="error" />
          </IconButton>
        </Box>
      ))}
    </Box>
  );
};

export default Column;
