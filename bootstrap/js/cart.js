            
document.addEventListener("DOMContentLoaded", () => {
  loadCart();
  updateCartBadge();
});

// Function to open the modal
function openOrderModal() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart.length === 0) {
        alert("Your cart is empty. Add items before ordering!");
        return;
    }
    document.getElementById("modal-cart-total").textContent = document.getElementById("cart-total").textContent;
    document.getElementById("orderModal").style.display = "flex";
}

// Function to close the modal
function closeOrderModal() {
    document.getElementById("orderModal").style.display = "none";
}

// Function to confirm order
function confirmOrder() {
    alert("🎉 Order placed successfully! Thank you for shopping.");
    clearCart();
    closeOrderModal();
}

// Function to add product to cart
function addToCart(name, price, imgSrc) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name, price, imgSrc, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartBadge(); // Update the badge
    loadCart();
}


// Function to load cart items
function loadCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartItemsContainer = document.getElementById("cart-items");
    let cartTotal = document.getElementById("cart-total");
    cartItemsContainer.innerHTML = "";
    let total = 0;
    cart.forEach((item, index) => {
        let itemTotal = item.price * item.quantity;
        total += itemTotal;
        let row = document.createElement("tr");
        row.innerHTML = `
            <td><img src="${item.imgSrc}" class="rounded" width="50"></td>
            <td>
                ${item.name} 
                <button class="btn btn-danger btn-sm ms-2" onclick="removeFromCart(${index})"><i class="fa-solid fa-trash"></i></button>
            </td>
            <td class="text-primary fw-bold">$${item.price.toFixed(2)}</td>
            <td>
                <div class="d-flex align-items-center justify-content-center">
                    <button class="btn btn-sm btn-outline-secondary" onclick="updateQuantity(${index}, -1)">&#9660;</button>
                    <span class="mx-2 fw-bold">${item.quantity}</span>
                    <button class="btn btn-sm btn-outline-secondary" onclick="updateQuantity(${index}, 1)">&#9650;</button>
                </div>
            </td>
            <td class="text-success fw-bold">$${itemTotal.toFixed(2)}</td>
        `;
        cartItemsContainer.appendChild(row);
    });
    cartTotal.textContent = `$${total.toFixed(2)}`;
    updateCartBadge();
}

//CartBadge
function updateCartBadge() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    let cartBadge = document.getElementById("cart-badge");
    cartBadge.textContent = totalItems;
    cartBadge.style.display = totalItems > 0 ? "inline-block" : "none";
}


// Function to update quantity
function updateQuantity(index, change) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart[index].quantity += change;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

// Function to remove an item
function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

// Function to clear the cart
function clearCart() {
    localStorage.removeItem("cart");
    loadCart();
}
