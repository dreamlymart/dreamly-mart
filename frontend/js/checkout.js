/* =========================================================
   DREAMLY MART
   CHECKOUT.JS
   COMPLETE FRONTEND CHECKOUT SYSTEM
========================================================= */

document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       CART
    ===================================================== */

    function getCart() {

        try {

            return JSON.parse(
                localStorage.getItem("dreamlyCart")
            ) || [];

        } catch (error) {

            return [];

        }

    }



    /* =====================================================
       ELEMENTS
    ===================================================== */

    const checkoutItems =
        document.getElementById("checkoutItems");

    const checkoutSubtotal =
        document.getElementById("checkoutSubtotal");

    const deliveryCharge =
        document.getElementById("deliveryCharge");

    const checkoutTotal =
        document.getElementById("checkoutTotal");

    const summaryCount =
        document.getElementById("summaryCount");

    const placeOrderButton =
        document.getElementById("placeOrderButton");

    const backToCartButton =
        document.getElementById("backToCartButton");

    const checkoutForm =
        document.getElementById("checkoutForm");

    const termsCheckbox =
        document.getElementById("termsCheckbox");

    const successOverlay =
        document.getElementById("orderSuccessOverlay");

    const successOrderNumber =
        document.getElementById("successOrderNumber");

    const continueShoppingButton =
        document.getElementById(
            "continueShoppingButton"
        );



    /* =====================================================
       DELIVERY CHARGE
    ===================================================== */

    const DELIVERY_CHARGE = 80;



    /* =====================================================
       FORMAT MONEY
    ===================================================== */

    function formatMoney(amount) {

        return (
            "৳" +
            Number(amount).toLocaleString("en-BD")
        );

    }



    /* =====================================================
       RENDER CHECKOUT
    ===================================================== */

    function renderCheckout() {

        const cart = getCart();

        if (!checkoutItems) {
            return;
        }


        checkoutItems.innerHTML = "";


        /* EMPTY CART */

        if (cart.length === 0) {

            checkoutItems.innerHTML = `

                <div class="empty-checkout">

                    <div class="empty-checkout-icon">
                        🛒
                    </div>

                    <h2>
                        Your Cart is Empty
                    </h2>

                    <p>
                        Please add some products before checkout.
                    </p>

                    <a href="index.html">
                        Continue Shopping
                    </a>

                </div>

            `;


            if (checkoutSubtotal) {
                checkoutSubtotal.textContent = "৳0";
            }

            if (deliveryCharge) {
                deliveryCharge.textContent = "৳0";
            }

            if (checkoutTotal) {
                checkoutTotal.textContent = "৳0";
            }

            if (summaryCount) {
                summaryCount.textContent = "0 items";
            }

            if (placeOrderButton) {
                placeOrderButton.disabled = true;
            }

            return;

        }


        if (placeOrderButton) {
            placeOrderButton.disabled = false;
        }



        /* =================================================
           ITEMS
        ================================================== */

        let subtotal = 0;

        let totalItems = 0;


        cart.forEach(function (item) {

            subtotal +=
                item.price *
                item.quantity;


            totalItems +=
                item.quantity;


            const itemElement =
                document.createElement("div");

            itemElement.className =
                "checkout-item";


            const imageBox =
                document.createElement("div");

            imageBox.className =
                "checkout-item-image";


            const image =
                document.createElement("img");

            image.src =
                item.image;

            image.alt =
                item.name;


            image.onerror =
                function () {

                    image.style.display =
                        "none";


                    imageBox.innerHTML =
                        "<span>🛍️</span>";

                };


            imageBox.appendChild(image);



            const info =
                document.createElement("div");

            info.className =
                "checkout-item-info";


            const title =
                document.createElement("h3");

            title.textContent =
                item.name;


            const quantity =
                document.createElement("p");

            quantity.textContent =
                "Quantity: " +
                item.quantity;


            const price =
                document.createElement("strong");

            price.textContent =
                formatMoney(
                    item.price *
                    item.quantity
                );


            info.appendChild(title);

            info.appendChild(quantity);

            info.appendChild(price);


            itemElement.appendChild(imageBox);

            itemElement.appendChild(info);


            checkoutItems.appendChild(
                itemElement
            );

        });



        /* =================================================
           TOTALS
        ================================================== */

        const finalDeliveryCharge =
            DELIVERY_CHARGE;


        const total =
            subtotal +
            finalDeliveryCharge;


        if (summaryCount) {

            summaryCount.textContent =
                totalItems +
                (
                    totalItems === 1
                        ? " item"
                        : " items"
                );

        }


        if (checkoutSubtotal) {

            checkoutSubtotal.textContent =
                formatMoney(subtotal);

        }


        if (deliveryCharge) {

            deliveryCharge.textContent =
                formatMoney(
                    finalDeliveryCharge
                );

        }


        if (checkoutTotal) {

            checkoutTotal.textContent =
                formatMoney(total);

        }

    }



    /* =====================================================
       PAYMENT METHOD UI
    ===================================================== */

    const paymentOptions =
        document.querySelectorAll(
            ".payment-option"
        );


    paymentOptions.forEach(
        function (option) {

            option.addEventListener(
                "click",
                function () {

                    paymentOptions.forEach(
                        function (item) {

                            item.classList.remove(
                                "active"
                            );

                        }
                    );


                    option.classList.add(
                        "active"
                    );

                }
            );

        }
    );



    /* =====================================================
       CREATE ORDER NUMBER
    ===================================================== */

    function generateOrderNumber() {

        const now =
            new Date();


        const year =
            now.getFullYear();


        const month =
            String(
                now.getMonth() + 1
            ).padStart(2, "0");


        const day =
            String(
                now.getDate()
            ).padStart(2, "0");


        const random =
            Math.floor(
                1000 +
                Math.random() * 9000
            );


        return (
            "DM-" +
            year +
            month +
            day +
            "-" +
            random
        );

    }



    /* =====================================================
       SAVE ORDER
    ===================================================== */

    function saveOrder(order) {

        let orders = [];

        try {

            orders =
                JSON.parse(
                    localStorage.getItem(
                        "dreamlyOrders"
                    )
                ) || [];

        } catch (error) {

            orders = [];

        }


        orders.push(order);


        localStorage.setItem(
            "dreamlyOrders",
            JSON.stringify(orders)
        );

    }



    /* =====================================================
       PLACE ORDER
    ===================================================== */

    function placeOrder() {

        const cart =
            getCart();


        if (cart.length === 0) {

            alert(
                "Your cart is empty."
            );

            return;

        }


        if (
            !checkoutForm ||
            !checkoutForm.checkValidity()
        ) {

            if (checkoutForm) {

                checkoutForm.reportValidity();

            }

            return;

        }


        if (
            termsCheckbox &&
            !termsCheckbox.checked
        ) {

            alert(
                "Please confirm that your information is correct."
            );

            return;

        }



        /* =================================================
           CUSTOMER DATA
        ================================================== */

        const customer = {

            name:
                document.getElementById(
                    "customerName"
                ).value.trim(),

            phone:
                document.getElementById(
                    "customerPhone"
                ).value.trim(),

            email:
                document.getElementById(
                    "customerEmail"
                ).value.trim(),

            address:
                document.getElementById(
                    "customerAddress"
                ).value.trim(),

            district:
                document.getElementById(
                    "customerDistrict"
                ).value.trim(),

            postCode:
                document.getElementById(
                    "customerPostCode"
                ).value.trim(),

            note:
                document.getElementById(
                    "orderNote"
                ).value.trim()

        };



        /* =================================================
           PAYMENT
        ================================================== */

        const paymentInput =
            document.querySelector(
                'input[name="paymentMethod"]:checked'
            );


        const paymentMethod =
            paymentInput
                ? paymentInput.value
                : "cod";



        /* =================================================
           CALCULATE TOTAL
        ================================================== */

        let subtotal = 0;


        cart.forEach(
            function (item) {

                subtotal +=
                    item.price *
                    item.quantity;

            }
        );


        const total =
            subtotal +
            DELIVERY_CHARGE;



        /* =================================================
           ORDER
        ================================================== */

        const order = {

            orderNumber:
                generateOrderNumber(),

            createdAt:
                new Date().toISOString(),

            status:
                "Pending",

            paymentMethod:
                paymentMethod,

            customer:
                customer,

            items:
                cart,

            subtotal:
                subtotal,

            deliveryCharge:
                DELIVERY_CHARGE,

            total:
                total

        };


        saveOrder(order);



        /* =================================================
           CLEAR CART
        ================================================== */

        localStorage.removeItem(
            "dreamlyCart"
        );



        /* =================================================
           SHOW SUCCESS
        ================================================= */

        if (successOrderNumber) {

            successOrderNumber.textContent =
                order.orderNumber;

        }


        if (successOverlay) {

            successOverlay.classList.add(
                "show"
            );

        }

    }



    /* =====================================================
       PLACE ORDER BUTTON
    ===================================================== */

    if (placeOrderButton) {

        placeOrderButton.addEventListener(
            "click",
            placeOrder
        );

    }



    /* =====================================================
       BACK TO CART
    ===================================================== */

    if (backToCartButton) {

        backToCartButton.addEventListener(
            "click",
            function () {

                window.location.href =
                    "index.html";

            }
        );

    }



    /* =====================================================
       CONTINUE SHOPPING
    ===================================================== */

    if (continueShoppingButton) {

        continueShoppingButton.addEventListener(
            "click",
            function () {

                window.location.href =
                    "index.html";

            }
        );

    }



    /* =====================================================
       CART ICON
    ===================================================== */

    const cartButton =
        document.getElementById(
            "checkoutCartButton"
        );


    if (cartButton) {

        cartButton.style.cursor =
            "pointer";


        cartButton.addEventListener(
            "click",
            function () {

                window.location.href =
                    "index.html";

            }
        );

    }



    /* =====================================================
       INITIALIZE
    ===================================================== */

    renderCheckout();

});