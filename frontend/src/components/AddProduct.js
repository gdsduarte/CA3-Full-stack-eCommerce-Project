import React, { useState } from "react";
import { Grid, Paper, TextField, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddProduct = () => {
  const navigate = useNavigate();
  const [productData, setProductData] = useState({
    title: "",
    brand: "",
    category: "",
    description: "",
    discountPercentage: "",
    images: "",
    price: "",
    rating: "",
    stock: "",
    thumbnail: "",
  });
  const [errors, setErrors] = useState({});

  const handleInputChanges = (event) => {
    const { name, value } = event.target;
    setProductData({ ...productData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    let tempErrors = {};
    Object.entries(productData).forEach(([key, value]) => {
      if (!value) {
        tempErrors[key] = "This field is required";
      }
    });
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    try {
      const response = await axios.post(
        "http://localhost:5000/product/create",
        productData
      );
      if (response.status === 201) {
        navigate("/");
      }
    } catch (e) {
      console.error("Error when attempting to save product:", e);
    }
  };

  return (
    <React.Fragment>
      <Grid
        container
        alignContent="center"
        justifyContent="center"
        style={{ backgroundColor: "#F4E5C0", minHeight: "100vh", paddingBottom: 80}}
      >
        <Paper
          elevation={3}
          style={{
            width: 550,
          }}
        >
          <Grid container direction="column" alignItems="center" gap={3}>
            <br />
            <Grid item>
              <Typography variant="h5">Add product</Typography>
            </Grid>

            <Grid item>
              <Grid container direction="row" gap={3}>
                <Grid item>
                  <Grid container direction="column" gap={2}>
                    <Grid item>
                      <TextField
                        label="Title"
                        variant="outlined"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        value={productData.title}
                        name="title"
                        onChange={handleInputChanges}
                        error={!!errors.title}
                        helperText={errors.title}
                      />
                    </Grid>

                    <Grid item>
                      <TextField
                        label="Brand"
                        variant="outlined"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        value={productData.brand}
                        name="brand"
                        onChange={handleInputChanges}
                        error={!!errors.brand}
                        helperText={errors.brand}
                      />
                    </Grid>

                    <Grid item>
                      <TextField
                        label="Category"
                        variant="outlined"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        value={productData.category}
                        name="category"
                        onChange={handleInputChanges}
                        error={!!errors.category}
                        helperText={errors.category}
                      />
                    </Grid>

                    <Grid item>
                      <TextField
                        label="Description"
                        variant="outlined"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        value={productData.description}
                        name="description"
                        onChange={handleInputChanges}
                        error={!!errors.description}
                        helperText={errors.description}
                      />
                    </Grid>

                    <Grid item>
                      <TextField
                        label="Discount Percentage"
                        variant="outlined"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        type="number"
                        value={productData.discountPercentage}
                        name="discountPercentage"
                        onChange={handleInputChanges}
                        error={!!errors.discountPercentage}
                        helperText={errors.discountPercentage}
                      />
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item>
                  <Grid container direction="column" gap={2}>
                    <Grid item>
                      <TextField
                        label="Image link"
                        variant="outlined"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        value={productData.images}
                        name="images"
                        onChange={handleInputChanges}
                        error={!!errors.images}
                        helperText={errors.images}
                      />
                    </Grid>

                    <Grid item>
                      <TextField
                        label="Price"
                        variant="outlined"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        type="number"
                        value={productData.price}
                        name="price"
                        onChange={handleInputChanges}
                        error={!!errors.price}
                        helperText={errors.price}
                      />
                    </Grid>

                    <Grid item>
                      <TextField
                        label="Rating"
                        variant="outlined"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        type="number"
                        value={productData.rating}
                        name="rating"
                        onChange={handleInputChanges}
                        error={!!errors.rating}
                        helperText={errors.rating}
                      />
                    </Grid>

                    <Grid item>
                      <TextField
                        label="Stock"
                        variant="outlined"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        type="number"
                        value={productData.stock}
                        name="stock"
                        onChange={handleInputChanges}
                        error={!!errors.stock}
                        helperText={errors.stock}
                      />
                    </Grid>

                    <Grid item>
                      <TextField
                        label="Thumbnail"
                        variant="outlined"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        value={productData.thumbnail}
                        name="thumbnail"
                        onChange={handleInputChanges}
                        error={!!errors.thumbnail}
                        helperText={errors.thumbnail}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid container item justifyContent="space-evenly" gap={1}>
              <Button variant="contained" color="primary" onClick={handleSave}>
                Save
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => navigate("/")}
              >
                Cancel
              </Button>
            </Grid>
            <Grid item></Grid>
          </Grid>
        </Paper>
      </Grid>
    </React.Fragment>
  );
};

export default AddProduct;
