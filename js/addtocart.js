// Initialize the cart from localStorage or start with an empty array
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Save cart to localStorage
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Add product to the cart
function addToCart(product) {
    // Check if the product is already in the cart
    const existingProduct = cart.find(item => item.name === product.name);
    if (existingProduct) {
        existingProduct.quantity += 1; // Increase quantity
    } else {
        cart.push(product); // Add new product
    }
    saveCart();
    alert(`${product.name} has been added to the cart.`);
    updateCartCount();
}

// Update cart count in the navbar
function updateCartCount() {
    const countElement = document.getElementById("count");
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    countElement.innerText = totalItems;
}

// Remove product from the cart
function removeFromCart(index) {
    cart.splice(index, 1); // Remove the product at the specified index
    saveCart();
    renderCart(); // Re-render the cart
    updateCartCount(); // Update cart count
}

// Change item quantity in the cart
function changeQuantity(index, delta) {
    cart[index].quantity += delta;
    if (cart[index].quantity <= 0) {
        cart.splice(index, 1); // Remove item if quantity is 0
    }
    saveCart();
    renderCart(); // Re-render the cart
    updateCartCount(); // Update cart count
}

// Render cart items dynamically in the Cart page
function renderCart() {
    const cartItemsContainer = document.getElementById("cart-items");
    const cartTotalElement = document.getElementById("cart-total");
    const subtotalElement = document.getElementById("subtotal-price");
    const totalElement = document.getElementById("total-price");

    cartItemsContainer.innerHTML = ""; // Clear the current cart display

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
        cartTotalElement.innerText = "₹0.00";
        subtotalElement.innerText = "₹0.00";
        totalElement.innerText = "₹50.00"; // Add only shipping fee for now
        return;
    }

    let total = 0;
    cart.forEach((item, index) => {
        const cartItem = document.createElement("div");
        cartItem.classList.add("product");
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div>
                <span>${item.name}</span>
                <p>₹${item.price.toFixed(2)}</p>
                <div class="quantity">
                    <button onclick="changeQuantity(${index}, -1)">-</button>
                    <label>${item.quantity}</label>
                    <button onclick="changeQuantity(${index}, 1)">+</button>
                </div>
            </div>
            <button onclick="removeFromCart(${index})">Remove</button>
        `;
        cartItemsContainer.appendChild(cartItem);
        total += item.price * item.quantity;
    });

    cartTotalElement.innerText = `₹${total.toFixed(2)}`;
    subtotalElement.innerText = `₹${total.toFixed(2)}`;
    totalElement.innerText = `₹${(total + 50).toFixed(2)}`; // Add shipping fee of ₹50
}

// Proceed to checkout (this can be expanded later)
function proceedToCheckout() {
    alert("Proceeding to checkout...");
}

// Attach event listeners to "Add to Cart" buttons
document.addEventListener("DOMContentLoaded", () => {
    // Attach click event listeners to all "Add to Cart" buttons on the home page
    document.querySelectorAll(".add-to-cart-btn").forEach((button) => {
        const productName = button.dataset.name;
        const productPrice = parseFloat(button.dataset.price);
        const productImage = button.dataset.image;

        button.addEventListener("click", () => {
            const product = {
                name: productName,
                price: productPrice,
                image: productImage,
                quantity: 1
            };
            addToCart(product); // Add product to the cart
        });
    });

    // Render the cart when the Cart page is loaded
    renderCart();

    // Update cart count in the navigation bar
    updateCartCount();
});