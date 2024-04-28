const functions = require("firebase-functions");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const isAuth = require("./Middleware/auth");
const { DBNAME, MONGODBURI, PORT } = require("./config");
const app = express();

// Routes
const product = require("./Routes/products");
const user = require("./Routes/users");
const order = require("./Routes/orders");

// Specify the origin for CORS
const corsOptions = {
  origin: "https://gdsduarte.github.io",
  optionsSuccessStatus: 200,
};

// Middleware
app.use(express.json());
app.use(cors(corsOptions));
app.use(isAuth);

// Routes setup
app.use("/product", product);
app.use("/users", user);
app.use("/order", order);

// MongoDB Connection
async function connectToMongoDB() {
  try {
    await mongoose.connect(MONGODBURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: DBNAME,
    });
    console.log("Express app connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Express app listening on port ${PORT}`);
    });
  } catch (error) {
    console.error("Could not connect to MongoDB", error);
  }
}

connectToMongoDB();

// Export the API as a function
exports.api = functions.https.onRequest(app);
