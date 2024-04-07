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
