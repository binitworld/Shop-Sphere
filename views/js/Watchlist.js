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
