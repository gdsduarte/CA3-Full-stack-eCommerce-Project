const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const isAuth = require("./middleware/auth");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT;
const mongoDBUri = process.env.mongoDBUri;
const DBNAME = process.env.DBNAME;

const product = require("./Routes/products");
const user = require("./Routes/users");
const order = require("./Routes/orders");

app.use(express.json());
app.use(cors());
app.use(isAuth);
app.use("/product", product);
app.use("/users", user);
app.use("/order", order);

async function connectToMongoDB() {
  try {
    await mongoose.connect(mongoDBUri, {
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
