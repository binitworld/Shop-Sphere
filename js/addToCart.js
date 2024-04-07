import connectToMongoDB from connectToMongo;

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

    // Add event listener for submitting feedback form
    const feedbackForm = document.getElementById("feedbackForm");

    feedbackForm.addEventListener('submit', function(event) {

        
        // event.preventDefault();
        const formData = new FormData(this);
        const feedbackData = {};
        formData.forEach((value, key) => {
            feedbackData[key] = value;
        });
        // Connect to MongoDB using Mongoose
        // Call the function to connect to MongoDB Atlas
        connectToMongoDB();
    });

    // Add event listener for "Add to Cart" button
    const addToCartButton = document.getElementById("addToCartButton");
    addToCartButton.addEventListener("click", function(event) {
        event.preventDefault();
        // Get product details from the page
        const productName = document.getElementById("productName").innerText;
        const productPrice = parseFloat(document.getElementById("productPrice").innerText.replace('₹', ''));
        // Connect to MongoDB using Mongoose
        mongoose.connect('mongodb://localhost:27017/shopSphereDB', { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => {
                console.log('Connected to MongoDB');
                // Save product to the cart in MongoDB
                const Cart = require('./models/Cart'); // Assuming you have a model named 'Cart'
                const product = new Cart({
                    name: productName,
                    price: productPrice
                });
                product.save().then(() => {
                    console.log("Product added to cart in MongoDB");
                    // Fetch and display cart items
                    fetchCartItems();
                }).catch((error) => {
                    console.log("Error adding product to cart in MongoDB", error);
                });
            })
            .catch((error) => {
                console.log("Error connecting to MongoDB", error);
            });
    });

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
