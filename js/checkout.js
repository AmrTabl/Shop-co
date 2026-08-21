// ========================================
// CHECKOUT PAGE
// ========================================


// ========================================
// GET ELEMENTS
// ========================================

const checkoutItems =
    document.querySelector("#checkout-items");

const checkoutSubtotal =
    document.querySelector("#checkout-subtotal");

const checkoutShipping =
    document.querySelector("#checkout-shipping");

const checkoutTotal =
    document.querySelector("#checkout-total");

const checkoutForm =
    document.querySelector("#checkout-form");

const checkoutSuccess =
    document.querySelector("#checkout-success");


// ========================================
// GET CART
// ========================================

let cart = [];


try {

    cart =
        JSON.parse(
            localStorage.getItem("cart")
        ) || [];

}

catch (error) {

    console.error(
        "Could not read cart:",
        error
    );

    cart = [];

}


// ========================================
// CHECK EMPTY CART
// ========================================

if (cart.length === 0) {

    checkoutItems.innerHTML = `

        <p>
            Your cart is empty.
        </p>

        <a href="index.html">
            Continue Shopping
        </a>

    `;

    checkoutForm.style.display = "none";

}


// ========================================
// DISPLAY CART
// ========================================

let subtotal = 0;


cart.forEach(item => {

    const quantity =
        Number(item.quantity) || 0;

    const price =
        Number(item.price) || 0;

    const itemTotal =
        price * quantity;


    subtotal += itemTotal;


    const itemElement =
        document.createElement("div");


    itemElement.className =
        "checkout-item";


    itemElement.innerHTML = `

        <img
            src="${item.image}"
            alt="${item.name}"
        >


        <div class="checkout-item-info">

            <h3>
                ${item.name}
            </h3>

            ${
                item.color
                    ? `<p>Color: ${item.color}</p>`
                    : ""
            }

            ${
                item.size
                    ? `<p>Size: ${item.size}</p>`
                    : ""
            }

            <p>
                Quantity: ${quantity}
            </p>

        </div>


        <div class="checkout-item-price">

            $${itemTotal}

        </div>

    `;


    checkoutItems.appendChild(
        itemElement
    );

});


// ========================================
// SHIPPING
// ========================================

const shipping =
    cart.length > 0
        ? 15
        : 0;


// ========================================
// TOTAL
// ========================================

const total =
    subtotal + shipping;


// ========================================
// DISPLAY TOTALS
// ========================================

checkoutSubtotal.textContent =
    `$${subtotal}`;


checkoutShipping.textContent =
    `$${shipping}`;


checkoutTotal.textContent =
    `$${total}`;


// ========================================
// PLACE ORDER
// ========================================

checkoutForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        // ====================================
        // GET FORM VALUES
        // ====================================

        const name =
            document.querySelector(
                "#checkout-name"
            ).value.trim();


        const email =
            document.querySelector(
                "#checkout-email"
            ).value.trim();


        const phone =
            document.querySelector(
                "#checkout-phone"
            ).value.trim();


        const address =
            document.querySelector(
                "#checkout-address"
            ).value.trim();


        const city =
            document.querySelector(
                "#checkout-city"
            ).value.trim();


        // ====================================
        // BASIC VALIDATION
        // ====================================

        if (
            !name ||
            !email ||
            !phone ||
            !address ||
            !city
        ) {

            alert(
                "Please fill in all fields."
            );

            return;

        }


        // ====================================
        // GET PAYMENT METHOD
        // ====================================

        const paymentMethod =
            document.querySelector(
                'input[name="payment"]:checked'
            ).value;


        // ====================================
        // CLEAR CART
        // ====================================

        localStorage.removeItem(
            "cart"
        );


        // ====================================
        // HIDE CHECKOUT
        // ====================================

        checkoutForm.style.display =
            "none";


        // ====================================
        // SHOW SUCCESS
        // ====================================

        checkoutSuccess.style.display =
            "block";


        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }
);
