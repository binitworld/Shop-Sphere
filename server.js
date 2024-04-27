const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const Product = require("./schema/product");
const Feedback = require("./schema/feedback");
const CartItem = require("./schema/cart.js");

var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "html");
app.engine("html", require("ejs").renderFile);

app.use(express.static(path.join(__dirname, "static")));
app.use(express.urlencoded());

// Connecting to MongoDB using Mongoose
mongoose
  .connect(
    "mongodb+srv://admin:admin@cluster0.kjb7ahx.mongodb.net/Shopsphere?retryWrites=true&w=majority&appName=Cluster0",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.get("/", (req, res) => {
  res.status(200).render("index.html");
});

app.get("/payment", (req, res) => {
  res.status(200).render("payment.html");
});

app.get("/watchlist", (req, res) => {
  console.log("done");
  res.status(200).render("watchlist.html");
});

app.get("/categories", (req, res) => {
  res.status(200).render("categories.html");
});

app.get("/men", (req, res) => {
  res.status(200).render("male.html");
});

app.get("/women", (req, res) => {
  res.status(200).render("women.html");
});

app.get("/order-details", (req, res) => {
    res.status(200).render("order-details.html");
  });

app.get("/kids", (req, res) => {
  res.status(200).render("kids.html");
});

app.get("/orders", (req, res) => {
  res.status(200).render("orders.html");
});

app.get("/cart", (req, res) => {
    res.status(200).render("cart.html");
  });

app.get("/buy", async (req, res) => {
  try {
    const { product: productName } = req.query;
    const product = await Product.findOne({ name: productName });

    // Render the product details page and pass the product data
    res.render("product-details.html", { product });
  } catch (err) {
    console.error("Error fetching product details:", err);
    res.status(500).send("Internal Server Error");
  }
});

// Fetching products using Mongoose
app.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    console.log("products", products);
    res.json(products);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ message: err.message });
  }
});

// saving feedback form
app.post("/submitFeedback", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const feedback = new Feedback({ name, email, message });
    await feedback.save();
    res.status(201).json({ message: "Feedback submitted successfully" });
  } catch (error) {
    console.error("Error submitting feedback:", error);
    res
      .status(500)
      .json({ message: "Failed to submit feedback", error: error.message });
  }
});

// get cart items
app.get("/cart-items", async (req, res) => {
    try {

      const cartItems = await CartItem.find();
      res.status(200).json(cartItems);
    } catch (err) {
      console.error("Error fetching cart items:", err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

// add to cart
app.get("/add-to-cart", async (req, res) => {
  try {
    const { product: productName } = req.query;
    const product = await Product.findOne({ name: productName });

    const cartItem = new CartItem({
      name: product.name,
      price: parseFloat(product.price),
      imageUrl: product.imageUrl
    });

    // Save the cart item to the database
    await cartItem.save();

    res.status(200).render("cart.html");
  } catch (err) {
    console.error("Error fetching product details:", err);
    res.status(500).send("Internal Server Error");
  }
});

// Adding a demo product using Mongoose
// app.get("/add-demo-product", async (req, res) => {
//   try {
//     // Create a demo product object
//     const demoProduct = new Product({
//       name: "LittleLuxe Outfit",
//       description: "LittleLuxe Outfit is the perfect choice for your little one's stylish adventures. This outfit combines comfort and sophistication, making it ideal for any occasion. With soft fabrics and trendy designs, your child will feel both fashionable and cozy. Whether it's a playdate or a family outing, the LittleLuxe Outfit ensures that your little one stands out with effortless style.",
//       price: 699,
//       imageUrl: "./Images/kids.png"
//     });

//     // Save the demo product to the database
//     const result = await demoProduct.save();

//     res.status(201).json({ message: "Demo product added successfully", product: result });
//   } catch (err) {
//     console.error("Error adding demo product:", err);
//     res.status(500).json({ message: "Failed to add demo product", error: err.message });
//   }
// });

const port = 8000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
