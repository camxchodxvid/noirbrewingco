document.addEventListener("DOMContentLoaded", function () {
    const storyText = document.querySelector(".story-text");

    const observer = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    storyText.classList.add("show");
                    observer.unobserve(entry.target); // Stop observing once shown
                }
            });
        },
        { threshold: 0.7 } // Trigger when 50% of the text is visible
    );

    observer.observe(storyText);
});

document.addEventListener("DOMContentLoaded", function () {
    const cartIcon = document.querySelector(".cart-icon");
    const cartCount = document.querySelector(".cart-count");
    const cartDropdown = document.querySelector(".cart-dropdown");
    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    function updateCartCount() {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
        cartCount.style.display = totalItems > 0 ? "block" : "none";
    }

    function updateCartDropdown() {
        cartDropdown.innerHTML = cart
            .map(
                (item, index) => `
                <div class="cart-item">
                    <span>${item.name} x${item.quantity}</span>
                    <button class="remove-item" data-index="${index}">X</button>
                </div>`
            )
            .join("");

        document.querySelectorAll(".remove-item").forEach(button => {
            button.addEventListener("click", function () {
                const index = this.getAttribute("data-index");
                cart.splice(index, 1);
                localStorage.setItem("cart", JSON.stringify(cart));
                updateCartCount();
                updateCartDropdown();
            });
        });
    }

    addToCartButtons.forEach(button => {
        button.addEventListener("click", function () {
            const productName = this.getAttribute("data-name");
            const existingItem = cart.find(item => item.name === productName);

            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({ name: productName, quantity: 1 });
            }

            localStorage.setItem("cart", JSON.stringify(cart));
            updateCartCount();
            updateCartDropdown();
        });
    });

    cartIcon.addEventListener("click", function () {
        cartDropdown.classList.toggle("active");
    });

    updateCartCount();
    updateCartDropdown();
});

let cartCount = 0;
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        cartCount++;
        document.getElementById('cart-count').innerText = cartCount;
    });
});
