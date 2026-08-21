/* =========================================================
   DREAMLY MART
   CHECKOUT.JS
   SUPABASE DATABASE CHECKOUT SYSTEM
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
            Number(amount)
                .toLocaleString("en-BD")
        );

    }


    /* =====================================================
       GET DELIVERY CHARGE
    ===================================================== */

    function getDeliveryCharge(
        district
    ) {

        if (
            district &&
            district.trim().toLowerCase() ===
            "dhaka"
        ) {

            return DHAKA_DELIVERY_CHARGE;

        }

        return OUTSIDE_DHAKA_DELIVERY_CHARGE;

    }


    /* =====================================================
       DISTRICT SELECT SETUP

       CUSTOM SEARCHABLE DISTRICT SELECTOR
    ===================================================== */

    function setupDistrictSelect() {

        const districtInput =
            document.getElementById(
                "customerDistrict"
            );

        const selector =
            document.getElementById(
                "districtSelector"
            );

        const selectButton =
            document.getElementById(
                "districtSelectButton"
            );

        const selectedText =
            document.getElementById(
                "selectedDistrictText"
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


        if (
            !districtInput ||
            !selector ||
            !selectButton ||
            !selectedText ||
            !dropdown ||
            !searchInput ||
            !districtList
        ) {

            return;

        }


        /* =================================================
           RENDER DISTRICTS
        ================================================= */

        function renderDistricts(
            filter = ""
        ) {

            const query =
                String(filter || "")
                    .trim()
                    .toLowerCase();


            const matches =
                bangladeshDistricts.filter(
                    function (district) {

                        return district
                            .toLowerCase()
                            .includes(query);

                    }
                );


            districtList.innerHTML = "";


            if (
                matches.length === 0
            ) {

                districtList.innerHTML = `

                    <div
                        style="
                            padding:14px;
                            text-align:center;
                            color:#777;
                        "
                    >

                        No district found.

                    </div>

                `;

                return;

            }


            matches.forEach(
                function (district) {

                    const option =
                        document.createElement(
                            "button"
                        );


                    option.type =
                        "button";


                    option.className =
                        "district-option";


                    option.textContent =
                        district;


                    option.addEventListener(
                        "click",
                        function () {

                            districtInput.value =
                                district;


                            selectedText.textContent =
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


                            renderDistricts(
                                ""
                            );


                            districtInput.dispatchEvent(
                                new Event(
                                    "change",
                                    {
                                        bubbles:
                                            true
                                    }
                                )
                            );

                        }
                    );


                    districtList.appendChild(
                        option
                    );

                }
            );

        }


        renderDistricts();


        /* =================================================
           OPEN / CLOSE DISTRICT DROPDOWN
        ================================================= */

        selectButton.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();


                const isOpen =
                    dropdown.classList.contains(
                        "show"
                    );


                dropdown.classList.toggle(
                    "show",
                    !isOpen
                );


                selectButton.setAttribute(
                    "aria-expanded",
                    String(!isOpen)
                );


                if (!isOpen) {

                    searchInput.focus();

                }

            }
        );


        /* =================================================
           DISTRICT SEARCH
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
                    formatMoney(0);

            }


            updateCheckoutTotal(
                0
            );


            return;

        }


        const charge =
            getDeliveryCharge(
                district
            );


        if (deliveryCharge) {

            deliveryCharge.textContent =
                formatMoney(
                    charge
                );

        }


        updateCheckoutTotal(
            charge
        );

    }


    /* =====================================================
       UPDATE TOTAL
    ===================================================== */

    function updateCheckoutTotal(
        currentDeliveryCharge
    ) {

        const cart =
            getCart();


        let subtotal =
            0;


        cart.forEach(
            function (item) {

                subtotal +=
                    Number(item.price) *
                    Number(item.quantity);

            }
        );


        const total =
            subtotal +
            Number(
                currentDeliveryCharge
            );


        if (checkoutSubtotal) {

            checkoutSubtotal.textContent =
                formatMoney(
                    subtotal
                );

        }


        if (checkoutTotal) {

            checkoutTotal.textContent =
                formatMoney(
                    total
                );

        }

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

        if (
            cart.length === 0
        ) {

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
           ITEMS
        ================================================= */

        let subtotal =
            0;


        let totalItems =
            0;


        cart.forEach(
            function (item) {

                subtotal +=
                    Number(item.price) *
                    Number(item.quantity);


                totalItems +=
                    Number(item.quantity);


                const itemElement =
                    document.createElement(
                        "div"
                    );


                itemElement.className =
                    "checkout-item";


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


                imageBox.appendChild(
                    image
                );


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
                    item.name;


                const quantity =
                    document.createElement(
                        "p"
                    );


                quantity.textContent =
                    "Quantity: " +
                    item.quantity;


                const price =
                    document.createElement(
                        "strong"
                    );


                price.textContent =
                    formatMoney(
                        Number(item.price) *
                        Number(item.quantity)
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
                formatMoney(
                    subtotal
                );

        }


        if (deliveryCharge) {

            deliveryCharge.textContent =
                "৳0";

        }


        if (checkoutTotal) {

            checkoutTotal.textContent =
                formatMoney(
                    subtotal
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


        const random =
            Math.floor(
                1000 +
                Math.random() *
                9000
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
       RESOLVE CART PRODUCTS TO REAL DATABASE PRODUCT IDs
    ===================================================== */

    async function resolveCartProducts(
        cart
    ) {

        if (!supabase) {

            throw new Error(
                "Supabase connection is not available."
            );

        }


        const resolvedItems =
            [];


        for (
            const item of cart
        ) {

            let product =
                null;


            /* =================================================
               FIRST TRY REAL SUPABASE PRODUCT ID
            ================================================= */

            const byId =
                await supabase
                    .from(
                        "products"
                    )
                    .select(
                        "product_id,name,price,image,stock,is_active"
                    )
                    .eq(
                        "product_id",
                        String(
                            item.id || ""
                        ).trim()
                    )
                    .maybeSingle();


            if (byId.error) {

                throw byId.error;

            }


            product =
                byId.data;


            /* =================================================
               FALLBACK: SEARCH BY PRODUCT NAME

               This supports older cart items that used
               frontend IDs/slugs.
            ================================================= */

            if (
                !product &&
                item.name
            ) {

                const byName =
                    await supabase
                        .from(
                            "products"
                        )
                        .select(
                            "product_id,name,price,image,stock,is_active"
                        )
                        .eq(
                            "name",
                            String(
                                item.name
                            ).trim()
                        )
                        .maybeSingle();


                if (byName.error) {

                    throw byName.error;

                }


                product =
                    byName.data;

            }


            /* =================================================
               PRODUCT NOT FOUND
            ================================================= */

            if (!product) {

                throw new Error(
                    `Product "${item.name || item.id || "Unknown"}" was not found in the products table.`
                );

            }


            /* =================================================
               PRODUCT ACTIVE CHECK
            ================================================= */

            if (
                product.is_active === false
            ) {

                throw new Error(
                    `Product "${product.name || item.name}" is currently unavailable.`
                );

            }


            /* =================================================
               QUANTITY
            ================================================= */

            const quantity =
                Math.max(
                    1,
                    Number(
                        item.quantity || 0
                    )
                );


            /* =================================================
               STOCK CHECK
            ================================================= */

            const availableStock =
                Number(
                    product.stock || 0
                );


            if (
                availableStock <
                quantity
            ) {

                throw new Error(
                    `Insufficient stock for "${product.name || item.name}". Available: ${availableStock}, Required: ${quantity}.`
                );

            }


            /* =================================================
               RESOLVED PRODUCT
            ================================================= */

            resolvedItems.push({

                productId:
                    product.product_id,

                productName:
                    product.name ||
                    item.name,

                productImage:
                    product.image ||
                    item.image ||
                    null,

                price:
                    Number(
                        item.price ??
                        product.price ??
                        0
                    ),

                quantity:
                    quantity

            });

        }


        return resolvedItems;

    }


    /* =====================================================
       SAVE ORDER TO SUPABASE
    ===================================================== */

    async function saveOrderToSupabase(
        order
    ) {

        if (!supabase) {

            throw new Error(
                "Supabase connection is not available."
            );

        }


        /* =================================================
           RESOLVE PRODUCTS

           IMPORTANT:
           order_items.product_id must contain the
           real products.product_id.
        ================================================= */

        const resolvedItems =
            await resolveCartProducts(
                order.items
            );


        /* =================================================
           CUSTOMER
        ================================================= */

        const {
            data: customerData,
            error: customerError
        } = await supabase
            .from(
                "customers"
            )
            .insert({

                name:
                    order.customer.name,

                phone:
                    order.customer.phone,

                email:
                    order.customer.email ||
                    null,

                address:
                    order.customer.address,

                district:
                    order.customer.district,

                order_note:
                    order.customer.note ||
                    null

            })
            .select(
                "id"
            )
            .single();


        if (customerError) {

            console.error(
                "Customer insert error:",
                customerError
            );


            throw customerError;

        }


        const customerId =
            customerData.id;


        /* =================================================
           ORDER
        ================================================= */

        const {
            data: orderData,
            error: orderError
        } = await supabase
            .from(
                "orders"
            )
            .insert({

                order_number:
                    order.orderNumber,

                customer_id:
                    customerId,

                customer_name:
                    order.customer.name,

                customer_phone:
                    order.customer.phone,

                customer_email:
                    order.customer.email ||
                    null,

                customer_address:
                    order.customer.address,

                customer_district:
                    order.customer.district,

                order_note:
                    order.customer.note ||
                    null,

                payment_method:
                    order.paymentMethod,

                payment_status:
                    "Pending",

                order_status:
                    "Pending",

                subtotal:
                    order.subtotal,

                delivery_charge:
                    order.deliveryCharge,

                total:
                    order.total

            })
            .select(
                "id"
            )
            .single();


        if (orderError) {

            console.error(
                "Order insert error:",
                orderError
            );


            throw orderError;

        }


        const orderId =
            orderData.id;


        /* =================================================
           ORDER ITEMS
        ================================================= */

        const orderItems =
            resolvedItems.map(
                function (item) {

                    return {

                        order_id:
                            orderId,

                        /*
                         * IMPORTANT FIX:
                         * Real Supabase product_id
                         */

                        product_id:
                            item.productId,

                        product_name:
                            item.productName,

                        product_image:
                            item.productImage,

                        price:
                            item.price,

                        quantity:
                            item.quantity,

                        subtotal:
                            item.price *
                            item.quantity

                    };

                }
            );


        const {
            error: itemError
        } = await supabase
            .from(
                "order_items"
            )
            .insert(
                orderItems
            );


        if (itemError) {

            console.error(
                "Order item insert error:",
                itemError
            );


            throw itemError;

        }


        return {

            customerId:
                customerId,

            orderId:
                orderId,

            orderNumber:
                order.orderNumber

        };

    }


    /* =====================================================
       PLACE ORDER
    ===================================================== */

    async function placeOrder() {

        const cart =
            getCart();


        /* =================================================
           EMPTY CART
        ================================================= */

        if (
            cart.length === 0
        ) {

            alert(
                "Your cart is empty."
            );

            return;

        }


        /* =================================================
           SUPABASE CHECK
        ================================================= */

        if (!supabase) {

            alert(
                "Database connection is not ready. Please try again."
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


        /* =================================================
           TERMS CHECK
        ================================================= */

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
           CUSTOMER DATA
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


            if (
                customerDistrictElement
            ) {

                customerDistrictElement.focus();

            }


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
           CUSTOMER OBJECT
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
           CALCULATE SUBTOTAL
        ================================================= */

        let subtotal =
            0;


        cart.forEach(
            function (item) {

                subtotal +=
                    Number(item.price) *
                    Number(item.quantity);

            }
        );


        /* =================================================
           TOTAL
        ================================================= */

        const total =
            subtotal +
            currentDeliveryCharge;


        /* =================================================
           CREATE ORDER OBJECT
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
                currentDeliveryCharge,

            total:
                total

        };


        /* =================================================
           DISABLE BUTTON
        ================================================= */

        if (
            placeOrderButton
        ) {

            placeOrderButton.disabled =
                true;


            placeOrderButton.textContent =
                "⏳ Placing Order...";

        }


        /* =================================================
           SAVE ORDER
        ================================================= */

        try {

            const savedOrder =
                await saveOrderToSupabase(
                    order
                );


            /* =================================================
               CLEAR LOCAL CART
            ================================================= */

            localStorage.removeItem(
                "dreamlyCart"
            );


            /* =================================================
               SHOW SUCCESS
            ================================================= */

            if (
                successOrderNumber
            ) {

                successOrderNumber.textContent =
                    savedOrder.orderNumber;

            }


            if (
                successOverlay
            ) {

                successOverlay.classList.add(
                    "show"
                );

            }

        }

        catch (error) {

            console.error(
                "Dreamly Mart order error:",
                error
            );


            alert(
                "অর্ডার সম্পন্ন করা যায়নি। অনুগ্রহ করে আবার চেষ্টা করুন।"
            );

        }

        finally {

            if (
                placeOrderButton
            ) {

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

    if (
        placeOrderButton
    ) {

        placeOrderButton.addEventListener(
            "click",
            placeOrder
        );

    }


    /* =====================================================
       DISTRICT CHANGE
    ===================================================== */

    const districtElement =
        document.getElementById(
            "customerDistrict"
        );


    if (
        districtElement
    ) {

        districtElement.addEventListener(
            "change",
            updateDeliveryCharge
        );

    }


    /* =====================================================
       BACK TO CART
    ===================================================== */

    if (
        backToCartButton
    ) {

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

    if (
        continueShoppingButton
    ) {

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


    if (
        cartButton
    ) {

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

    setupDistrictSelect();

    renderCheckout();

});