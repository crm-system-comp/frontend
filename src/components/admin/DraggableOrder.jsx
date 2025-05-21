import { useDrag } from "react-dnd";
import OrderCard from "../../components/OrderCard";

const DraggableOrder = ({ order }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "ORDER",
    item: order,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
      <OrderCard order={order} />
    </div>
  );
};

export default DraggableOrder;
