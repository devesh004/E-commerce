const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const orderRoute = require("./routes/order");
const stripeRoute = require("./routes/stripe");
const path = require("path");
const cors = require("cors");
mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log("Mongoose Connected!"))
  .catch((err) => console.log(err));

app.use(cors());
app.use(express.json());

// app.get("/", (req, res) => {
//   res.send("HOME PAGE");
// });

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/products", productRoute);
app.use("/api/orders", orderRoute);
app.use("/api/checkout", stripeRoute);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client_admin/build"));
  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "client_admin", "build", "index.html")
    );
  });
}

app.listen(process.env.PORT || 3000, () => {
  console.log("listing port 3000");
});
