fetch("data/products.json")
    .then(response => response.json())
    .then(products => {

        const newProductsContainer =
            document.querySelector("#new-products");

        const topSellingContainer =
            document.querySelector("#top-selling-products");

        
        // Creates one product card
        function createProductCard(product) {

            const productCard =
                document.createElement("div");

            productCard.classList.add("product-card");


            // Open the product details page
            // when the card is clicked
            productCard.addEventListener("click", () => {

                window.location.href =
                    `product.html?id=${product.id}`;

            });


            // HTML inside the card
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
                    ★★★★★
                    <span>${product.rating}/5</span>
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


            return productCard;
        }


        // =================================
        // NEW ARRIVALS
        // =================================

        products
            .slice(0, 4)
            .forEach(product => {

                const card =
                    createProductCard(product);

                newProductsContainer
                    .appendChild(card);

            });


        // =================================
        // TOP SELLING
        // =================================

        products
            .slice(4, 8)
            .forEach(product => {

                const card =
                    createProductCard(product);

                topSellingContainer
                    .appendChild(card);

            });

    });
