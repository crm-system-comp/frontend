import { useState } from "react";
import { Box, Dialog, DialogContent, IconButton } from "@mui/material";

const ImagePreview = ({ images }) => {
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  if (!Array.isArray(images)) return null;

  const handleOpen = (src) => {
    setSelectedImage(src);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedImage(null);
  };

  return (
    <>
      <Box display="flex" gap={2} flexWrap="wrap">
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`preview-${index}`}
            onClick={() => handleOpen(src)}
            style={{
              width: 100,
              height: 100,
              objectFit: "cover",
              borderRadius: 8,
              cursor: "pointer",
              transition: "0.2s",
              boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
            }}
          />
        ))}
      </Box>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogContent sx={{ position: "relative", p: 0 }}>
          <IconButton
            onClick={handleClose}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              zIndex: 1,
              color: "#fff",
            }}
          >
            Закрыть
          </IconButton>
          {selectedImage && (
            <img
              src={selectedImage}
              alt="Full preview"
              style={{
                width: "100%",
                height: "auto",
                display: "block",
                maxHeight: "90vh",
                objectFit: "contain",
                backgroundColor: "#000",
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ImagePreview;
