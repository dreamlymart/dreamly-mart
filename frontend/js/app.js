/* =========================================================
   DREAMLY MART
   APP.JS

   CATEGORY
   PRODUCT
   SEARCH
   CART
   PRODUCT DETAILS
   CHECKOUT
========================================================= */


document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       CATEGORY — VIEW ALL
    ===================================================== */

    const viewAllButton =
        document.getElementById("viewAllCategories");

    const allCategories =
        document.getElementById("allCategories");

    const closeButton =
        document.getElementById("closeCategories");


    if (viewAllButton && allCategories) {

        viewAllButton.addEventListener(
            "click",
            function () {

                allCategories.classList.add("show");

                allCategories.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }
        );

    }


    /* =====================================================
       CATEGORY — CLOSE
    ===================================================== */

    if (closeButton && allCategories) {

        closeButton.addEventListener(
            "click",
            function () {

                allCategories.classList.remove("show");

                const categories =
                    document.getElementById("categories");


                if (categories) {

                    categories.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }

            }
        );

    }



    /* =====================================================
       TOP SELLING PRODUCTS
    ===================================================== */

    const topSellingProducts = [

        {
            id: "casio-illuminator-watch",

            name:
                "Casio Illuminator Premium Watch",

            price:
                1590,

            oldPrice:
                1990,

            discount:
                "-20%",

            rating:
                5,

            reviews:
                0,

            category:
                "Fashion & Style",

            image:
                "images/casio-watch.jpg",

            description:
                "Premium Casio Illuminator watch with a stylish design, perfect for everyday use and special occasions."
        },


        {
            id: "maximum-mb3031-phone",

            name:
                "Maximum MB3031 Antenna Phone",

            price:
                2290,

            oldPrice:
                2690,

            discount:
                "-15%",

            rating:
                5,

            reviews:
                0,

            category:
                "Electronics & Gadgets",

            image:
                "images/maximum-phone.jpg",

            description:
                "Maximum MB3031 Antenna Phone featuring dual antenna support, powerful battery and practical everyday features."
        },


        {
            id: "smart-gadget-premium",

            name:
                "Smart Gadget Premium Collection",

            price:
                990,

            oldPrice:
                1320,

            discount:
                "-25%",

            rating:
                5,

            reviews:
                0,

            category:
                "Electronics & Gadgets",

            image:
                "images/smart-gadget.jpg",

            description:
                "A premium smart gadget collection designed to make everyday life easier and smarter."
        },


        {
            id: "premium-gift-combo",

            name:
                "Premium Gift and Combo Pack",

            price:
                1290,

            oldPrice:
                1440,

            discount:
                "-10%",

            rating:
                5,

            reviews:
                0,

            category:
                "Gifts & Combos",

            image:
                "images/gift-combo.jpg",

            description:
                "A beautiful premium gift and combo pack, perfect for birthdays, celebrations and special moments."
        }

    ];



    /* =====================================================
       NEW ARRIVALS
    ===================================================== */

    const newArrivalProducts = [

        {
            id:
                "new-arrival-premium",

            name:
                "New Arrival Premium Product",

            price:
                1490,

            oldPrice:
                null,

            discount:
                "NEW",

            rating:
                5,

            reviews:
                0,

            category:
                "Others",

            image:
                "images/new-arrival.jpg",

            description:
                "A newly arrived premium product selected for Dreamly Mart customers."
        },


        {
            id:
                "smart-lifestyle-product",

            name:
                "Smart Lifestyle Product",

            price:
                890,

            oldPrice:
                null,

            discount:
                "NEW",

            rating:
                5,

            reviews:
                0,

            category:
                "Home & Kitchen",

            image:
                "images/smart-lifestyle.jpg",

            description:
                "A smart lifestyle product designed to add convenience and comfort to everyday living."
        }

    ];



    /* =====================================================
       ALL PRODUCTS
    ===================================================== */

    const allProducts = [

        ...topSellingProducts,

        ...newArrivalProducts

    ];



    /* =====================================================
       PRODUCT DETAILS
    ===================================================== */

    function openProductDetails(product) {

        localStorage.setItem(
            "dreamlySelectedProduct",
            JSON.stringify(product)
        );


        window.location.href =
            "product-details.html";

    }



    /* =====================================================
       CART STORAGE
    ===================================================== */

    function getCart() {

        try {

            return JSON.parse(
                localStorage.getItem(
                    "dreamlyCart"
                )
            ) || [];

        } catch (error) {

            return [];

        }

    }


    function saveCart(cart) {

        localStorage.setItem(
            "dreamlyCart",
            JSON.stringify(cart)
        );

    }



    /* =====================================================
       PRODUCT CARD
    ===================================================== */

    function createProductCard(product) {

        const card =
            document.createElement("article");


        card.className =
            "product-card";


        card.setAttribute(
            "data-product-id",
            product.id
        );



        /* =================================================
           PRODUCT IMAGE
        ================================================= */

        const imageBox =
            document.createElement("div");


        imageBox.className =
            "product-image";


        const image =
            document.createElement("img");


        image.src =
            product.image;


        image.alt =
            product.name;


        image.loading =
            "lazy";


        image.onerror =
            function () {

                image.style.display =
                    "none";


                imageBox.classList.add(
                    "image-placeholder"
                );


                if (
                    imageBox.querySelector(
                        ".product-image-fallback"
                    )
                ) {

                    return;

                }


                const fallback =
                    document.createElement("div");


                fallback.className =
                    "product-image-fallback";


                fallback.innerHTML = `
                    <span>🛍️</span>
                    <small>Product Image</small>
                `;


                imageBox.appendChild(
                    fallback
                );

            };


        imageBox.appendChild(
            image
        );



        /* =================================================
           DISCOUNT / NEW BADGE
        ================================================= */

        if (product.discount) {

            const badge =
                document.createElement("span");


            if (
                product.discount === "NEW"
            ) {

                badge.className =
                    "new-badge";

            } else {

                badge.className =
                    "discount-badge";

            }


            badge.textContent =
                product.discount;


            imageBox.appendChild(
                badge
            );

        }


        card.appendChild(
            imageBox
        );



        /* =================================================
           PRODUCT INFORMATION
        ================================================= */

        const info =
            document.createElement("div");


        info.className =
            "product-info";



        /* PRODUCT NAME */

        const title =
            document.createElement("h3");


        title.textContent =
            product.name;


        info.appendChild(
            title
        );



        /* =================================================
           RATING
        ================================================= */

        const rating =
            document.createElement("div");


        rating.className =
            "product-rating";


        const stars =
            document.createElement("span");


        stars.textContent =
            "★★★★★";


        const reviews =
            document.createElement("span");


        reviews.textContent =
            ` (${product.reviews})`;


        rating.appendChild(
            stars
        );


        rating.appendChild(
            reviews
        );


        info.appendChild(
            rating
        );



        /* =================================================
           PRICE
        ================================================= */

        const priceBox =
            document.createElement("div");


        priceBox.className =
            "product-price";


        const currentPrice =
            document.createElement("span");


        currentPrice.className =
            "current-price";


        currentPrice.textContent =
            "৳" +
            product.price.toLocaleString("en-BD");


        priceBox.appendChild(
            currentPrice
        );


        if (product.oldPrice) {

            const oldPrice =
                document.createElement("span");


            oldPrice.className =
                "old-price";


            oldPrice.textContent =
                "৳" +
                product.oldPrice.toLocaleString("en-BD");


            priceBox.appendChild(
                oldPrice
            );

        }


        info.appendChild(
            priceBox
        );



        /* =================================================
           ACTION BUTTONS
        ================================================= */

        const actions =
            document.createElement("div");


        actions.className =
            "product-actions";



        /* =================================================
           ADD TO CART
        ================================================= */

        const cartButton =
            document.createElement("button");


        cartButton.className =
            "add-cart-btn";


        cartButton.type =
            "button";


        cartButton.textContent =
            "🛒 Add to Cart";


        cartButton.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();

                addToCart(product);

            }
        );



        /* =================================================
           BUY NOW
        ================================================= */

        const buyButton =
            document.createElement("button");


        buyButton.className =
            "buy-now-btn";


        buyButton.type =
            "button";


        buyButton.textContent =
            "Buy Now";


        buyButton.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();

                openProductDetails(
                    product
                );

            }
        );


        actions.appendChild(
            cartButton
        );


        actions.appendChild(
            buyButton
        );


        info.appendChild(
            actions
        );


        card.appendChild(
            info
        );



        /* =================================================
           CARD CLICK
        ================================================= */

        card.addEventListener(
            "click",
            function () {

                openProductDetails(
                    product
                );

            }
        );


        return card;

    }



    /* =====================================================
       DISPLAY PRODUCTS
    ===================================================== */

    function displayProducts(
        products,
        grid
    ) {

        if (!grid) {

            return;

        }


        grid.innerHTML =
            "";


        products.forEach(
            function (product) {

                const card =
                    createProductCard(
                        product
                    );


                grid.appendChild(
                    card
                );

            }
        );

    }



    /* =====================================================
       DISPLAY TOP SELLING
    ===================================================== */

    const productSections =
        document.querySelectorAll(
            ".products"
        );


    if (
        productSections.length > 0
    ) {

        const topGrid =
            productSections[0]
                .querySelector(
                    ".product-grid"
                );


        displayProducts(
            topSellingProducts,
            topGrid
        );

    }



    /* =====================================================
       DISPLAY NEW ARRIVALS
    ===================================================== */

    if (
        productSections.length > 1
    ) {

        const newGrid =
            productSections[1]
                .querySelector(
                    ".product-grid"
                );


        displayProducts(
            newArrivalProducts,
            newGrid
        );

    }



    /* =====================================================
       CART — ADD PRODUCT
    ===================================================== */

    function addToCart(product) {

        const cart =
            getCart();


        const existingProduct =
            cart.find(
                function (item) {

                    return (
                        item.id === product.id
                    );

                }
            );


        if (existingProduct) {

            existingProduct.quantity += 1;

        } else {

            cart.push({

                id:
                    product.id,

                name:
                    product.name,

                price:
                    product.price,

                image:
                    product.image,

                quantity:
                    1

            });

        }


        saveCart(
            cart
        );


        updateCartCount();


        renderCart();


        openCart();

    }



    /* =====================================================
       UPDATE CART QUANTITY
    ===================================================== */

    function updateCartQuantity(
        productId,
        change
    ) {

        const cart =
            getCart();


        const product =
            cart.find(
                function (item) {

                    return (
                        item.id === productId
                    );

                }
            );


        if (!product) {

            return;

        }


        product.quantity +=
            change;


        if (
            product.quantity <= 0
        ) {

            const index =
                cart.findIndex(
                    function (item) {

                        return (
                            item.id === productId
                        );

                    }
                );


            if (index !== -1) {

                cart.splice(
                    index,
                    1
                );

            }

        }


        saveCart(
            cart
        );


        updateCartCount();


        renderCart();

    }



    /* =====================================================
       REMOVE PRODUCT
    ===================================================== */

    function removeFromCart(
        productId
    ) {

        let cart =
            getCart();


        cart =
            cart.filter(
                function (item) {

                    return (
                        item.id !== productId
                    );

                }
            );


        saveCart(
            cart
        );


        updateCartCount();


        renderCart();

    }



    /* =====================================================
       CART COUNT
    ===================================================== */

    function updateCartCount() {

        const cart =
            getCart();


        const totalItems =
            cart.reduce(
                function (
                    total,
                    item
                ) {

                    return (
                        total +
                        item.quantity
                    );

                },
                0
            );


        const cartIcon =
            document.querySelector(
                ".header-icons span:first-child"
            );


        if (!cartIcon) {

            return;

        }


        cartIcon.style.position =
            "relative";


        let badge =
            cartIcon.querySelector(
                ".cart-count"
            );


        if (!badge) {

            badge =
                document.createElement(
                    "span"
                );


            badge.className =
                "cart-count";


            cartIcon.appendChild(
                badge
            );

        }


        badge.textContent =
            totalItems;


        badge.style.display =
            totalItems > 0
                ? "flex"
                : "none";

    }



    /* =====================================================
       CREATE CART UI
    ===================================================== */

    function createCartUI() {

        if (
            document.getElementById(
                "dreamlyCartOverlay"
            )
        ) {

            return;

        }


        const overlay =
            document.createElement(
                "div"
            );


        overlay.id =
            "dreamlyCartOverlay";


        overlay.className =
            "cart-overlay";


        const drawer =
            document.createElement(
                "aside"
            );


        drawer.id =
            "dreamlyCartDrawer";


        drawer.className =
            "cart-drawer";


        drawer.innerHTML = `

            <div class="cart-header">

                <h2>
                    🛒 Your Cart
                </h2>

                <button
                    type="button"
                    class="cart-close-btn"
                    id="cartCloseButton"
                    aria-label="Close cart"
                >
                    ✕
                </button>

            </div>


            <div
                class="cart-items"
                id="cartItems"
            ></div>


            <div
                class="cart-footer"
                id="cartFooter"
            ></div>

        `;


        overlay.appendChild(
            drawer
        );


        document.body.appendChild(
            overlay
        );


        overlay.addEventListener(
            "click",
            function (event) {

                if (
                    event.target === overlay
                ) {

                    closeCart();

                }

            }
        );


        const closeButton =
            document.getElementById(
                "cartCloseButton"
            );


        if (closeButton) {

            closeButton.addEventListener(
                "click",
                closeCart
            );

        }

    }



    /* =====================================================
       RENDER CART
    ===================================================== */

    function renderCart() {

        createCartUI();


        const cart =
            getCart();


        const cartItems =
            document.getElementById(
                "cartItems"
            );


        const cartFooter =
            document.getElementById(
                "cartFooter"
            );


        if (
            !cartItems ||
            !cartFooter
        ) {

            return;

        }


        cartItems.innerHTML =
            "";


        cartFooter.innerHTML =
            "";



        /* =================================================
           EMPTY CART
        ================================================= */

        if (
            cart.length === 0
        ) {

            cartItems.innerHTML = `

                <div class="empty-cart">

                    <div class="empty-cart-icon">
                        🛒
                    </div>

                    <h3>
                        Your Cart is Empty
                    </h3>

                    <p>
                        Add some products to your cart.
                    </p>

                </div>

            `;


            return;

        }



        /* =================================================
           CART PRODUCTS
        ================================================= */

        let subtotal =
            0;


        cart.forEach(
            function (item) {

                subtotal +=
                    item.price *
                    item.quantity;


                const cartItem =
                    document.createElement(
                        "div"
                    );


                cartItem.className =
                    "cart-item";


                cartItem.innerHTML = `

                    <div class="cart-item-image">

                        <img
                            src="${item.image}"
                            alt="${item.name}"
                        >

                    </div>


                    <div class="cart-item-info">

                        <h3>
                            ${item.name}
                        </h3>

                        <strong>
                            ৳${item.price.toLocaleString("en-BD")}
                        </strong>


                        <div class="cart-item-controls">

                            <button
                                type="button"
                                class="quantity-btn minus-btn"
                                data-id="${item.id}"
                            >
                                −
                            </button>


                            <span>
                                ${item.quantity}
                            </span>


                            <button
                                type="button"
                                class="quantity-btn plus-btn"
                                data-id="${item.id}"
                            >
                                +
                            </button>

                        </div>

                    </div>


                    <button
                        type="button"
                        class="remove-cart-btn"
                        data-id="${item.id}"
                        aria-label="Remove product"
                    >
                        🗑️
                    </button>

                `;


                const cartImage =
                    cartItem.querySelector(
                        "img"
                    );


                if (cartImage) {

                    cartImage.onerror =
                        function () {

                            this.style.display =
                                "none";

                        };

                }


                cartItems.appendChild(
                    cartItem
                );

            }
        );



        /* =================================================
           MINUS BUTTON
        ================================================= */

        cartItems
            .querySelectorAll(
                ".minus-btn"
            )
            .forEach(
                function (button) {

                    button.addEventListener(
                        "click",
                        function () {

                            updateCartQuantity(
                                button.dataset.id,
                                -1
                            );

                        }
                    );

                }
            );



        /* =================================================
           PLUS BUTTON
        ================================================= */

        cartItems
            .querySelectorAll(
                ".plus-btn"
            )
            .forEach(
                function (button) {

                    button.addEventListener(
                        "click",
                        function () {

                            updateCartQuantity(
                                button.dataset.id,
                                1
                            );

                        }
                    );

                }
            );



        /* =================================================
           REMOVE BUTTON
        ================================================= */

        cartItems
            .querySelectorAll(
                ".remove-cart-btn"
            )
            .forEach(
                function (button) {

                    button.addEventListener(
                        "click",
                        function () {

                            removeFromCart(
                                button.dataset.id
                            );

                        }
                    );

                }
            );



        /* =================================================
           CART FOOTER
        ================================================= */

        cartFooter.innerHTML = `

            <div class="cart-summary">

                <span>
                    Subtotal
                </span>

                <strong>
                    ৳${subtotal.toLocaleString("en-BD")}
                </strong>

            </div>


            <button
                type="button"
                class="checkout-btn"
                id="checkoutButton"
            >
                Proceed to Checkout
            </button>

        `;


        const checkoutButton =
            document.getElementById(
                "checkoutButton"
            );


        /* =================================================
           CHECKOUT BUTTON
        ================================================= */

        if (checkoutButton) {

            checkoutButton.addEventListener(
                "click",
                function () {

                    /*
                     * Checkout page
                     * The cart is already saved
                     * in localStorage.
                     */

                    window.location.href =
                        "checkout.html";

                }
            );

        }

    }



    /* =====================================================
       OPEN CART
    ===================================================== */

    function openCart() {

        createCartUI();


        renderCart();


        const overlay =
            document.getElementById(
                "dreamlyCartOverlay"
            );


        if (overlay) {

            overlay.classList.add(
                "show"
            );

        }

    }



    /* =====================================================
       CLOSE CART
    ===================================================== */

    function closeCart() {

        const overlay =
            document.getElementById(
                "dreamlyCartOverlay"
            );


        if (overlay) {

            overlay.classList.remove(
                "show"
            );

        }

    }



    /* =====================================================
       HEADER CART BUTTON
    ===================================================== */

    const headerCart =
        document.querySelector(
            ".header-icons span:first-child"
        );


    if (headerCart) {

        headerCart.style.cursor =
            "pointer";


        headerCart.addEventListener(
            "click",
            function () {

                openCart();

            }
        );

    }



    /* =====================================================
       CATEGORY CARD CLICK
    ===================================================== */

    const categoryCards =
        document.querySelectorAll(
            ".category-card, .all-category-card"
        );


    categoryCards.forEach(
        function (categoryCard) {

            categoryCard.addEventListener(
                "click",
                function () {

                    const category =
                        categoryCard.dataset.category;


                    if (!category) {

                        return;

                    }


                    localStorage.setItem(
                        "dreamlySelectedCategory",
                        category
                    );


                    console.log(
                        "Selected Category:",
                        category
                    );

                }
            );

        }
    );



    /* =====================================================
       SEARCH
    ===================================================== */

    const searchInput =
        document.querySelector(
            ".search-box input"
        );


    const searchButton =
        document.querySelector(
            ".search-box button"
        );


    function performSearch() {

        if (!searchInput) {

            return;

        }


        const searchText =
            searchInput.value
                .trim()
                .toLowerCase();


        if (!searchText) {

            return;

        }


        const matchedProducts =
            allProducts.filter(
                function (product) {

                    return (

                        product.name
                            .toLowerCase()
                            .includes(
                                searchText
                            )

                        ||

                        product.category
                            .toLowerCase()
                            .includes(
                                searchText
                            )

                    );

                }
            );


        if (
            matchedProducts.length > 0
        ) {

            displaySearchResults(
                matchedProducts
            );

        } else {

            alert(
                "No products found."
            );

        }

    }



    /* =====================================================
       SEARCH RESULTS
    ===================================================== */

    function displaySearchResults(
        products
    ) {

        const firstProductSection =
            document.querySelector(
                ".products"
            );


        if (!firstProductSection) {

            return;

        }


        firstProductSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });


        const grid =
            firstProductSection.querySelector(
                ".product-grid"
            );


        displayProducts(
            products,
            grid
        );

    }



    /* =====================================================
       SEARCH BUTTON
    ===================================================== */

    if (searchButton) {

        searchButton.addEventListener(
            "click",
            performSearch
        );

    }



    /* =====================================================
       SEARCH — ENTER KEY
    ===================================================== */

    if (searchInput) {

        searchInput.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key === "Enter"
                ) {

                    performSearch();

                }

            }
        );

    }



    /* =====================================================
       INITIALIZE CART
    ===================================================== */

    createCartUI();


    updateCartCount();


    renderCart();



    /* =====================================================
       GLOBAL PRODUCT DATA
    ===================================================== */

    window.DreamlyMartProducts = {

        topSelling:
            topSellingProducts,

        newArrivals:
            newArrivalProducts,

        all:
            allProducts

    };


});