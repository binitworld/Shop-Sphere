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

    // Add event listener for removing items from the bag
    const removeButtons = document.querySelectorAll(".remove-from-bag");
    removeButtons.forEach(button => {
        button.addEventListener("click", function(event) {
            event.preventDefault();
            const productDiv = this.parentElement;
            const productName = productDiv.querySelector("h3").textContent;
            // Connect to MongoDB using Mongoose
            mongoose.connect('mongodb://localhost:27017/shopSphereDB', { useNewUrlParser: true, useUnifiedTopology: true })
                .then(() => {
                    console.log('Connected to MongoDB');
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
