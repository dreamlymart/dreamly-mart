/* =========================================================
   DREAMLY MART
   CHECKOUT.JS

   COMPLETE CHECKOUT SYSTEM
   ---------------------------------------------------------
   • Cart
   • District Selection
   • Customer Information
   • Payment Method
   • Order Summary
   • Order Number
   • Order Storage
   • Order Success
========================================================= */


document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       CART
    ===================================================== */

    function getCart() {

        try {

            const cart =
                JSON.parse(
                    localStorage.getItem("dreamlyCart")
                );

            return Array.isArray(cart)
                ? cart
                : [];

        } catch (error) {

            return [];

        }

    }



    /* =====================================================
       ELEMENTS
    ===================================================== */

    const checkoutItems =
        document.getElementById(
            "checkoutItems"
        );


    const checkoutSubtotal =
        document.getElementById(
            "checkoutSubtotal"
        );


    const deliveryCharge =
        document.getElementById(
            "deliveryCharge"
        );


    const checkoutTotal =
        document.getElementById(
            "checkoutTotal"
        );


    const summaryCount =
        document.getElementById(
            "summaryCount"
        );


    const placeOrderButton =
        document.getElementById(
            "placeOrderButton"
        );


    const backToCartButton =
        document.getElementById(
            "backToCartButton"
        );


    const checkoutForm =
        document.getElementById(
            "checkoutForm"
        );


    const termsCheckbox =
        document.getElementById(
            "termsCheckbox"
        );


    const successOverlay =
        document.getElementById(
            "orderSuccessOverlay"
        );


    const successOrderNumber =
        document.getElementById(
            "successOrderNumber"
        );


    const continueShoppingButton =
        document.getElementById(
            "continueShoppingButton"
        );


    const districtSelect =
        document.getElementById(
            "customerDistrict"
        );



    /* =====================================================
       DELIVERY CHARGE
       -----------------------------------------------------
       আপাতত সারা বাংলাদেশে একই delivery charge।
       পরবর্তীতে district অনুযায়ী charge পরিবর্তন
       করা যাবে।
    ===================================================== */

    const DELIVERY_CHARGE = 80;



    /* =====================================================
       FORMAT MONEY
    ===================================================== */

    function formatMoney(amount) {

        return (
            "৳" +
            Number(amount || 0)
                .toLocaleString("en-BD")
        );

    }



    /* =====================================================
       DISTRICT VALIDATION
    ===================================================== */

    function validateDistrict() {

        if (!districtSelect) {

            return true;

        }


        if (!districtSelect.value) {

            districtSelect.setCustomValidity(
                "Please select your district."
            );

            return false;

        }


        districtSelect.setCustomValidity(
            ""
        );

        return true;

    }



    /* =====================================================
       DISTRICT CHANGE
    ===================================================== */

    if (districtSelect) {

        districtSelect.addEventListener(
            "change",
            function () {

                validateDistrict();

            }
        );

    }



    /* =====================================================
       RENDER CHECKOUT
    ===================================================== */

    function renderCheckout() {

        const cart =
            getCart();


        if (!checkoutItems) {

            return;

        }


        checkoutItems.innerHTML =
            "";



        /* =================================================
           EMPTY CART
        ================================================= */

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
                        Please add some products
                        before checkout.
                    </p>

                    <a href="index.html">
                        Continue Shopping
                    </a>

                </div>

            `;


            if (checkoutSubtotal) {

                checkoutSubtotal.textContent =
                    "৳0";

            }


            if (deliveryCharge) {

                deliveryCharge.textContent =
                    "৳0";

            }


            if (checkoutTotal) {

                checkoutTotal.textContent =
                    "৳0";

            }


            if (summaryCount) {

                summaryCount.textContent =
                    "0 items";

            }


            if (placeOrderButton) {

                placeOrderButton.disabled =
                    true;

            }


            return;

        }



        if (placeOrderButton) {

            placeOrderButton.disabled =
                false;

        }



        /* =================================================
           PRODUCTS
        ================================================= */

        let subtotal =
            0;


        let totalItems =
            0;


        cart.forEach(
            function (item) {


                const itemPrice =
                    Number(item.price) || 0;


                const itemQuantity =
                    Number(item.quantity) || 0;


                subtotal +=
                    itemPrice *
                    itemQuantity;


                totalItems +=
                    itemQuantity;



                /* =========================================
                   ITEM
                ========================================== */

                const itemElement =
                    document.createElement(
                        "div"
                    );


                itemElement.className =
                    "checkout-item";



                /* =========================================
                   IMAGE
                ========================================== */

                const imageBox =
                    document.createElement(
                        "div"
                    );


                imageBox.className =
                    "checkout-item-image";


                const image =
                    document.createElement(
                        "img"
                    );


                image.src =
                    item.image || "";


                image.alt =
                    item.name || "Product";


                image.loading =
                    "lazy";


                image.onerror =
                    function () {

                        image.style.display =
                            "none";


                        imageBox.innerHTML =
                            `
                            <span>
                                🛍️
                            </span>
                            `;

                    };


                imageBox.appendChild(
                    image
                );



                /* =========================================
                   PRODUCT INFO
                ========================================== */

                const info =
                    document.createElement(
                        "div"
                    );


                info.className =
                    "checkout-item-info";



                const title =
                    document.createElement(
                        "h3"
                    );


                title.textContent =
                    item.name || "Product";


                const quantity =
                    document.createElement(
                        "p"
                    );


                quantity.textContent =
                    "Quantity: " +
                    itemQuantity;


                const price =
                    document.createElement(
                        "strong"
                    );


                price.textContent =
                    formatMoney(
                        itemPrice *
                        itemQuantity
                    );


                info.appendChild(
                    title
                );


                info.appendChild(
                    quantity
                );


                info.appendChild(
                    price
                );



                /* =========================================
                   APPEND ITEM
                ========================================== */

                itemElement.appendChild(
                    imageBox
                );


                itemElement.appendChild(
                    info
                );


                checkoutItems.appendChild(
                    itemElement
                );

            }
        );



        /* =================================================
           TOTALS
        ================================================= */

        const finalDeliveryCharge =
            DELIVERY_CHARGE;


        const total =
            subtotal +
            finalDeliveryCharge;



        /* =================================================
           SUMMARY COUNT
        ================================================= */

        if (summaryCount) {

            summaryCount.textContent =
                totalItems +
                (
                    totalItems === 1
                        ? " item"
                        : " items"
                );

        }



        /* =================================================
           SUBTOTAL
        ================================================= */

        if (checkoutSubtotal) {

            checkoutSubtotal.textContent =
                formatMoney(
                    subtotal
                );

        }



        /* =================================================
           DELIVERY
        ================================================= */

        if (deliveryCharge) {

            deliveryCharge.textContent =
                formatMoney(
                    finalDeliveryCharge
                );

        }



        /* =================================================
           TOTAL
        ================================================= */

        if (checkoutTotal) {

            checkoutTotal.textContent =
                formatMoney(
                    total
                );

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
       PAYMENT RADIO CHANGE
    ===================================================== */

    const paymentInputs =
        document.querySelectorAll(
            'input[name="paymentMethod"]'
        );


    paymentInputs.forEach(
        function (input) {

            input.addEventListener(
                "change",
                function () {

                    paymentOptions.forEach(
                        function (option) {

                            option.classList.remove(
                                "active"
                            );

                        }
                    );


                    const selectedOption =
                        input.closest(
                            ".payment-option"
                        );


                    if (selectedOption) {

                        selectedOption.classList.add(
                            "active"
                        );

                    }

                }
            );

        }
    );



    /* =====================================================
       GENERATE ORDER NUMBER
    ===================================================== */

    function generateOrderNumber() {

        const now =
            new Date();


        const year =
            now.getFullYear();


        const month =
            String(
                now.getMonth() + 1
            ).padStart(
                2,
                "0"
            );


        const day =
            String(
                now.getDate()
            ).padStart(
                2,
                "0"
            );


        const hours =
            String(
                now.getHours()
            ).padStart(
                2,
                "0"
            );


        const minutes =
            String(
                now.getMinutes()
            ).padStart(
                2,
                "0"
            );


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
            hours +
            minutes +
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

            const savedOrders =
                JSON.parse(
                    localStorage.getItem(
                        "dreamlyOrders"
                    )
                );


            orders =
                Array.isArray(savedOrders)
                    ? savedOrders
                    : [];

        } catch (error) {

            orders = [];

        }


        orders.push(
            order
        );


        localStorage.setItem(
            "dreamlyOrders",
            JSON.stringify(
                orders
            )
        );

    }



    /* =====================================================
       GET CUSTOMER VALUE
    ===================================================== */

    function getValue(id) {

        const element =
            document.getElementById(
                id
            );


        if (!element) {

            return "";

        }


        return element.value.trim();

    }



    /* =====================================================
       PLACE ORDER
    ===================================================== */

    function placeOrder() {

        const cart =
            getCart();



        /* =================================================
           EMPTY CART
        ================================================= */

        if (cart.length === 0) {

            alert(
                "Your cart is empty."
            );

            return;

        }



        /* =================================================
           DISTRICT VALIDATION
        ================================================= */

        if (!validateDistrict()) {

            if (districtSelect) {

                districtSelect.focus();

            }

            return;

        }



        /* =================================================
           FORM VALIDATION
        ================================================= */

        if (
            !checkoutForm ||
            !checkoutForm.checkValidity()
        ) {

            if (checkoutForm) {

                checkoutForm.reportValidity();

            }

            return;

        }



        /* =================================================
           TERMS
        ================================================= */

        if (
            termsCheckbox &&
            !termsCheckbox.checked
        ) {

            alert(
                "Please confirm that your delivery information is correct."
            );

            termsCheckbox.focus();

            return;

        }



        /* =================================================
           CUSTOMER DATA
           -------------------------------------------------
           এখানে Post Code নেই।
        ================================================= */

        const customer = {

            name:
                getValue(
                    "customerName"
                ),


            phone:
                getValue(
                    "customerPhone"
                ),


            email:
                getValue(
                    "customerEmail"
                ),


            district:
                getValue(
                    "customerDistrict"
                ),


            address:
                getValue(
                    "customerAddress"
                ),


            note:
                getValue(
                    "orderNote"
                )

        };



        /* =================================================
           PAYMENT METHOD
        ================================================= */

        const paymentInput =
            document.querySelector(
                'input[name="paymentMethod"]:checked'
            );


        const paymentMethod =
            paymentInput
                ? paymentInput.value
                : "cod";



        /* =================================================
           CALCULATE SUBTOTAL
        ================================================= */

        let subtotal =
            0;


        cart.forEach(
            function (item) {

                const price =
                    Number(
                        item.price
                    ) || 0;


                const quantity =
                    Number(
                        item.quantity
                    ) || 0;


                subtotal +=
                    price *
                    quantity;

            }
        );



        /* =================================================
           DELIVERY CHARGE
        ================================================= */

        const finalDeliveryCharge =
            DELIVERY_CHARGE;



        /* =================================================
           FINAL TOTAL
        ================================================= */

        const total =
            subtotal +
            finalDeliveryCharge;



        /* =================================================
           CREATE ORDER
        ================================================= */

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
                finalDeliveryCharge,


            total:
                total

        };



        /* =================================================
           SAVE ORDER
        ================================================= */

        saveOrder(
            order
        );



        /* =================================================
           CLEAR CART
        ================================================= */

        localStorage.removeItem(
            "dreamlyCart"
        );



        /* =================================================
           UPDATE SUCCESS NUMBER
        ================================================= */

        if (successOrderNumber) {

            successOrderNumber.textContent =
                order.orderNumber;

        }



        /* =================================================
           SHOW SUCCESS MODAL
        ================================================= */

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
       CART BUTTON
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
       FORM — DISTRICT VALIDATION
    ===================================================== */

    if (checkoutForm) {

        checkoutForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();

                placeOrder();

            }
        );

    }



    /* =====================================================
       INITIALIZE
    ===================================================== */

    renderCheckout();

});