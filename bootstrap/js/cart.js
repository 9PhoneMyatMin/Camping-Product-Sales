// Load the cart from localStorage and update the UI
function loadCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartTable = document.getElementById('cart-body');
    let totalPrice = 0;
    cartTable.innerHTML = '';

    cart.forEach((item, index) => {
        let row = `
            <tr>
                <td><img src="${item.image}" width="50"></td>
                <td>${item.name}</td>
                <td>$${item.price.toFixed(2)}</td>
                <td>
                    <button class="btn btn-danger btn-sm" onclick="removeFromCart(${index})">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </td>
            </tr>`;
        cartTable.innerHTML += row;
        totalPrice += item.price;
    });

    document.getElementById('total-price').innerText = `$${totalPrice.toFixed(2)}`;

    // Update badge count
    updateCartBadge();
}


// Remove an item from the cart and refresh UI
function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
}

document.addEventListener("DOMContentLoaded", loadCart);

//add to cart
function addToCart(name, price, image) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Add new item to the cart
    cart.push({ name, price, image });

    // Save updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Update the cart badge
    updateCartBadge();
}

// Function to update the cart badge
function updateCartBadge() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let badge = document.getElementById('cart-badge');
    
    if (cart.length > 0) {
        badge.innerText = cart.length;
        badge.classList.add('badge-danger');
    } else {
        badge.innerText = '';
        badge.classList.remove('badge-danger');
    }
}


// Ensure badge updates when the page loads
document.addEventListener("DOMContentLoaded", function () {
    let confirmOrderBtn = document.getElementById('confirmOrderBtn');

    confirmOrderBtn.addEventListener('click', function () {
        let modalBody = document.querySelector("#orderModal .modal-body");

        // Show success animation
        modalBody.innerHTML = `
            <i class="fas fa-check-circle fa-4x text-success"></i>
            <h4 class="mt-3 text-success">Thank You for Shopping!</h4>
            <p>Your order has been placed successfully.</p>
        `;

        // Remove cart items after a delay
        setTimeout(() => {
            localStorage.removeItem('cart');
            document.getElementById('cart-body').innerHTML = '';
            document.getElementById('total-price').innerText = '$0.00';
            updateCartBadge();

            // Close modal after animation
            setTimeout(() => {
                let orderModal = bootstrap.Modal.getInstance(document.getElementById('orderModal'));
                orderModal.hide();
                resetModal(); // Reset modal content after closing
            }, 1500);
        }, 2000);
    });
});

// Reset modal content for next use
function resetModal() {
    let modalBody = document.querySelector("#orderModal .modal-body");
    modalBody.innerHTML = `
        <i class="fas fa-shopping-cart fa-3x text-primary"></i>
        <p class="mt-3">Are you sure you want to place this order?</p>
    `;
}

//show your card is empty
document.addEventListener("DOMContentLoaded", function () {
    let orderNowBtn = document.querySelector('[data-bs-target="#orderModal"]');

    orderNowBtn.addEventListener("click", function (event) {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        // if (cart.length === 0) {
        //     alert("Your cart is empty! Please add items before ordering.");
        //     event.preventDefault(); // Prevent modal from opening
        // }
    });
});



// Update cart badge
function updateCartBadge() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let badge = document.getElementById('cart-badge');
    
    if (cart.length > 0) {
        badge.innerText = cart.length;
        badge.classList.add('badge-danger');
    } else {
        badge.innerText = '';
        badge.classList.remove('badge-danger');
    }
}
 document.addEventListener('DOMContentLoaded', updateCartBadge);



// Clear the cart completely
function clearCart() {
    localStorage.removeItem('cart');
    loadCart();
}

// Show the order modal with cart details
function showOrderModal() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let modalBody = document.querySelector("#orderModal .modal-body");

    if (cart.length === 0) {
        modalBody.innerHTML = `
            <i class="fas fa-exclamation-circle fa-3x text-danger"></i>
            <h4 class="mt-3 text-danger">Your cart is empty!</h4>
            <p>Please add items before placing an order.</p>
        `;

        // Hide the confirm order button
        document.getElementById('confirmOrderBtn').style.display = "none";
    } else {
        modalBody.innerHTML = `
            <i class="fas fa-shopping-cart fa-3x text-primary"></i>
            <p class="mt-3">Are you sure you want to place this order?</p>
        `;

        // Show the confirm order button
        document.getElementById('confirmOrderBtn').style.display = "block";
    }
}

