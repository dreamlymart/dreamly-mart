/* =========================================================
   DREAMLY MART
   CHECKOUT.JS

   COMPLETE CHECKOUT SYSTEM
   64 DISTRICTS
   SEARCHABLE DISTRICT SELECTOR
   DHAKA DELIVERY = ৳80
   OUTSIDE DHAKA = ৳120
========================================================= */


document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       BANGLADESH DISTRICTS
    ===================================================== */

    const districts = [

        { name: "ঢাকা", search: "dhaka ঢাকা" },
        { name: "ফরিদপুর", search: "faridpur ফরিদপুর" },
        { name: "গাজীপুর", search: "gazipur গাজীপুর" },
        { name: "গোপালগঞ্জ", search: "gopalganj গোপালগঞ্জ" },
        { name: "কিশোরগঞ্জ", search: "kishoreganj কিশোরগঞ্জ" },
        { name: "মাদারীপুর", search: "madaripur মাদারীপুর" },
        { name: "মানিকগঞ্জ", search: "manikganj মানিকগঞ্জ" },
        { name: "মুন্সিগঞ্জ", search: "munshiganj মুন্সিগঞ্জ" },
        { name: "নারায়ণগঞ্জ", search: "narayanganj নারায়ণগঞ্জ" },
        { name: "নরসিংদী", search: "narsingdi নরসিংদী" },
        { name: "রাজবাড়ী", search: "rajbari রাজবাড়ী" },
        { name: "শরীয়তপুর", search: "shariatpur শরীয়তপুর" },
        { name: "টাঙ্গাইল", search: "tangail টাঙ্গাইল" },

        { name: "বাগেরহাট", search: "bagerhat বাগেরহাট" },
        { name: "চুয়াডাঙ্গা", search: "chuadanga চুয়াডাঙ্গা" },
        { name: "যশোর", search: "jashore যশোর" },
        { name: "ঝিনাইদহ", search: "jhenaidah ঝিনাইদহ" },
        { name: "খুলনা", search: "khulna খুলনা" },
        { name: "কুষ্টিয়া", search: "kushtia কুষ্টিয়া" },
        { name: "মাগুরা", search: "magura মাগুরা" },
        { name: "মেহেরপুর", search: "meherpur মেহেরপুর" },
        { name: "নড়াইল", search: "narail নড়াইল" },
        { name: "সাতক্ষীরা", search: "satkhira সাতক্ষীরা" },

        { name: "বান্দরবান", search: "bandarban বান্দরবান" },
        { name: "ব্রাহ্মণবাড়িয়া", search: "brahmanbaria ব্রাহ্মণবাড়িয়া" },
        { name: "চাঁদপুর", search: "chandpur চাঁদপুর" },
        { name: "চট্টগ্রাম", search: "chattogram chittagong চট্টগ্রাম" },
        { name: "কুমিল্লা", search: "cumilla comilla কুমিল্লা" },
        { name: "কক্সবাজার", search: "coxsbazar cox's bazar কক্সবাজার" },
        { name: "ফেনী", search: "feni ফেনী" },
        { name: "খাগড়াছড়ি", search: "khagrachhari khagrachari খাগড়াছড়ি" },
        { name: "লক্ষ্মীপুর", search: "lakshmipur লক্ষ্মীপুর" },
        { name: "নোয়াখালী", search: "noakhali নোয়াখালী" },
        { name: "রাঙ্গামাটি", search: "rangamati রাঙ্গামাটি" },

        { name: "বগুড়া", search: "bogura bogra বগুড়া" },
        { name: "জয়পুরহাট", search: "joypurhat জয়পুরহাট" },
        { name: "নওগাঁ", search: "naogaon নওগাঁ" },
        { name: "নাটোর", search: "natore নাটোর" },
        { name: "চাঁপাইনবাবগঞ্জ", search: "chapainawabganj চাঁপাইনবাবগঞ্জ" },
        { name: "পাবনা", search: "pabna পাবনা" },
        { name: "রাজশাহী", search: "rajshahi রাজশাহী" },
        { name: "সিরাজগঞ্জ", search: "sirajganj সিরাজগঞ্জ" },

        { name: "আক্কেলপুর", search: "akkelpur" },

        { name: "দিনাজপুর", search: "dinajpur দিনাজপুর" },
        { name: "গাইবান্ধা", search: "gaibandha গাইবান্ধা" },
        { name: "কুড়িগ্রাম", search: "kurigram কুড়িগ্রাম" },
        { name: "লালমনিরহাট", search: "lalmonirhat লালমনিরহাট" },
        { name: "নীলফামারী", search: "nilphamari নীলফামারী" },
        { name: "পঞ্চগড়", search: "panchagarh পঞ্চগড়" },
        { name: "রংপুর", search: "rangpur রংপুর" },
        { name: "ঠাকুরগাঁও", search: "thakurgaon ঠাকুরগাঁও" },

        { name: "হবিগঞ্জ", search: "habiganj হবিগঞ্জ" },
        { name: "মৌলভীবাজার", search: "moulvibazar মৌলভীবাজার" },
        { name: "সুনামগঞ্জ", search: "sunamganj সুনামগঞ্জ" },
        { name: "সিলেট", search: "sylhet সিলেট" },

        { name: "জামালপুর", search: "jamalpur জামালপুর" },
        { name: "ময়মনসিংহ", search: "mymensingh ময়মনসিংহ" },
        { name: "নেত্রকোণা", search: "netrokona নেত্রকোণা" },
        { name: "শেরপুর", search: "sherpur শেরপুর" },

        { name: "বরগুনা", search: "barguna বরগুনা" },
        { name: "বরিশাল", search: "barishal বরিশাল" },
        { name: "ভোলা", search: "bhola ভোলা" },
        { name: "ঝালকাঠি", search: "jhalokati ঝালকাঠি" },
        { name: "পটুয়াখালী", search: "patuakhali পটুয়াখালী" },
        { name: "পিরোজপুর", search: "pirojpur পিরোজপুর" }

    ];


    /*
     * IMPORTANT:
     * The accidental "আক্কেলপুর" entry above is NOT a district.
     * Remove it automatically so the system always contains
     * exactly Bangladesh's 64 districts.
     */

    const validDistricts =
        districts.filter(function (district) {

            return district.name !== "আক্কেলপুর";

        });



    /* =====================================================
       DELIVERY CHARGE
    ===================================================== */

    const DHAKA_DELIVERY_CHARGE = 80;

    const OUTSIDE_DHAKA_DELIVERY_CHARGE = 120;



    function getDeliveryCharge(district) {

        if (!district) {

            return 0;

        }


        if (
            district.trim() === "ঢাকা"
        ) {

            return DHAKA_DELIVERY_CHARGE;

        }


        return OUTSIDE_DHAKA_DELIVERY_CHARGE;

    }



    /* =====================================================
       CART
    ===================================================== */

    function getCart() {

        try {

            const cart =
                JSON.parse(
                    localStorage.getItem(
                        "dreamlyCart"
                    )
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



    /* =====================================================
       DISTRICT ELEMENTS
    ===================================================== */

    const districtSelector =
        document.getElementById(
            "districtSelector"
        );


    const districtSelectButton =
        document.getElementById(
            "districtSelectButton"
        );


    const districtDropdown =
        document.getElementById(
            "districtDropdown"
        );


    const districtSearchInput =
        document.getElementById(
            "districtSearchInput"
        );


    const districtList =
        document.getElementById(
            "districtList"
        );


    const selectedDistrictText =
        document.getElementById(
            "selectedDistrictText"
        );


    const customerDistrict =
        document.getElementById(
            "customerDistrict"
        );



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
       DISTRICT LIST
    ===================================================== */

    function renderDistricts(searchText = "") {

        if (!districtList) {

            return;

        }


        districtList.innerHTML = "";


        const search =
            searchText
                .trim()
                .toLowerCase();


        const filtered =
            validDistricts.filter(
                function (district) {

                    return district.search
                        .toLowerCase()
                        .includes(search);

                }
            );


        if (filtered.length === 0) {

            districtList.innerHTML = `

                <div class="no-district-found">

                    🔍

                    <strong>
                        District not found
                    </strong>

                    <small>
                        Try another name.
                    </small>

                </div>

            `;

            return;

        }


        filtered.forEach(
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
                    district.name;


                option.dataset.district =
                    district.name;


                option.addEventListener(
                    "click",
                    function () {

                        selectDistrict(
                            district.name
                        );

                    }
                );


                districtList.appendChild(
                    option
                );

            }
        );

    }



    /* =====================================================
       SELECT DISTRICT
    ===================================================== */

    function selectDistrict(districtName) {

        if (
            !districtName ||
            !customerDistrict
        ) {

            return;

        }


        customerDistrict.value =
            districtName;


        if (selectedDistrictText) {

            selectedDistrictText.textContent =
                districtName;

            selectedDistrictText.classList.add(
                "selected"
            );

        }


        closeDistrictDropdown();


        updateCheckoutTotals();

    }



    /* =====================================================
       OPEN DISTRICT DROPDOWN
    ===================================================== */

    function openDistrictDropdown() {

        if (
            !districtDropdown ||
            !districtSelectButton
        ) {

            return;

        }


        districtDropdown.classList.add(
            "show"
        );


        districtSelectButton.setAttribute(
            "aria-expanded",
            "true"
        );


        if (districtSearchInput) {

            districtSearchInput.value =
                "";

            renderDistricts();

            setTimeout(
                function () {

                    districtSearchInput.focus();

                },
                50
            );

        }

    }



    /* =====================================================
       CLOSE DISTRICT DROPDOWN
    ===================================================== */

    function closeDistrictDropdown() {

        if (
            !districtDropdown ||
            !districtSelectButton
        ) {

            return;

        }


        districtDropdown.classList.remove(
            "show"
        );


        districtSelectButton.setAttribute(
            "aria-expanded",
            "false"
        );

    }



    /* =====================================================
       DISTRICT BUTTON
    ===================================================== */

    if (districtSelectButton) {

        districtSelectButton.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();


                if (
                    districtDropdown &&
                    districtDropdown.classList.contains(
                        "show"
                    )
                ) {

                    closeDistrictDropdown();

                } else {

                    openDistrictDropdown();

                }

            }
        );

    }



    /* =====================================================
       DISTRICT SEARCH
    ===================================================== */

    if (districtSearchInput) {

        districtSearchInput.addEventListener(
            "input",
            function () {

                renderDistricts(
                    districtSearchInput.value
                );

            }
        );


        districtSearchInput.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();

            }
        );

    }



    /* =====================================================
       CLOSE DISTRICT WHEN CLICKING OUTSIDE
    ===================================================== */

    document.addEventListener(
        "click",
        function (event) {

            if (
                districtSelector &&
                !districtSelector.contains(
                    event.target
                )
            ) {

                closeDistrictDropdown();

            }

        }
    );



    /* =====================================================
       UPDATE TOTALS
    ===================================================== */

    function updateCheckoutTotals() {

        const cart =
            getCart();


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

            }
        );


        const selectedDistrict =
            customerDistrict
                ? customerDistrict.value
                : "";


        const charge =
            getDeliveryCharge(
                selectedDistrict
            );


        const total =
            subtotal + charge;


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

            if (!selectedDistrict) {

                deliveryCharge.textContent =
                    "Select District";

            } else {

                deliveryCharge.textContent =
                    formatMoney(charge);

            }

        }


        if (checkoutTotal) {

            if (!selectedDistrict) {

                checkoutTotal.textContent =
                    formatMoney(subtotal);

            } else {

                checkoutTotal.textContent =
                    formatMoney(total);

            }

        }

    }



    /* =====================================================
       RENDER CHECKOUT ITEMS
    ===================================================== */

    function renderCheckout() {

        const cart =
            getCart();


        if (!checkoutItems) {

            return;

        }


        checkoutItems.innerHTML =
            "";


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


            if (placeOrderButton) {

                placeOrderButton.disabled =
                    true;

            }


            updateCheckoutTotals();

            return;

        }


        if (placeOrderButton) {

            placeOrderButton.disabled =
                false;

        }


        cart.forEach(
            function (item) {

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

                        this.style.display =
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


        updateCheckoutTotals();

    }



    /* =====================================================
       PAYMENT UI
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
       ORDER NUMBER
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


        orders.push(
            order
        );


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


        /* FORM VALIDATION */

        if (
            !checkoutForm ||
            !checkoutForm.checkValidity()
        ) {

            if (checkoutForm) {

                checkoutForm.reportValidity();

            }

            return;

        }


        /* DISTRICT VALIDATION */

        if (
            !customerDistrict ||
            !customerDistrict.value
        ) {

            alert(
                "Please select your district."
            );

            openDistrictDropdown();

            return;

        }


        /* TERMS */

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
           CUSTOMER INFORMATION
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
                customerDistrict.value,

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
           TOTAL
        ================================================== */

        let subtotal =
            0;


        cart.forEach(
            function (item) {

                subtotal +=
                    Number(item.price) *
                    Number(item.quantity);

            }
        );


        const selectedDeliveryCharge =
            getDeliveryCharge(
                customer.district
            );


        const total =
            subtotal +
            selectedDeliveryCharge;



        /* =================================================
           CREATE ORDER
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
                selectedDeliveryCharge,

            total:
                total

        };


        /* SAVE */

        saveOrder(
            order
        );


        /* CLEAR CART */

        localStorage.removeItem(
            "dreamlyCart"
        );


        /* SUCCESS NUMBER */

        if (successOrderNumber) {

            successOrderNumber.textContent =
                order.orderNumber;

        }


        /* SUCCESS MODAL */

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
       HEADER CART
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

    renderDistricts();

    renderCheckout();

    updateCheckoutTotals();

});