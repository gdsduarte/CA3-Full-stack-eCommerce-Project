import React, { useState, useEffect, useRef } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useTheme,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import axios from "axios";
import { addToCart } from "../store/cart/cartActions";

const ProductCard = ({ product }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const amountInputRef = useRef();
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isAdmin, setIsAdmin] = useState(
    localStorage.getItem("isAdmin") === "true"
  );
  const [visible, setVisible] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);

  const handleUpdate = (id) => {
    navigate("/update/" + id);
  };

  const handleNavigateToDetails = (id) => {
    navigate(`/products/${id}`);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/product/delete/${id}`
      );
      if (response.status === 200) {
        setVisible(false);
      }
    } catch (e) {
      console.error("Error deleting product:", e);
    }
    handleCloseDialog();
  };

  const handleAddToCart = () => {
    const amount = amountInputRef.current.value;
    dispatch(addToCart({ product, amount }));
  };

  if (!visible) return null;

  return (
    <React.Fragment>
      <Card
        sx={{
          width: 300,
          height: 480,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          m: 1,
          boxShadow: 3,
          "&:hover": {
            boxShadow: 6,
          },
          transition: "box-shadow 0.1s ease-in-out",
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <Stack
          onClick={() => handleNavigateToDetails(product._id)}
          sx={{ cursor: "pointer" }}
        >
          <CardHeader
            title={product.title}
            titleTypographyProps={{ variant: "h6", color: "text.primary" }}
          />
          <CardMedia
            component="img"
            height="150"
            image={product.images}
            alt="Product image"
            sx={{ objectFit: "contain" }}
          />
          <CardContent>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {product.description}
            </Typography>
            <Rating
              name="half-rating-read"
              defaultValue={product.rating}
              precision={0.5}
              readOnly
            />
            <Typography variant="h6" color="primary" marginTop={1}>
              ${product.price}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Discount: {product.discountPercentage}%
            </Typography>
          </CardContent>
        </Stack>
        <CardActions disableSpacing sx={{ justifyContent: "flex-end" }}>
          {token && isAdmin ? (
            <Stack direction="row" spacing={1}>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => handleUpdate(product._id)}
              >
                Edit
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={handleOpenDialog}
              >
                Delete
              </Button>
            </Stack>
          ) : (
            <Stack direction="row" spacing={1} alignItems="center">
              <Button
                variant="contained"
                startIcon={<AddShoppingCartIcon />}
                onClick={handleAddToCart}
              >
                Add to Cart
              </Button>
              <TextField
                inputRef={amountInputRef}
                size="small"
                type="number"
                label="Qty"
                defaultValue={1}
                InputProps={{ inputProps: { min: 1, max: 10 } }}
              />
            </Stack>
          )}
        </CardActions>
      </Card>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{"Confirm Deletion"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this product? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => handleDelete(product._id)}
            color="error"
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default ProductCard;
