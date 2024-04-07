const express = require("express");
const app = express();
const path = require("path");
app.use(express.json());
const fs = require("fs");

var bodyParser = require("body-parser");
const { response } = require("express");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "html");
app.engine("html", require("ejs").renderFile);

app.use(express.static(path.join(__dirname, "static")));
app.use(express.urlencoded());  

app.get("/", (req, res) => {
  res.status(200).render("index.html");
  // Define Mongoose schema and model for products
const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number
});

const Product = mongoose.model('Product', productSchema);

document.addEventListener("DOMContentLoaded", function() {
  // Add event listeners for navigation links
  const navLinks = document.querySelectorAll("nav ul li a");
  navLinks.forEach(link => {
      link.addEventListener("click", function(event) {
          event.preventDefault();
          const href = this.getAttribute("href");
          // You can add logic to navigate to the corresponding page using href
          console.log("Navigating to:", href);
      });
  });

  // Add event listeners for "Add to Cart" and "Add to Watchlist" buttons
  const addToCartButtons = document.querySelectorAll("#products .product button:nth-child(1)");
  addToCartButtons.forEach(button => {
      button.addEventListener("click", function(event) {
          event.preventDefault();
          const productName = this.parentElement.querySelector("h3").innerText;
          const productPrice = this.parentElement.querySelector("p").innerText;
          // Example: Add product to cart
          console.log("Adding", productName, "to cart. Price:", productPrice);
          // Example: Save product to MongoDB
          const product = new Product({
              name: productName,
              price: parseFloat(productPrice.replace('₹', '').trim())
          });
          product.save().then(() => {
              console.log("Product saved to MongoDB");
          }).catch((error) => {
              console.log("Error saving product to MongoDB", error);
          });
      });
  });

  const addToWatchlistButtons = document.querySelectorAll("#products .product button:nth-child(2)");
  addToWatchlistButtons.forEach(button => {
      button.addEventListener("click", function(event) {
          event.preventDefault();
          const productName = this.parentElement.querySelector("h3").innerText;
          const productPrice = this.parentElement.querySelector("p").innerText;
          // Example: Add product to watchlist
          console.log("Adding", productName, "to watchlist. Price:", productPrice);
          // Example: Save product to MongoDB
          const product = new Product({
              name: productName,
              price: parseFloat(productPrice.replace('₹', '').trim())
          });
          product.save().then(() => {
              console.log("Product saved to MongoDB");
          }).catch((error) => {
              console.log("Error saving product to MongoDB", error);
          });
      });
  });


app.get("/bag", (req, res) => {
  res.status(200).render("bag.html");
  document.addEventListener("DOMContentLoaded", function() {
    // Add event listeners for navigation links
    const navLinks = document.querySelectorAll("nav ul li a");
    navLinks.forEach(link => {
        link.addEventListener("click", function(event) {
            event.preventDefault();
            const href = this.getAttribute("href");
            // Navigate to the corresponding page using href
            window.location.href = href;
        });
    });
    const removeButtons = document.querySelectorAll(".remove-from-bag");
    removeButtons.forEach(button => {
        button.addEventListener("click", function(event) {
            event.preventDefault();
            const productDiv = this.parentElement;
            const productName = productDiv.querySelector("h3").textContent;
                    // Remove the item from the bag in MongoDB
                    const Bag = require('./models/Bag'); // Assuming you have a model named 'Bag'
                    Bag.deleteOne({ name: productName }).then(() => {
                        console.log("Product removed from bag in MongoDB");
                        // Remove the item from the DOM
                        productDiv.remove();
                    }).catch((error) => {
                        console.log("Error removing product from bag in MongoDB", error);
                    });
                })
                .catch((error) => {
                    console.log("Error connecting to MongoDB", error);
                });
        });
    });
    // Add event listener for checking the cart
    document.addEventListener("DOMContentLoaded", function() {
      // Add event listener for clicking the "Checkout" button
      const checkoutBtn = document.querySelector(".checkout");
      checkoutBtn.addEventListener("click", function() {
          // Navigate to the payment.html page
          window.location.href = "payment.html";
      });
  
      // Add event listener for clicking the "Remove from Bag" button
      const removeBtns = document.querySelectorAll(".remove-from-bag");
      removeBtns.forEach(btn => {
          btn.addEventListener("click", function() {
              // Implement logic to remove the product from the bag
              console.log("Removing from bag...");
          });
      });
  });
  
});

app.get("/categories", (req, res) => {
  res.status(200).render("categories.html");
  document.addEventListener("DOMContentLoaded", function() {
    // Add event listeners for navigation links
    const navLinks = document.querySelectorAll("nav ul li a");
    navLinks.forEach(link => {
        link.addEventListener("click", function(event) {
            event.preventDefault();
            const href = this.getAttribute("href");
            // Navigate to the corresponding page using href
            window.location.href = href;
        });
    });
    
});

app.get("/products", (req, res) => {
  
  res.status(200).render("products.html");
  // Define Mongoose schema and model for products
const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number
});

const Product = mongoose.model('Product', productSchema);

document.addEventListener("DOMContentLoaded", function() {
  // Add event listeners for navigation links
  const navLinks = document.querySelectorAll("nav ul li a");
  navLinks.forEach(link => {
      link.addEventListener("click", function(event) {
          event.preventDefault();
          const href = this.getAttribute("href");
          // Navigate to the corresponding page
          window.location.href = href;
      });
  });

  // Add event listeners for "Add to Cart" and "Add to Watchlist" buttons
  const addToCartButtons = document.querySelectorAll("#products .product button:nth-child(1)");
  addToCartButtons.forEach(button => {
      button.addEventListener("click", function(event) {
          event.preventDefault();
          const productName = this.parentElement.querySelector("h3").innerText;
          const productPrice = this.parentElement.querySelector("p").innerText;
          // Example: Add product to cart
          console.log("Adding", productName, "to cart. Price:", productPrice);
          // Example: Save product to MongoDB
          const product = new Product({
              name: productName,
              price: parseFloat(productPrice.replace('₹', '').trim())
          });
          product.save().then(() => {
              console.log("Product saved to MongoDB");
          }).catch((error) => {
              console.log("Error saving product to MongoDB", error);
          });
      });
  });

  const addToWatchlistButtons = document.querySelectorAll("#products .product button:nth-child(2)");
  addToWatchlistButtons.forEach(button => {
      button.addEventListener("click", function(event) {
          event.preventDefault();
          const productName = this.parentElement.querySelector("h3").innerText;
          const productPrice = this.parentElement.querySelector("p").innerText;
          // Example: Add product to watchlist
          console.log("Adding", productName, "to watchlist. Price:", productPrice);
          // Example: Save product to MongoDB
          const product = new Product({
              name: productName,
              price: parseFloat(productPrice.replace('₹', '').trim())
          });
          product.save().then(() => {
              console.log("Product saved to MongoDB");
          }).catch((error) => {
              console.log("Error saving product to MongoDB", error);
          });
      });
  });

});

app.get("/kids", (req, res) => {
  res.status(200).render("kids.html");
  document.addEventListener("DOMContentLoaded", function() {
    const navLinks = document.querySelectorAll("nav ul li a");
    navLinks.forEach(link => {
        link.addEventListener("click", function(event) {
            event.preventDefault();
            const href = this.getAttribute("href");
            window.location.href = href;
        });
    });

    const addToCartButtons = document.querySelectorAll(".product button:first-of-type");
    addToCartButtons.forEach(button => {
        button.addEventListener("click", function(event) {
            event.preventDefault();
            const productData = getProductData(this);
            addToCart(productData);
        });
    });

    function getProductData(button) {
        const product = button.parentElement;
        const name = product.querySelector("h3").textContent;
        const price = product.querySelector("p").textContent.split(" ")[1];
        return { name, price };
    }

});
app.get("/orders", (req, res) => {
  res.status(200).render("orders.html");
  // Define Mongoose schema and model for orders
const orderSchema = new mongoose.Schema({
  orderNumber: String,
  products: [{
      name: String,
      price: Number
  }],
  totalAmount: Number
});

const Order = mongoose.model('Order', orderSchema);

document.addEventListener("DOMContentLoaded", function() {
  // Add event listeners for navigation links
  const navLinks = document.querySelectorAll("nav ul li a");
  navLinks.forEach(link => {
      link.addEventListener("click", function(event) {
          event.preventDefault();
          const href = this.getAttribute("href");
          // Navigate to the corresponding page
          window.location.href = href;
      });
  });
   // Calculate total amount based on ordered products
    const orderList = document.querySelectorAll("#orders ul li a");
    orderList.forEach(orderLink => {
        orderLink.addEventListener("click", function(event) {
            event.preventDefault();
            // Simulate fetching product prices from the server
            const products = [
                { name: "Product 1", price: 11000 },
                { name: "Product 2", price: 789 },
                // Add more products as needed
            ];
            const totalAmount = products.reduce((total, product) => total + product.price, 0);
            console.log("Total amount:", totalAmount);
            // Example: Save order to MongoDB
            const order = new Order({
                orderNumber: this.innerText,
                products: products,
                totalAmount: totalAmount
            });
            order.save().then(() => {
                console.log("Order saved to MongoDB");
            }).catch((error) => {
                console.log("Error saving order to MongoDB", error);
            });
        });
    });
});

});
app.get("/women", (req, res) => {
  res.status(200).render("women.html");
  document.addEventListener("DOMContentLoaded", function() {
    const navLinks = document.querySelectorAll("nav ul li a");
    navLinks.forEach(link => {
        link.addEventListener("click", function(event) {
            event.preventDefault();
            const href = this.getAttribute("href");
            window.location.href = href;
        });
    });

    const addToCartButtons = document.querySelectorAll(".product button:first-of-type");
    addToCartButtons.forEach(button => {
        button.addEventListener("click", function(event) {
            event.preventDefault();
            const productData = getProductData(this);
            addToCart(productData);
        });
    });

    function getProductData(button) {
        const product = button.parentElement;
        const name = product.querySelector("h3").textContent;
        const price = product.querySelector("p:nth-of-type(3)").textContent.split(" ")[1];
        return { name, price };
    }
});
app.get("/men", (req, res) => {
  res.status(200).render("men.html");
  document.addEventListener("DOMContentLoaded", function() {
    const navLinks = document.querySelectorAll("nav ul li a");
    navLinks.forEach(link => {
        link.addEventListener("click", function(event) {
            event.preventDefault();
            const href = this.getAttribute("href");
            window.location.href = href;
        });
    });

    const addToCartButtons = document.querySelectorAll(".product button:first-of-type");
    addToCartButtons.forEach(button => {
        button.addEventListener("click", function(event) {
            event.preventDefault();
            const productData = getProductData(this);
            addToCart(productData);
        });
    });

    function getProductData(button) {
        const product = button.parentElement;
        const name = product.querySelector("h3").textContent;
        const price = product.querySelector("p").textContent.split(" ")[1];
        return { name, price };
    }
});
app.get("/WatchList", (req, res) => {
  res.status(200).render("add-to-watchlist.html");
  document.addEventListener("DOMContentLoaded", function() {
    // Add event listeners for navigation links
    const navLinks = document.querySelectorAll("nav ul li a");
    navLinks.forEach(link => {
        link.addEventListener("click", function(event) {
            // Prevent default behavior of link click
            event.preventDefault();
            // Get the href attribute of the clicked link
            const href = this.getAttribute("href");
            // Navigate to the corresponding page using the href attribute
            window.location.href = href;
        });
    });

    // Fetch watchlist items from the server only if on the watchlist page
    if (window.location.pathname === "/watchlist.html") {
        fetchWatchlistItems().then(items => {
            displayWatchlistItems(items);
        }).catch(error => {
            console.log("Error fetching watchlist items:", error);
        });
    }

    // Function to fetch watchlist items from the server
    function fetchWatchlistItems() {
        return new Promise((resolve, reject) => {
            // Connect to MongoDB using Mongoose
            const mongoose = require('mongoose');
            const Watchlist = require('./models/Watchlist'); // Assuming you have a model named 'Watchlist'
            mongoose.connect('mongodb://localhost:27017/shopSphereDB', { useNewUrlParser: true, useUnifiedTopology: true })
                .then(() => {
                    console.log('Connected to MongoDB');
                    // Fetch watchlist items from MongoDB
                    Watchlist.find({})
                        .then(items => {
                            resolve(items);
                        })
                        .catch(err => reject(err));
                })
                .catch(err => reject(err));
        });
    }

    // Function to display watchlist items on the page
    function displayWatchlistItems(items) {
        const watchlistSection = document.getElementById("watchlist");
        const watchlistItems = watchlistSection.querySelector(".watchlist-items");
        watchlistItems.innerHTML = ""; // Clear existing items

        items.forEach(item => {
            const productDiv = document.createElement("div");
            productDiv.classList.add("product");

            const img = document.createElement("img");
            img.src = item.image;
            img.alt = item.name;
            productDiv.appendChild(img);

            const h3 = document.createElement("h3");
            h3.textContent = item.name;
            productDiv.appendChild(h3);

            const pDesc = document.createElement("p");
            pDesc.textContent = item.description;
            productDiv.appendChild(pDesc);

            const pPrice = document.createElement("p");
            pPrice.textContent = `₹ ${item.price}`;
            productDiv.appendChild(pPrice);

            const btnRemove = document.createElement("button");
            btnRemove.textContent = "Remove from Watchlist";
            btnRemove.addEventListener("click", function() {
                removeFromWatchlist(item._id);
            });
            productDiv.appendChild(btnRemove);

            watchlistItems.appendChild(productDiv);
        });
    }

    // Function to remove an item from the watchlist
    function removeFromWatchlist(itemId) {
        // Implement logic to remove the item from MongoDB
        console.log("Removing item with ID:", itemId);
    }
});

});
app.get("/addToCart", (req, res) => {
  res.status(200).render("addToCart.html");
  document.addEventListener("DOMContentLoaded", function() {
    // Add event listeners for navigation links
    const navLinks = document.querySelectorAll("nav ul li a");
    navLinks.forEach(link => {
        link.addEventListener("click", function(event) {
            event.preventDefault();
            const href = this.getAttribute("href");
            // Navigate to the corresponding page using href
            window.location.href = href;
        });
    });
    const addToCartButton = document.getElementById("addToCartButton");
    addToCartButton.addEventListener("click", function(event) {
        event.preventDefault();
        // Get product details from the page
        const productName = document.getElementById("productName").innerText;
        const productPrice = parseFloat(document.getElementById("productPrice").innerText.replace('₹', ''));
         // Function to fetch cart items from MongoDB and display them on the screen
    function fetchCartItems() {
      const Cart = require('./models/Cart'); // Assuming you have a model named 'Cart'
      Cart.find({}).then(items => {
          // Display cart items on the screen
          displayCartItems(items);
      }).catch(error => {
          console.log("Error fetching cart items from MongoDB", error);
      });
  }

  // Function to display cart items on the screen
  function displayCartItems(items) {
      const cartContainer = document.getElementById("cartContainer");
      cartContainer.innerHTML = ""; // Clear existing items

      items.forEach(item => {
          const productDiv = document.createElement("div");
          productDiv.classList.add("product");

          const productName = document.createElement("h3");
          productName.textContent = item.name;
          productDiv.appendChild(productName);

          const productPrice = document.createElement("p");
          productPrice.textContent = `₹${item.price}`;
          productDiv.appendChild(productPrice);

          cartContainer.appendChild(productDiv);
      });
  }

});


app.get("/OderDetails", (req, res) => {
  res.status(200).render("order-details.html");
  document.addEventListener("DOMContentLoaded", function() {
    // Add event listeners for navigation links
    const navLinks = document.querySelectorAll("nav ul li a");
    navLinks.forEach(link => {
        link.addEventListener("click", function(event) {
            event.preventDefault();
            const href = this.getAttribute("href");
            // You can add logic to navigate to the corresponding page using href
            console.log("Navigating to:", href);
        });
    });

    const orderId = getOrderIDFromURL(); // You need to implement this function to extract order ID from URL
    fetchOrderDetails(orderId).then(order => {
        displayOrderDetails(order);
    }).catch(error => {
        console.log("Error fetching order details:", error);
    });

    function fetchOrderDetails(orderId) {
        return new Promise((resolve, reject) => {
            // Connect to MongoDB using Mongoose
            const mongoose = require('mongoose');
            const Order = require('./models/Order'); // Assuming you have a model named 'Order'
            mongoose.connect('mongodb://localhost:27017/shopSphereDB', { useNewUrlParser: true, useUnifiedTopology: true })
                .then(() => {
                    console.log('Connected to MongoDB');
                    // Fetch order details by ID from MongoDB
                    Order.findById(orderId)
                        .then(order => {
                            if (!order) {
                                reject('Order not found');
                            } else {
                                resolve(order);
                            }
                        })
                        .catch(err => reject(err));
                })
                .catch(err => reject(err));
        });
    }

    // Function to display order details on the page
    function displayOrderDetails(order) {
        const orderIdElement = document.querySelector("#order-details p:nth-of-type(1)");
        orderIdElement.textContent = "Order ID: #" + order._id;

        const dateElement = document.querySelector("#order-details p:nth-of-type(2)");
        dateElement.textContent = "Date: " + order.date;

        const statusElement = document.querySelector("#order-details p:nth-of-type(3)");
        statusElement.textContent = "Status: " + order.status;

        const itemsList = document.querySelector("#order-details ul");
        itemsList.innerHTML = "";
        order.items.forEach(item => {
            const listItem = document.createElement("li");
            listItem.textContent = `${item.name} - ₹${item.price}`;
            itemsList.appendChild(listItem);
        });

        const totalElement = document.querySelector("#order-details p:last-of-type");
        totalElement.textContent = "Total: ₹" + order.total;
    }
});
app.get("/payment", (req, res) => {
  res.status(200).render("payment.html");
});


const { MongoClient } = require("mongodb");
const uri =
  "mongodb+srv://contactbinitbhushan:CzNGPpIg7AQpMIhP@cluster0.hy7vvyw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB Atlas");
  } catch (error) {
    console.error("Error connecting to MongoDB Atlas:", error);
  }
}
connectToMongoDB();

app.post("/submitFeedback", async (req, res) => {
  try {
    // Save the form data to the database
    await client.db("shopsphare").collection("feedback").insertOne(req.body);


    // Send a success response
    res.send("Feedback submitted successfully!");
  } catch (error) {
    console.error("Error submitting feedback:", error);
    res.status(500).send("Internal Server Error");
  }
});

const port = 8000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
