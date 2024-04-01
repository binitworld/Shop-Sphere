function addToCart(productName, price) {
    alert("Added " + productName + " to the cart. Price: ₹" + price);
}

function addToWatchlist(productName, price) {
    alert("Added " + productName + " to the watchlist. Price: ₹" + price);
}

function removeFromWatchlist(productName) {
    alert("Removed " + productName + " from the watchlist.");
}

document.querySelectorAll('.product').forEach(function(product) {
    var productName = product.querySelector('h3').innerText;
    var productPrice = product.querySelector('p:last-of-type').innerText;

    // Event listener for add to cart button
    product.querySelector('button:nth-of-type(1)').addEventListener('click', function() {
        addToCart(productName, productPrice);
    });

    // Event listener for add to watchlist button
    product.querySelector('button:nth-of-type(2)').addEventListener('click', function() {
        addToWatchlist(productName, productPrice);
    });

    // Check if the product is in the watchlist section
    if (product.closest('#watchlist')) {
        product.querySelector('button:nth-of-type(2)').style.display = 'none'; // Hide 'Add to Watchlist' button
        product.querySelector('button:nth-of-type(3)').addEventListener('click', function() {
            removeFromWatchlist(productName);
        });
    }
});


