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

    // Fetch order details from the server based on order ID
    const orderId = getOrderIDFromURL(); // You need to implement this function to extract order ID from URL
    fetchOrderDetails(orderId).then(order => {
        displayOrderDetails(order);
    }).catch(error => {
        console.log("Error fetching order details:", error);
    });

    // Function to fetch order details from the server
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
