// ========================================
// GET CART FROM LOCAL STORAGE
// ========================================

let cart =
    JSON.parse(localStorage.getItem("cart")) || [];


const cartItems =
    document.querySelector("#cart-items");


// ========================================
// DISPLAY CART
// ========================================

function displayCart() {

    cartItems.innerHTML = "";


    // ====================================
    // EMPTY CART
    // ====================================

    if (cart.length === 0) {

        cartItems.innerHTML = `

            <div class="empty-cart">

                <h2>
                    Your cart is empty
                </h2>

                <a href="index.html">
                    Continue Shopping
                </a>

            </div>

        `;

        return;

    }


    // ====================================
    // DISPLAY PRODUCTS
    // ====================================

    cart.forEach(
        (item, index) => {

            const cartItem =
                document.createElement(
                    "div"
                );


            cartItem.classList.add(
                "cart-item"
            );


            cartItem.innerHTML = `

                <img
                    src="${item.image}"
                    alt="${item.name}"
                >


                <div class="cart-item-info">

                    <h3>
                        ${item.name}
                    </h3>


                    ${
                        item.color
                            ? `
                                <p>
                                    Color:
                                    ${item.color}
                                </p>
                            `
                            : ""
                    }


                    ${
                        item.size
                            ? `
                                <p>
                                    Size:
                                    ${item.size}
                                </p>
                            `
                            : ""
                    }


                    <strong>
                        $${Number(item.price).toFixed(2)}
                    </strong>

                </div>


                <div class="cart-item-actions">

                    <div class="quantity-controls">

                        <button
                            class="decrease-item"
                            data-index="${index}"
                        >
                            -
                        </button>


                        <span>
                            ${item.quantity}
                        </span>


                        <button
                            class="increase-item"
                            data-index="${index}"
                        >
                            +
                        </button>

                    </div>


                    <button
                        class="remove-item"
                        data-index="${index}"
                    >
                        Remove
                    </button>

                </div>

            `;


            cartItems.appendChild(
                cartItem
            );

        }
    );

}


// ========================================
// UPDATE ORDER SUMMARY
// ========================================

function updateSummary() {

    let subtotal = 0;

    let discount = 0;


    // ====================================
    // CALCULATE SUBTOTAL AND DISCOUNT
    // ====================================

    cart.forEach(
        item => {

            const quantity =
                Number(item.quantity) || 0;


            const price =
                Number(item.price) || 0;


            const originalPrice =
                Number(item.originalPrice) || price;


            // ====================================
            // SUBTOTAL
            // ====================================

            subtotal +=
                originalPrice * quantity;


            // ====================================
            // PRODUCT DISCOUNT
            // ====================================

            if (
                Number(item.discount) > 0 &&
                originalPrice > price
            ) {

                discount +=
                    (
                        originalPrice -
                        price
                    ) * quantity;

            }

        }
    );


    // ====================================
    // DELIVERY
    // ====================================

    const delivery =
        cart.length > 0
            ? 15
            : 0;


    // ====================================
    // TOTAL
    // ====================================

    const total =
        subtotal -
        discount +
        delivery;


    // ====================================
    // DISPLAY VALUES
    // ====================================

    const subtotalElement =
        document.querySelector(
            "#subtotal"
        );


    const discountElement =
        document.querySelector(
            "#discount"
        );


    const deliveryElement =
        document.querySelector(
            "#delivery"
        );


    const totalElement =
        document.querySelector(
            "#total"
        );


    if (subtotalElement) {

        subtotalElement.textContent =
            `$${subtotal.toFixed(2)}`;

    }


    if (discountElement) {

        discountElement.textContent =
            `-$${discount.toFixed(2)}`;

    }


    if (deliveryElement) {

        deliveryElement.textContent =
            `$${delivery.toFixed(2)}`;

    }


    if (totalElement) {

        totalElement.textContent =
            `$${total.toFixed(2)}`;

    }

}


// ========================================
// SAVE CART
// ========================================

function saveCart() {

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

}


// ========================================
// CART BUTTONS
// ========================================

cartItems.addEventListener(
    "click",
    function(event) {


        // ====================================
        // INCREASE QUANTITY
        // ====================================

        if (
            event.target.classList.contains(
                "increase-item"
            )
        ) {

            const index =
                Number(
                    event.target.dataset.index
                );


            const productId =
                cart[index].id;


            // Get product stock

            fetch("data/products.json")

                .then(
                    response =>
                        response.json()
                )

                .then(
                    products => {

                        const product =
                            products.find(
                                item =>
                                    String(item.id) ===
                                    String(productId)
                            );


                        if (!product) {

                            console.error(
                                "Product not found."
                            );

                            return;

                        }


                        const stock =
                            Number(
                                product.stock
                            ) || 0;


                        const currentQuantity =
                            Number(
                                cart[index].quantity
                            ) || 0;


                        // ====================================
                        // CHECK STOCK
                        // ====================================

                        if (
                            currentQuantity >=
                            stock
                        ) {

                            alert(
                                `Only ${stock} items are available.`
                            );

                            return;

                        }


                        // ====================================
                        // INCREASE QUANTITY
                        // ====================================

                        cart[index].quantity++;


                        saveCart();

                        displayCart();

                        updateSummary();

                    }
                )

                .catch(
                    error => {

                        console.error(
                            "Could not load product stock:",
                            error
                        );

                    }
                );

        }


        // ====================================
        // DECREASE QUANTITY
        // ====================================

        if (
            event.target.classList.contains(
                "decrease-item"
            )
        ) {

            const index =
                Number(
                    event.target.dataset.index
                );


            if (
                cart[index].quantity > 1
            ) {

                cart[index].quantity--;


                saveCart();

                displayCart();

                updateSummary();

            }

        }


        // ====================================
        // REMOVE ITEM
        // ====================================

        if (
            event.target.classList.contains(
                "remove-item"
            )
        ) {

            const index =
                Number(
                    event.target.dataset.index
                );


            cart.splice(
                index,
                1
            );


            saveCart();

            displayCart();

            updateSummary();

        }

    }
);


// ========================================
// CHECKOUT
// ========================================

const checkoutButton =
    document.querySelector(
        "#checkout"
    );


if (checkoutButton) {

    checkoutButton.addEventListener(
        "click",
        function() {

            if (cart.length === 0) {

                alert(
                    "Your cart is empty."
                );

                return;

            }


            window.location.href =
                "checkout.html";

        }
    );

}


// ========================================
// INITIAL DISPLAY
// ========================================

displayCart();

updateSummary();


    // ========================================
// SHOP DROPDOWN
// ========================================

const shopDropdown =
    document.querySelector(".shop-dropdown");

const shopDropdownButton =
    document.querySelector(
        "#shop-dropdown-button"
    );

const shopDropdownMenu =
    document.querySelector(
        "#shop-dropdown-menu"
    );


// ========================================
// TOGGLE DROPDOWN
// ========================================

if (
    shopDropdown &&
    shopDropdownButton &&
    shopDropdownMenu
) {

    shopDropdownButton.addEventListener(
        "click",
        function(event) {

            event.stopPropagation();

            shopDropdownMenu.classList.toggle(
                "show"
            );

            shopDropdown.classList.toggle(
                "open"
            );

        }
    );


    // ====================================
    // CLOSE WHEN CLICKING OUTSIDE
    // ====================================

    document.addEventListener(
        "click",
        function(event) {

            if (
                !shopDropdown.contains(
                    event.target
                )
            ) {

                shopDropdownMenu.classList.remove(
                    "show"
                );

                shopDropdown.classList.remove(
                    "open"
                );

            }

        }
    );

}