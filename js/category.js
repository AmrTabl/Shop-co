// ========================================
// CATEGORY PAGE
// ========================================


// ========================================
// 1. GET CATEGORY FROM URL
// ========================================

const params =
    new URLSearchParams(
        window.location.search
    );


const category =
    params.get("category");


console.log(
    "Selected category:",
    category
);


// ========================================
// 2. GET PAGE ELEMENTS
// ========================================

const categoryTitle =
    document.querySelector(
        "#category-title"
    );


const categoryBreadcrumb =
    document.querySelector(
        "#category-breadcrumb"
    );


const categoryProducts =
    document.querySelector(
        "#category-products"
    );


// ========================================
// 3. CHECK CATEGORY
// ========================================

if (!category) {

    categoryTitle.textContent =
        "Category not found";

    categoryProducts.innerHTML = `
    
        <p>
            No category was selected.
        </p>

    `;

}


// ========================================
// 4. LOAD PRODUCTS
// ========================================

else {

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


            // ========================================
            // 5. UPDATE TITLE
            // ========================================

            categoryTitle.textContent =
                category;


            categoryBreadcrumb.textContent =
                category;


            // ========================================
            // 6. FILTER PRODUCTS
            // ========================================

            const filteredProducts =
                products.filter(
                    product =>

                        String(
                            product.category
                        ).toLowerCase() ===

                        String(
                            category
                        ).toLowerCase()
                );


            console.log(
                "Products in category:",
                filteredProducts
            );


            // ========================================
            // 7. NO PRODUCTS
            // ========================================

            if (
                filteredProducts.length === 0
            ) {

                categoryProducts.innerHTML = `

                    <div class="empty-category">

                        <h2>
                            No products found
                        </h2>

                        <p>
                            There are no products
                            in this category yet.
                        </p>

                        <a
                            href="index.html"
                            class="view-all-button"
                        >
                            Back to Shop
                        </a>

                    </div>

                `;

                return;

            }


            // ========================================
            // 8. DISPLAY PRODUCTS
            // ========================================

            categoryProducts.innerHTML = "";


            filteredProducts.forEach(
                product => {


                    const productCard =
                        document.createElement(
                            "div"
                        );


                    productCard.classList.add(
                        "product-card"
                    );


                    // ====================================
                    // CLICK PRODUCT
                    // ====================================

                    productCard.addEventListener(
                        "click",
                        () => {

                            window.location.href =
                                `product.html?id=${product.id}`;

                        }
                    );


                    // ====================================
                    // PRODUCT HTML
                    // ====================================

                    productCard.innerHTML = `

                        <img
                            src="${product.images[0]}"
                            alt="${product.name}"
                            class="product-image"
                        >


                        <h3 class="product-name">

                            ${product.name}

                        </h3>


                        <div class="rating">

                            <span>
                                ★★★★★
                            </span>

                            <span>
                                ${product.rating}/5
                            </span>

                        </div>


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

                    `;


                    categoryProducts.appendChild(
                        productCard
                    );

                }
            );

        })


        // ========================================
        // 9. ERROR HANDLING
        // ========================================

        .catch(error => {

            console.error(
                "Category page error:",
                error
            );


            categoryProducts.innerHTML = `

                <div class="empty-category">

                    <h2>
                        Something went wrong
                    </h2>

                    <p>
                        We couldn't load the products.
                    </p>

                </div>

            `;

        });

}