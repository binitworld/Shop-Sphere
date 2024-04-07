const mongoose = require('mongoose');

// Define MongoDB connection string
const connectionString = 'mongodb://localhost:27017/your_database_name';

// Connect to MongoDB
mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to MongoDB");
}).catch((error) => {
    console.log("Error connecting to MongoDB", error);
});

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

    // Add event listeners for submitting feedback form
    const feedbackForm = document.getElementById("feedbackForm");
    feedbackForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const formData = new FormData(this);
        const feedbackData = Object.fromEntries(formData.entries());
        // You can add logic to send feedback data to the server
        console.log("Feedback submitted:", feedbackData);
        this.reset();
    });
});
