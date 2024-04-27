import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Typography,
  Paper,
  Grid,
  Button,
  Stack,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  TextField,
} from "@mui/material";
import Rating from "@mui/material/Rating";
import NavBar from "../components/NavBar";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cart/cartActions";
import CardActions from "@mui/material/CardActions";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();
  const amountInputRef = useRef();
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isAdmin, setIsAdmin] = useState(
    localStorage.getItem("isAdmin") === "true"
  );
  const [visible, setVisible] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/product/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.log("Error fetching product details:", error);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) {
    return <Typography>Loading...</Typography>;
  }

  const handleNavigateBack = () => {
    navigate(-1);
  };

  const handleUpdate = (id) => {
    navigate("/update/" + id);
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
        navigate("/");
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
      <NavBar />
      <Stack sx={{ backgroundColor: "#F4E5C0" }}>
        <br />
      </Stack>
      <Grid container justifyContent="center" sx={{ backgroundColor: "#F4E5C0", minHeight: "100vh", }}>
        <Paper
          elevation={3}
          style={{
            padding: "20px",
            margin: "20px",
            width: "60%",
            height: "80%",
            position: "relative",
          }}
        >
          <IconButton
            onClick={handleNavigateBack}
            sx={{ position: "absolute", top: 20, right: 20 }}
            color="primary"
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" style={{ margin: "20px" }}>
            Product Details
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <img
                src={product.images}
                alt={product.title}
                style={{ width: "100%", height: "auto" }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h4">{product.title}</Typography>
              <Typography variant="body2">{product.brand}</Typography>
              <Rating value={product.rating} readOnly precision={0.5} />
              <Typography variant="body1" gutterBottom>
                {product.description}
              </Typography>
              <Typography variant="h6">${product.price}</Typography>
              <Typography variant="body2">
                Discount: {product.discountPercentage}%
              </Typography>
              <Typography variant="body2">Stock: {product.stock}</Typography>
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
            </Grid>
          </Grid>
        </Paper>
      </Grid>
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

export default ProductDetails;
