/* =========================================================
   DREAMLY MART
   CHECKOUT.JS
   SECURE SUPABASE CHECKOUT SYSTEM
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       SUPABASE CONNECTION
    ===================================================== */

    const supabase =
        window.DreamlySupabase
            ? window.DreamlySupabase.client
            : null;


    /* =====================================================
       CART
    ===================================================== */

    function getCart() {

        try {

            return JSON.parse(
                localStorage.getItem("dreamlyCart")
            ) || [];

        } catch (error) {

            console.error(
                "Cart read error:",
                error
            );

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
        document.getElementById("continueShoppingButton");


    /* =====================================================
       DELIVERY CHARGE
       DHAKA = 80
       OTHER DISTRICTS = 120
    ===================================================== */

    const DHAKA_DELIVERY_CHARGE = 80;

    const OUTSIDE_DHAKA_DELIVERY_CHARGE = 120;


    /* =====================================================
       BANGLADESH DISTRICTS
    ===================================================== */

    const bangladeshDistricts = [

        "Bagerhat",
        "Bandarban",
        "Barguna",
        "Barishal",
        "Bhola",
        "Bogura",
        "Brahmanbaria",
        "Chandpur",
        "Chattogram",
        "Chuadanga",
        "Cox's Bazar",
        "Cumilla",
        "Dhaka",
        "Dinajpur",
        "Faridpur",
        "Feni",
        "Gaibandha",
        "Gazipur",
        "Gopalganj",
        "Habiganj",
        "Jamalpur",
        "Jashore",
        "Jhalokathi",
        "Jhenaidah",
        "Joypurhat",
        "Khagrachhari",
        "Khulna",
        "Kishoreganj",
        "Kurigram",
        "Kushtia",
        "Lakshmipur",
        "Lalmonirhat",
        "Madaripur",
        "Magura",
        "Manikganj",
        "Meherpur",
        "Moulvibazar",
        "Munshiganj",
        "Mymensingh",
        "Naogaon",
        "Narail",
        "Narayanganj",
        "Narsingdi",
        "Natore",
        "Nawabganj",
        "Netrokona",
        "Nilphamari",
        "Noakhali",
        "Pabna",
        "Panchagarh",
        "Patuakhali",
        "Pirojpur",
        "Rajbari",
        "Rajshahi",
        "Rangamati",
        "Rangpur",
        "Satkhira",
        "Shariatpur",
        "Sherpur",
        "Sirajganj",
        "Sunamganj",
        "Sylhet",
        "Tangail",
        "Thakurgaon"

    ];


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
       GET DELIVERY CHARGE
    ===================================================== */

    function getDeliveryCharge(district) {

        if (
            String(district || "")
                .trim()
                .toLowerCase() === "dhaka"
        ) {

            return DHAKA_DELIVERY_CHARGE;

        }

        return OUTSIDE_DHAKA_DELIVERY_CHARGE;

    }


    /* =====================================================
       CALCULATE SUBTOTAL
    ===================================================== */

    function calculateSubtotal() {

        const cart = getCart();

        return cart.reduce(
            function (total, item) {

                return (
                    total +
                    Number(item.price || 0) *
                    Number(item.quantity || 0)
                );

            },
            0
        );

    }


    /* =====================================================
       UPDATE TOTAL
    ===================================================== */

    function updateCheckoutTotal(charge = 0) {

        const subtotal =
            calculateSubtotal();

        const total =
            subtotal +
            Number(charge || 0);


        if (checkoutSubtotal) {

            checkoutSubtotal.textContent =
                formatMoney(subtotal);

        }


        if (checkoutTotal) {

            checkoutTotal.textContent =
                formatMoney(total);

        }

    }


    /* =====================================================
       DISTRICT SELECTOR
    ===================================================== */

    function setupDistrictSelector() {

        const selector =
            document.getElementById(
                "districtSelector"
            );

        const selectButton =
            document.getElementById(
                "districtSelectButton"
            );

        const dropdown =
            document.getElementById(
                "districtDropdown"
            );

        const searchInput =
            document.getElementById(
                "districtSearchInput"
            );

        const districtList =
            document.getElementById(
                "districtList"
            );

        const selectedText =
            document.getElementById(
                "selectedDistrictText"
            );

        const hiddenInput =
            document.getElementById(
                "customerDistrict"
            );


        if (
            !selector ||
            !selectButton ||
            !dropdown ||
            !searchInput ||
            !districtList ||
            !selectedText ||
            !hiddenInput
        ) {

            console.warn(
                "District selector elements not found."
            );

            return;

        }


        /* =================================================
           RENDER DISTRICTS
        ================================================= */

        function renderDistricts(searchTerm = "") {

            const query =
                searchTerm
                    .trim()
                    .toLowerCase();


            const filtered =
                bangladeshDistricts.filter(
                    function (district) {

                        return district
                            .toLowerCase()
                            .includes(query);

                    }
                );


            districtList.innerHTML = "";


            if (filtered.length === 0) {

                districtList.innerHTML = `

                    <div class="district-no-result">
                        No district found
                    </div>

                `;

                return;

            }


            filtered.forEach(
                function (district) {

                    const button =
                        document.createElement(
                            "button"
                        );


                    button.type = "button";

                    button.className =
                        "district-option";

                    button.textContent =
                        district;


                    button.addEventListener(
                        "click",
                        function () {

                            selectedText.textContent =
                                district;

                            hiddenInput.value =
                                district;

                            dropdown.classList.remove(
                                "show"
                            );

                            selectButton.setAttribute(
                                "aria-expanded",
                                "false"
                            );

                            searchInput.value =
                                "";

                            updateDeliveryCharge();

                        }
                    );


                    districtList.appendChild(
                        button
                    );

                }
            );

        }


        /* =================================================
           OPEN / CLOSE
        ================================================= */

        selectButton.addEventListener(
            "click",
            function () {

                const isOpen =
                    dropdown.classList.contains(
                        "show"
                    );


                if (isOpen) {

                    dropdown.classList.remove(
                        "show"
                    );

                    selectButton.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                } else {

                    dropdown.classList.add(
                        "show"
                    );

                    selectButton.setAttribute(
                        "aria-expanded",
                        "true"
                    );

                    renderDistricts();

                    setTimeout(
                        function () {

                            searchInput.focus();

                        },
                        50
                    );

                }

            }
        );


        /* =================================================
           SEARCH
        ================================================= */

        searchInput.addEventListener(
            "input",
            function () {

                renderDistricts(
                    searchInput.value
                );

            }
        );


        /* =================================================
           CLOSE WHEN CLICKING OUTSIDE
        ================================================= */

        document.addEventListener(
            "click",
            function (event) {

                if (
                    !selector.contains(
                        event.target
                    )
                ) {

                    dropdown.classList.remove(
                        "show"
                    );

                    selectButton.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }

            }
        );


        /* =================================================
           INITIAL DISTRICTS
        ================================================= */

        renderDistricts();

    }


    /* =====================================================
       UPDATE DELIVERY CHARGE
    ===================================================== */

    function updateDeliveryCharge() {

        const districtInput =
            document.getElementById(
                "customerDistrict"
            );


        if (!districtInput) {

            return;

        }


        const district =
            districtInput.value.trim();


        if (!district) {

            if (deliveryCharge) {

                deliveryCharge.textContent =
                    "Select District";

            }


            updateCheckoutTotal(0);

            return;

        }


        const charge =
            getDeliveryCharge(
                district
            );


        if (deliveryCharge) {

            deliveryCharge.textContent =
                formatMoney(charge);

        }


        updateCheckoutTotal(
            charge
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
                        Please add some products before checkout.
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
                    "Select District";

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


        let subtotal = 0;

        let totalItems = 0;


        cart.forEach(
            function (item) {

                const itemPrice =
                    Number(item.price || 0);

                const quantity =
                    Number(item.quantity || 0);

                const itemSubtotal =
                    itemPrice * quantity;


                subtotal +=
                    itemSubtotal;

                totalItems +=
                    quantity;


                /* =========================================
                   ITEM
                ========================================= */

                const itemElement =
                    document.createElement(
                        "div"
                    );

                itemElement.className =
                    "checkout-item";


                /* IMAGE */

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


                image.onerror =
                    function () {

                        image.style.display =
                            "none";

                        imageBox.innerHTML =
                            "<span>🛍️</span>";

                    };


                imageBox.appendChild(
                    image
                );


                /* INFO */

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


                const quantityText =
                    document.createElement(
                        "p"
                    );

                quantityText.textContent =
                    "Quantity: " +
                    quantity;


                const price =
                    document.createElement(
                        "strong"
                    );

                price.textContent =
                    formatMoney(
                        itemSubtotal
                    );


                info.appendChild(
                    title
                );

                info.appendChild(
                    quantityText
                );

                info.appendChild(
                    price
                );


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
           SUMMARY
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


        if (checkoutSubtotal) {

            checkoutSubtotal.textContent =
                formatMoney(subtotal);

        }


        if (deliveryCharge) {

            deliveryCharge.textContent =
                "Select District";

        }


        if (checkoutTotal) {

            checkoutTotal.textContent =
                formatMoney(subtotal);

        }

    }


    /* =====================================================
       PAYMENT METHOD
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
       SAVE ORDER THROUGH SECURE RPC
    ===================================================== */

    async function saveOrderToSupabase(order) {

        if (!supabase) {

            throw new Error(
                "Supabase connection is not available."
            );

        }


        const items =
            order.items.map(
                function (item) {

                    const price =
                        Number(
                            item.price || 0
                        );

                    const quantity =
                        Number(
                            item.quantity || 0
                        );


                    return {

                        product_id:
                            String(
                                item.id ??
                                item.productId ??
                                ""
                            ),

                        product_name:
                            String(
                                item.name ??
                                "Product"
                            ),

                        product_image:
                            item.image ||
                            null,

                        price:
                            price,

                        quantity:
                            quantity,

                        subtotal:
                            price * quantity

                    };

                }
            );


        const { data, error } =
            await supabase.rpc(
                "place_dreamly_order",
                {

                    p_order_number:
                        order.orderNumber,

                    p_customer_name:
                        order.customer.name,

                    p_customer_phone:
                        order.customer.phone,

                    p_customer_email:
                        order.customer.email ||
                        "",

                    p_customer_address:
                        order.customer.address,

                    p_customer_district:
                        order.customer.district,

                    p_order_note:
                        order.customer.note ||
                        "",

                    p_payment_method:
                        order.paymentMethod,

                    p_subtotal:
                        order.subtotal,

                    p_delivery_charge:
                        order.deliveryCharge,

                    p_total:
                        order.total,

                    p_items:
                        items

                }
            );


        if (error) {

            console.error(
                "Supabase RPC error:",
                error
            );

            throw error;

        }


        if (
            !data ||
            data.success !== true
        ) {

            throw new Error(
                "Order was not confirmed by database."
            );

        }


        return data;

    }


    /* =====================================================
       PLACE ORDER
    ===================================================== */

    async function placeOrder() {

        const cart =
            getCart();


        if (cart.length === 0) {

            alert(
                "Your cart is empty."
            );

            return;

        }


        if (!supabase) {

            alert(
                "Database connection is not ready. Please try again."
            );

            console.error(
                "DreamlySupabase client is missing."
            );

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


        if (
            termsCheckbox &&
            !termsCheckbox.checked
        ) {

            alert(
                "Please confirm that your delivery information is correct."
            );

            return;

        }


        /* =================================================
           CUSTOMER ELEMENTS
        ================================================= */

        const customerNameElement =
            document.getElementById(
                "customerName"
            );

        const customerPhoneElement =
            document.getElementById(
                "customerPhone"
            );

        const customerEmailElement =
            document.getElementById(
                "customerEmail"
            );

        const customerAddressElement =
            document.getElementById(
                "customerAddress"
            );

        const customerDistrictElement =
            document.getElementById(
                "customerDistrict"
            );

        const orderNoteElement =
            document.getElementById(
                "orderNote"
            );


        const district =
            customerDistrictElement
                ? customerDistrictElement.value.trim()
                : "";


        if (!district) {

            alert(
                "Please select your district."
            );

            return;

        }


        /* =================================================
           DELIVERY CHARGE
        ================================================= */

        const currentDeliveryCharge =
            getDeliveryCharge(
                district
            );


        /* =================================================
           CUSTOMER
        ================================================= */

        const customer = {

            name:
                customerNameElement
                    ? customerNameElement.value.trim()
                    : "",

            phone:
                customerPhoneElement
                    ? customerPhoneElement.value.trim()
                    : "",

            email:
                customerEmailElement
                    ? customerEmailElement.value.trim()
                    : "",

            address:
                customerAddressElement
                    ? customerAddressElement.value.trim()
                    : "",

            district:
                district,

            note:
                orderNoteElement
                    ? orderNoteElement.value.trim()
                    : ""

        };


        /* =================================================
           PAYMENT
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
           PRICE
        ================================================= */

        const subtotal =
            calculateSubtotal();


        const total =
            subtotal +
            currentDeliveryCharge;


        /* =================================================
           ORDER
        ================================================= */

        const order = {

            orderNumber:
                generateOrderNumber(),

            customer:
                customer,

            paymentMethod:
                paymentMethod,

            items:
                cart,

            subtotal:
                subtotal,

            deliveryCharge:
                currentDeliveryCharge,

            total:
                total

        };


        /* =================================================
           BUTTON
        ================================================= */

        if (placeOrderButton) {

            placeOrderButton.disabled =
                true;

            placeOrderButton.textContent =
                "⏳ Placing Order...";

        }


        try {

            const savedOrder =
                await saveOrderToSupabase(
                    order
                );


            /* =============================================
               CLEAR CART
            ============================================= */

            localStorage.removeItem(
                "dreamlyCart"
            );


            /* =============================================
               SUCCESS
            ============================================= */

            if (successOrderNumber) {

                successOrderNumber.textContent =
                    savedOrder.order_number ||
                    order.orderNumber;

            }


            if (successOverlay) {

                successOverlay.classList.add(
                    "show"
                );

            }


        } catch (error) {

            console.error(
                "Dreamly Mart order error:",
                error
            );


            alert(
                "অর্ডার সম্পন্ন করা যায়নি। অনুগ্রহ করে আবার চেষ্টা করুন।"
            );


        } finally {

            if (placeOrderButton) {

                placeOrderButton.disabled =
                    false;

                placeOrderButton.textContent =
                    "🛍️ Place Order";

            }

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

    setupDistrictSelector();

    renderCheckout();

    updateDeliveryCharge();

});