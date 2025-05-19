import { Box } from "@mui/material";

const ImagePreview = ({ images }) => {
  if (!Array.isArray(images)) return null;

  return (
    <Box display="flex" gap={2} flexWrap="wrap">
      {images.map((src, index) => (
        <img
          key={index}
          src={src}
          alt={`preview-${index}`}
          style={{
            width: 100,
            height: 100,
            objectFit: "cover",
            borderRadius: 8,
          }}
        />
      ))}
    </Box>
  );
};

export default ImagePreview;
