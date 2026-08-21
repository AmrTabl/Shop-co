// ========================================
// ALL PRODUCTS PAGE
// ========================================


// ========================================
// GET CONTAINER
// ========================================

const productsContainer =
    document.querySelector(
        "#all-products-container"
    );


const productCount =
    document.querySelector(
        "#product-count"
    );


// ========================================
// CHECK CONTAINER
// ========================================

if (!productsContainer) {

    console.error(
        "Products container not found."
    );

}


// ========================================
// LOAD PRODUCTS
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

        console.log(
            "All products:",
            products
        );


        // ====================================
        // PRODUCT COUNT
        // ====================================

        if (productCount) {

            productCount.textContent =
                `Showing all ${products.length} products`;

        }


        // ====================================
        // NO PRODUCTS
        // ====================================

        if (
            !products ||
            products.length === 0
        ) {

            productsContainer.innerHTML = `

                <div class="products-error">

                    <h2>
                        No products found
                    </h2>

                    <p>
                        There are no products available right now.
                    </p>

                </div>

            `;

            return;

        }


        // ====================================
        // DISPLAY PRODUCTS
        // ====================================

        productsContainer.innerHTML =
            products
                .map(
                    product => `

                        <div
                            class="product-card"
                            onclick="
                                window.location.href =
                                'product.html?id=${product.id}'
                            "
                        >


                            <!-- PRODUCT IMAGE -->

                            <img
                                src="${product.images[0]}"
                                alt="${product.name}"
                            >


                            <!-- PRODUCT NAME -->

                            <h3>
                                ${product.name}
                            </h3>


                            <!-- RATING -->

                            <div class="rating">

                                <span>
                                    ★★★★★
                                </span>

                                <span>
                                    ${product.rating}/5
                                </span>

                            </div>


                            <!-- PRICE -->

                            <div class="price-container">

                                <span class="price">
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


                        </div>

                    `
                )
                .join("");

    })


    // ========================================
    // ERROR
    // ========================================

    .catch(error => {

        console.error(
            "Error loading products:",
            error
        );


        if (productCount) {

            productCount.textContent =
                "Could not load products.";

        }


        if (productsContainer) {

            productsContainer.innerHTML = `

                <div class="products-error">

                    <h2>
                        Something went wrong
                    </h2>

                    <p>
                        We couldn't load the products.
                    </p>

                    <a href="index.html">
                        Back to Home
                    </a>

                </div>

            `;

        }

    });