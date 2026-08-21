// ========================================
// PRODUCT PAGE
// ========================================


// ========================================
// 1. GET PRODUCT ID FROM URL
// ========================================

const params = new URLSearchParams(
    window.location.search
);

const productId = params.get("id");


// ========================================
// 2. LOAD PRODUCTS FROM JSON
// ========================================

fetch("data/products.json")

    .then(response => {

        if (!response.ok) {

            throw new Error(
                "Could not load products.json"
            );

        }

        return response.json();

    })

    .then(products => {


        // ========================================
        // 3. FIND PRODUCT
        // ========================================

        const product = products.find(
            item =>
                String(item.id) ===
                String(productId)
        );


        // ========================================
        // PRODUCT NOT FOUND
        // ========================================

        if (!product) {

            console.error(
                "Product not found:",
                productId
            );

            const productDetails =
                document.querySelector(
                    "#product-details"
                );


            if (productDetails) {

                productDetails.innerHTML = `

                    <div class="product-not-found">

                        <h2>
                            Product not found
                        </h2>

                        <a href="index.html">
                            Back to shop
                        </a>

                    </div>

                `;

            }

            return;

        }



        // ========================================
        // 4. GET PRODUCT CONTAINER
        // ========================================

        const productDetails =
            document.querySelector(
                "#product-details"
            );


        if (!productDetails) {

            console.error(
                "Could not find #product-details"
            );

            return;

        }


        // ========================================
        // 5. DISPLAY PRODUCT
        // ========================================

        productDetails.innerHTML = `

            <!-- ====================================
                 PRODUCT GALLERY
            ==================================== -->

            <div class="product-gallery">

                <div class="thumbnail-container">

                    ${product.images.map(
                        (image, index) => `

                        <img
                            src="${image}"
                            alt="${product.name}"
                            class="product-thumbnail ${
                                index === 0
                                    ? "active"
                                    : ""
                            }"
                            data-index="${index}"
                        >

                    `
                    ).join("")}

                </div>


                <div class="main-product-image">

                    <img
                        id="main-product-image"
                        src="${product.images[0]}"
                        alt="${product.name}"
                    >

                </div>

            </div>


            <!-- ====================================
                 PRODUCT INFORMATION
            ==================================== -->

            <div class="product-info">

                <h1>
                    ${product.name}
                </h1>


                <!-- RATING -->

                <div class="product-rating">

                    <span class="stars">
                        ★★★★★
                    </span>

                    <span>
                        ${product.rating}/5
                    </span>

                    ${
                        product.reviewCount
                            ? `
                                <span>
                                    (${product.reviewCount} reviews)
                                </span>
                            `
                            : ""
                    }

                </div>


                <!-- PRICE -->

                <div class="product-price-container">

                    <span class="product-price">
                        $${product.price}
                    </span>

                    ${
                        product.discount > 0
                            ? `

                                <span class="original-price">
                                    $${product.originalPrice}
                                </span>

                                <span class="discount">
                                    -${product.discount}%
                                </span>

                            `
                            : ""
                    }

                </div>


                <!-- DESCRIPTION -->

                <p class="product-description">
                    ${product.description}
                </p>


                <!-- ====================================
                     COLORS
                ==================================== -->

                ${
                    product.colors &&
                    product.colors.length > 0
                        ? `

                            <div class="product-option">

                                <h3>
                                    Select Color
                                </h3>

                                <div
                                    id="color-options"
                                    class="color-options"
                                ></div>

                            </div>

                        `
                        : ""
                }


                <!-- ====================================
                     SIZES
                ==================================== -->

                ${
                    product.sizes &&
                    product.sizes.length > 0
                        ? `

                            <div class="product-option">

                                <h3>
                                    Select Size
                                </h3>

                                <div
                                    id="size-options"
                                    class="size-options"
                                ></div>

                            </div>

                        `
                        : ""
                }


                <!-- ====================================
                     PRODUCT ACTIONS
                ==================================== -->

                <div class="product-actions">

                    <div class="quantity-controls">

                        <button
                            id="decrease"
                            type="button"
                        >
                            −
                        </button>

                        <span id="quantity">
                            1
                        </span>

                        <button
                            id="increase"
                            type="button"
                        >
                            +
                        </button>

                    </div>


                    <button
                        id="add-to-cart"
                        class="add-to-cart"
                        type="button"
                    >
                        Add to Cart
                    </button>

                </div>

            </div>


            <!-- ====================================
                 PRODUCT TABS
            ==================================== -->

            <section class="product-tabs">

                <div class="tabs-header">

                    <button
                        class="tab-button active"
                        data-tab="details"
                    >
                        Product Details
                    </button>

                    <button
                        class="tab-button"
                        data-tab="reviews"
                    >
                        Rating & Reviews
                    </button>

                    <button
                        class="tab-button"
                        data-tab="faqs"
                    >
                        FAQs
                    </button>

                </div>


                <div class="tab-content">

                    <!-- DETAILS -->

                    <div
                        id="details"
                        class="tab-panel active"
                    >

                        <h2>
                            Product Details
                        </h2>

                        <p>
                            ${product.description}
                        </p>

                        <p>
                            ${product.details || ""}
                        </p>

                    </div>


                    <!-- REVIEWS -->

                    <div
                        id="reviews"
                        class="tab-panel"
                    >

                        <h2>
                            Rating & Reviews
                        </h2>

                        <div class="review-summary">

                            <div class="review-rating">

                                <span class="big-rating">
                                    ${product.rating}
                                </span>

                                <span class="out-of">
                                    /5
                                </span>

                            </div>

                            <div class="review-stars">
                                ★★★★★
                            </div>

                            <p>
                                ${product.reviewCount || 0} reviews
                            </p>

                        </div>

                    </div>


                    <!-- FAQ -->

                    <div
                        id="faqs"
                        class="tab-panel"
                    >

                        <h2>
                            Frequently Asked Questions
                        </h2>


                        <div class="faq-item">

                            <h3>
                                Is this product available?
                            </h3>

                            <p>

                                ${
                                    Number(product.stock) > 0
                                        ? "Yes, this product is currently available."
                                        : "This product is currently out of stock."
                                }

                            </p>

                        </div>


                        <div class="faq-item">

                            <h3>
                                How many items can I order?
                            </h3>

                            <p>
                                You can order up to
                                ${product.stock}
                                items.
                            </p>

                        </div>

                    </div>

                </div>

            </section>


            <!-- ====================================
                 RELATED PRODUCTS
            ==================================== -->

            <section class="related-products">

                <h2>
                    You Might Also Like
                </h2>

                <div
                    id="related-products-container"
                    class="products-container"
                ></div>

            </section>

        `;


        // ========================================
        // 6. UPDATE BREADCRUMB
        // ========================================

        const breadcrumbProduct =
            document.querySelector(
                "#breadcrumb-product"
            );


        if (breadcrumbProduct) {

            breadcrumbProduct.textContent =
                product.name;

        }


        // ========================================
        // 7. IMAGE GALLERY
        // ========================================

        const mainProductImage =
            document.querySelector(
                "#main-product-image"
            );


        const thumbnails =
            document.querySelectorAll(
                ".product-thumbnail"
            );


        thumbnails.forEach(
            thumbnail => {

                thumbnail.addEventListener(
                    "click",
                    () => {

                        mainProductImage.src =
                            thumbnail.src;


                        thumbnails.forEach(
                            item => {

                                item.classList.remove(
                                    "active"
                                );

                            }
                        );


                        thumbnail.classList.add(
                            "active"
                        );

                    }
                );

            }
        );


        // ========================================
        // 8. PRODUCT TABS
        // ========================================

        const tabButtons =
            document.querySelectorAll(
                ".tab-button"
            );


        const tabPanels =
            document.querySelectorAll(
                ".tab-panel"
            );


        tabButtons.forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        const tabName =
                            button.dataset.tab;


                        tabButtons.forEach(
                            tab => {

                                tab.classList.remove(
                                    "active"
                                );

                            }
                        );


                        tabPanels.forEach(
                            panel => {

                                panel.classList.remove(
                                    "active"
                                );

                            }
                        );


                        button.classList.add(
                            "active"
                        );


                        const selectedPanel =
                            document.querySelector(
                                `#${tabName}`
                            );


                        if (selectedPanel) {

                            selectedPanel.classList.add(
                                "active"
                            );

                        }

                    }
                );

            }
        );


        // ========================================
        // 9. SELECTED COLOR
        // ========================================

        let selectedColor = null;


        const colorOptions =
            document.querySelector(
                "#color-options"
            );


        if (
            colorOptions &&
            product.colors &&
            product.colors.length > 0
        ) {

            product.colors.forEach(
                color => {

                    const colorButton =
                        document.createElement(
                            "button"
                        );


                    colorButton.type =
                        "button";


                    colorButton.classList.add(
                        "color-button"
                    );


                    colorButton.style.backgroundColor =
                        color.hex;


                    colorButton.title =
                        color.name;


                    colorButton.addEventListener(
                        "click",
                        () => {

                            selectedColor =
                                color.name;


                            colorOptions
                                .querySelectorAll(
                                    ".color-button"
                                )
                                .forEach(
                                    button => {

                                        button.classList.remove(
                                            "selected"
                                        );

                                    }
                                );


                            colorButton.classList.add(
                                "selected"
                            );

                        }
                    );


                    colorOptions.appendChild(
                        colorButton
                    );

                }
            );

        }


        // ========================================
        // 10. SELECTED SIZE
        // ========================================

        let selectedSize = null;


        const sizeOptions =
            document.querySelector(
                "#size-options"
            );


        if (
            sizeOptions &&
            product.sizes &&
            product.sizes.length > 0
        ) {

            product.sizes.forEach(
                size => {

                    const sizeButton =
                        document.createElement(
                            "button"
                        );


                    sizeButton.type =
                        "button";


                    sizeButton.classList.add(
                        "size-button"
                    );


                    sizeButton.textContent =
                        size;


                    sizeButton.addEventListener(
                        "click",
                        () => {

                            selectedSize =
                                size;


                            sizeOptions
                                .querySelectorAll(
                                    ".size-button"
                                )
                                .forEach(
                                    button => {

                                        button.classList.remove(
                                            "selected"
                                        );

                                    }
                                );


                            sizeButton.classList.add(
                                "selected"
                            );

                        }
                    );


                    sizeOptions.appendChild(
                        sizeButton
                    );

                }
            );

        }


        // ========================================
        // 11. QUANTITY
        // ========================================

        let quantity = 1;


        const quantityElement =
            document.querySelector(
                "#quantity"
            );


        const decreaseButton =
            document.querySelector(
                "#decrease"
            );


        const increaseButton =
            document.querySelector(
                "#increase"
            );


        // ========================================
        // ADD TO CART BUTTON
        // ========================================

        const addToCartButton =
            document.querySelector(
                "#add-to-cart"
            );


        const stock =
            Number(product.stock) || 0;


        // ========================================
        // OUT OF STOCK
        // ========================================

        if (stock <= 0) {

            quantity = 0;

            quantityElement.textContent =
                "0";

            addToCartButton.disabled =
                true;

            addToCartButton.textContent =
                "Out of Stock";

        }


        // ========================================
        // 12. INCREASE QUANTITY
        // ========================================

        if (increaseButton) {

            increaseButton.addEventListener(
                "click",
                () => {

                    if (quantity < stock) {

                        quantity++;

                        quantityElement.textContent =
                            quantity;

                    }

                    else {

                        showNotification(
                            "Only " +
                            stock +
                            " items are available.",
                            "warning"
                        );

                    }

                }
            );

        }


        // ========================================
        // 13. DECREASE QUANTITY
        // ========================================

        if (decreaseButton) {

            decreaseButton.addEventListener(
                "click",
                () => {

                    if (quantity > 1) {

                        quantity--;

                        quantityElement.textContent =
                            quantity;

                    }

                }
            );

        }


        // ========================================
        // 14. ADD TO CART
        // ========================================

        if (!addToCartButton) {

            console.error(
                "Add to Cart button was not found!"
            );

            return;

        }


        addToCartButton.addEventListener(
            "click",
            () => {

                // ====================================
                // CHECK STOCK
                // ====================================

                if (stock <= 0) {

                    showNotification(
                        "This product is currently out of stock.",
                        "error"
                    );

                    return;

                }


                // ====================================
                // CHECK COLOR
                // ====================================

                if (
                    product.colors &&
                    product.colors.length > 0 &&
                    !selectedColor
                ) {

                    showNotification(
                        "Please select a color first.",
                        "warning"
                    );

                    return;

                }


                // ====================================
                // CHECK SIZE
                // ====================================

                if (
                    product.sizes &&
                    product.sizes.length > 0 &&
                    !selectedSize
                ) {

                    showNotification(
                        "Please select a size first.",
                        "warning"
                    );

                    return;

                }


                // ====================================
                // GET CART
                // ====================================

                let cart = [];


                try {

                    cart =
                        JSON.parse(
                            localStorage.getItem(
                                "cart"
                            )
                        ) || [];

                }

                catch (error) {

                    console.error(
                        "Could not read cart:",
                        error
                    );

                    cart = [];

                }


                // ====================================
                // CREATE CART ITEM
                // ====================================

                const cartItem = {

                    id: product.id,

                    name: product.name,

                    price: product.price,

                    originalPrice:
                        product.originalPrice,

                    discount:
                        product.discount,

                    image: product.images[0],

                    color: selectedColor,

                    size: selectedSize,

                    quantity: quantity

                };


                // ====================================
                // FIND EXISTING ITEM
                // ========================================

                const existingItem =
                    cart.find(
                        item =>

                            String(item.id) ===
                            String(cartItem.id)

                            &&

                            item.color ===
                            cartItem.color

                            &&

                            item.size ===
                            cartItem.size
                    );


                // ========================================
                // UPDATE EXISTING ITEM
                // ========================================

                if (existingItem) {

                    const currentQuantity =
                        Number(
                            existingItem.quantity
                        ) || 0;


                    const newQuantity =
                        currentQuantity +
                        quantity;


                    if (
                        newQuantity >
                        stock
                    ) {

                        showNotification(
                            "You can only add up to " +
                            stock +
                            " items of this product.",
                            "warning"
                        );

                        return;

                    }


                    existingItem.quantity =
                        newQuantity;

                }


                // ========================================
                // ADD NEW ITEM
                // ========================================

                else {

                    cart.push(
                        cartItem
                    );

                }


                // ========================================
                // SAVE CART
                // ========================================

                localStorage.setItem(
                    "cart",
                    JSON.stringify(cart)
                );


                // ========================================
                // UPDATE CART COUNT
                // ========================================

                updateCartCount();


                // ========================================
                // SUCCESS
                // ========================================

                showNotification(
                    "Product added to your cart!",
                    "success"
                );

            }
        );


        // ========================================
        // 15. UPDATE CART COUNT
        // ========================================

        function updateCartCount() {

            let cart = [];


            try {

                cart =
                    JSON.parse(
                        localStorage.getItem(
                            "cart"
                        )
                    ) || [];

            }

            catch (error) {

                console.error(
                    "Could not read cart:",
                    error
                );

                cart = [];

            }


            const totalQuantity =
                cart.reduce(
                    (total, item) => {

                        return total +
                            Number(
                                item.quantity || 0
                            );

                    },
                    0
                );


            const cartCount =
                document.querySelector(
                    ".cart-count"
                );


            if (cartCount) {

                cartCount.textContent =
                    totalQuantity;

            }

        }


        // Update cart count on page load

        updateCartCount();


        // ========================================
        // 16. RELATED PRODUCTS
        // ========================================

        const relatedContainer =
            document.querySelector(
                "#related-products-container"
            );


        if (relatedContainer) {

            let relatedProducts =
                products.filter(
                    item =>

                        String(item.id) !==
                        String(product.id)

                        &&

                        item.category ===
                        product.category
                );


            // If not enough products,
            // use other products

            if (
                relatedProducts.length < 4
            ) {

                const otherProducts =
                    products.filter(
                        item =>

                            String(item.id) !==
                            String(product.id)

                            &&

                            !relatedProducts.some(
                                related =>

                                    String(
                                        related.id
                                    ) ===
                                    String(item.id)
                            )
                    );


                relatedProducts = [
                    ...relatedProducts,
                    ...otherProducts
                ];

            }


            // Maximum 4 products

            relatedProducts =
                relatedProducts.slice(0, 4);


            // Display related products

            relatedContainer.innerHTML =
                relatedProducts
                    .map(
                        item => `

                            <div
                                class="product-card"
                                onclick="
                                    window.location.href =
                                    'product.html?id=${item.id}'
                                "
                            >

                                <img
                                    src="${item.images[0]}"
                                    alt="${item.name}"
                                >


                                <h3>
                                    ${item.name}
                                </h3>


                                <div class="rating">

                                    <span>
                                        ★★★★★
                                    </span>

                                    <span>
                                        ${item.rating}/5
                                    </span>

                                </div>


                                <div class="price-container">

                                    <span class="price">
                                        $${item.price}
                                    </span>


                                    ${
                                        item.discount > 0
                                            ? `

                                                <span class="original-price">
                                                    $${item.originalPrice}
                                                </span>

                                                <span class="discount">
                                                    -${item.discount}%
                                                </span>

                                            `
                                            : ""
                                    }

                                </div>

                            </div>

                        `
                    )
                    .join("");

        }

    })


    // ========================================
    // 17. ERROR HANDLING
    // ========================================

    .catch(error => {

        console.error(
            "Error loading product:",
            error
        );


        const productDetails =
            document.querySelector(
                "#product-details"
            );


        if (productDetails) {

            productDetails.innerHTML = `

                <div class="product-error">

                    <h2>
                        Something went wrong
                    </h2>

                    <p>
                        We couldn't load this product.
                    </p>

                    <a href="index.html">
                        Back to shop
                    </a>

                </div>

            `;

        }

    });


// ========================================
// PROFESSIONAL NOTIFICATION SYSTEM
// ========================================

function showNotification(
    message,
    type = "success"
) {

    let container =
        document.querySelector(
            "#notification-container"
        );


    // Create notification container
    // if it doesn't exist

    if (!container) {

        container =
            document.createElement(
                "div"
            );

        container.id =
            "notification-container";

        document.body.appendChild(
            container
        );

    }


    // ========================================
    // CREATE NOTIFICATION
    // ========================================

    const notification =
        document.createElement(
            "div"
        );


    notification.className =
        `notification notification-${type}`;


    // ========================================
    // ICON
    // ========================================

    let icon = "✓";


    if (type === "warning") {

        icon = "⚠";

    }

    else if (type === "error") {

        icon = "✕";

    }


    // ========================================
    // CONTENT
    // ========================================

    notification.innerHTML = `

        <div class="notification-icon">
            ${icon}
        </div>

        <div class="notification-content">

            <strong>
                ${
                    type === "success"
                        ? "Success"
                        : type === "warning"
                            ? "Attention"
                            : "Error"
                }
            </strong>

            <p>
                ${message}
            </p>

        </div>

        <button
            class="notification-close"
            type="button"
            aria-label="Close notification"
        >
            ×
        </button>

    `;


    container.appendChild(
        notification
    );


    // ========================================
    // SHOW ANIMATION
    // ========================================

    requestAnimationFrame(
        () => {

            notification.classList.add(
                "show"
            );

        }
    );


    // ========================================
    // CLOSE BUTTON
    // ========================================

    const closeButton =
        notification.querySelector(
            ".notification-close"
        );


    closeButton.addEventListener(
        "click",
        () => {

            removeNotification(
                notification
            );

        }
    );


    // ========================================
    // AUTO REMOVE
    // ========================================

    const timeout =
        setTimeout(
            () => {

                removeNotification(
                    notification
                );

            },
            3500
        );


    // ========================================
    // REMOVE FUNCTION
    // ========================================

    function removeNotification(
        element
    ) {

        clearTimeout(
            timeout
        );


        element.classList.remove(
            "show"
        );


        setTimeout(
            () => {

                if (
                    element &&
                    element.parentNode
                ) {

                    element.parentNode.removeChild(
                        element
                    );

                }

            },
            300
        );

    }

}
