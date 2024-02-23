function addToCart(productName, price) {
    alert("Added " + productName + " to the cart. Price: ₹" + price);
}


function addToWatchlist(productName, price) {
    alert("Added " + productName + " to the watchlist. Price: ₹" + price);
}

function removeFromWatchlist(productName) {
    alert("Removed " + productName + " from the watchlist.");
}

document.querySelectorAll('.product').forEach(function (product) {
    var productName = product.querySelector('h3').innerText;
    var productPrice = product.querySelector('p:last-of-type').innerText;

    product.querySelector('button:nth-of-type(1)').addEventListener('click', function () {
        addToCart(productName, productPrice);
    });

    product.querySelector('button:nth-of-type(2)').addEventListener('click', function () {
        addToWatchlist(productName, productPrice);
    });

    if (product.closest('#watchlist')) {
        product.querySelector('button:nth-of-type(2)').style.display = 'none'; // Hide 'Add to Watchlist' button
        product.querySelector('button:nth-of-type(3)').addEventListener('click', function () {
            removeFromWatchlist(productName);
        });
    }
});
