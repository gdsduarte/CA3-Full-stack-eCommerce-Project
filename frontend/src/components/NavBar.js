import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import { IconButton } from "@mui/material";
import { useSelector } from "react-redux";
import logo from "../img/logo_2.png";
import ButtonBase from "@mui/material/ButtonBase";
import { AuthContext } from "../context/authContext";

const NavBar = () => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const items = useSelector((state) => state.cartStore.addedItems);
  const [token, setToken] = useState();
  const [isAdmin, setIsAdmin] = useState();

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    setIsAdmin(localStorage.getItem("isAdmin"));
  }, [token]);

  const goToHome = () => {
    navigate("/MERN-App");
  };

  const goToAddProduct = () => {
    navigate("/addProduct");
  };

  const goToLogin = () => {
    navigate("/login");
  };

  const logOut = () => {
    localStorage.clear();
    setIsAdmin(null);
    setToken(null);
    authContext.logout();
    navigate("/MERN-App");
    window.location.reload();
  };

  const goToCart = () => {
    navigate("/cart");
  };

  const goToOrders = () => {
    navigate("/orders");
  };

  return (
    <React.Fragment>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="sticky" sx={{ background: "#000000" }}>
          <Toolbar sx={{ justifyContent: "center" }}>
            <ButtonBase
              sx={{ position: "absolute", left: 20 }}
              onClick={goToHome}
            >
              <Box
                component="img"
                sx={{ width: "8rem", height: "3rem" }}
                src={logo}
              />
            </ButtonBase>
            <Box
              sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}
            >
              <Button color="inherit" onClick={goToHome}>
                Home
              </Button>
              {token && isAdmin === "false" && (
                <Button color="inherit" onClick={goToOrders}>
                  Orders
                </Button>
              )}
              {isAdmin === "false" &&  (
                <Button onClick={goToCart} style={{ color: "white" }} color="inherit">
                  <Badge badgeContent={items.length} color="secondary">
                    Cart
                  </Badge>
                </Button>
              )}
              {isAdmin === "true" && (
                <Button color="inherit" onClick={goToAddProduct}>
                  Add product
                </Button>
              )}
              {!token ? (
                <Button color="inherit" onClick={goToLogin}>
                  Login
                </Button>
              ) : (
                <Button color="inherit" onClick={logOut}>
                  LogOut
                </Button>
              )}
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    </React.Fragment>
  );
};

export default NavBar;
