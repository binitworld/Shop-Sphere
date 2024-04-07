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

    function addToCart(productData) {
        const mongoose = require('mongoose');
        
                const Product = require('./models/Product');
                const product = new Product(productData);
                product.save().then(() => {
                    window.location.href = "bag.html";
                }).catch((error) => {
                    console.log("Error adding product to cart:", error);
                });

    }
});

add to cart -> database (current)  -> bag -> database(current)