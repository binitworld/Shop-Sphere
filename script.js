function displayFeaturedProducts() {
    fetch('https://api.example.com/products/featured')
        .then(response => response.json())
        .then(data => {
            const productsSection = document.getElementById('products');
            productsSection.innerHTML = '<h2>Featured Products</h2>';
            data.forEach(product => {
                const productElement = document.createElement('div');
                productElement.classList.add('product');
                productElement.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <p>Price: ${product.price}</p>
                `;
                productsSection.appendChild(productElement);
            });
        })
        .catch(error => {
            console.error('Error fetching featured products:', error);
        });
}

function displayUserOrders() {
    fetch('https://api.example.com/orders/user')
        .then(response => response.json())
        .then(data => {
            const ordersSection = document.getElementById('orders');
            ordersSection.innerHTML = '<h2>Your Orders</h2>';
            data.forEach(order => {
                const orderLink = document.createElement('a');
                orderLink.href = `order-details.html?id=${order.id}`;
                orderLink.textContent = `Order #${order.id}`;
                ordersSection.appendChild(orderLink);
                ordersSection.appendChild(document.createElement('br'));
            });
        })
        .catch(error => {
            console.error('Error fetching user orders:', error);
        });
}

function displayUserWatchlist() {
    fetch('https://api.example.com/watchlist/user')
        .then(response => response.json())
        .then(data => {
            const watchlistSection = document.getElementById('watchlist');
            watchlistSection.innerHTML = '<h2>Your Watchlist</h2>';
            data.forEach(item => {
                const itemElement = document.createElement('div');
                itemElement.classList.add('watchlist-item');
                itemElement.textContent = item.name;
                watchlistSection.appendChild(itemElement);
            });
        })
        .catch(error => {
            console.error('Error fetching user watchlist:', error);
        });
}

function displayProductCategories() {
    fetch('https://api.example.com/categories')
        .then(response => response.json())
        .then(data => {
            const categoriesSection = document.getElementById('categories');
            categoriesSection.innerHTML = '<h2>Shop by Category</h2>';
            const categoriesList = document.createElement('ul');
            data.forEach(category => {
                const categoryItem = document.createElement('li');
                categoryItem.textContent = category.name;
                categoriesList.appendChild(categoryItem);
            });
            categoriesSection.appendChild(categoriesList);
        })
        .catch(error => {
            console.error('Error fetching product categories:', error);
        });
}

window.onload = function() {
    displayFeaturedProducts();
    displayUserOrders();
    displayUserWatchlist();
    displayProductCategories();
};
