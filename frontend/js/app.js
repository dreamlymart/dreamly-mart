/* =========================================================
   DREAMLY MART
   APP.JS
   CATEGORY + PRODUCT DATA + PRODUCT DETAILS SYSTEM
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

        viewAllButton.addEventListener("click", function () {

            allCategories.classList.add("show");

            allCategories.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    }


    /* =====================================================
       CATEGORY — CLOSE
    ===================================================== */

    if (closeButton && allCategories) {

        closeButton.addEventListener("click", function () {

            allCategories.classList.remove("show");

            const categories =
                document.getElementById("categories");

            if (categories) {

                categories.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    }



    /* =====================================================
       DREAMLY MART — TOP SELLING PRODUCTS
    ===================================================== */

    const topSellingProducts = [

        {
            id: "casio-illuminator-watch",

            name: "Casio Illuminator Premium Watch",

            price: 1590,

            oldPrice: 1990,

            discount: "-20%",

            rating: 5,

            reviews: 0,

            category: "Fashion & Style",

            image: "images/casio-watch.jpg",

            description:
                "Premium Casio Illuminator watch with a stylish design, perfect for everyday use and special occasions."
        },


        {
            id: "maximum-mb3031-phone",

            name: "Maximum MB3031 Antenna Phone",

            price: 2290,

            oldPrice: 2690,

            discount: "-15%",

            rating: 5,

            reviews: 0,

            category: "Electronics & Gadgets",

            image: "images/maximum-phone.jpg",

            description:
                "Maximum MB3031 Antenna Phone featuring dual antenna support, powerful battery and practical everyday features."
        },


        {
            id: "smart-gadget-premium",

            name: "Smart Gadget Premium Collection",

            price: 990,

            oldPrice: 1320,

            discount: "-25%",

            rating: 5,

            reviews: 0,

            category: "Electronics & Gadgets",

            image: "images/smart-gadget.jpg",

            description:
                "A premium smart gadget collection designed to make everyday life easier and smarter."
        },


        {
            id: "premium-gift-combo",

            name: "Premium Gift and Combo Pack",

            price: 1290,

            oldPrice: 1440,

            discount: "-10%",

            rating: 5,

            reviews: 0,

            category: "Gifts & Combos",

            image: "images/gift-combo.jpg",

            description:
                "A beautiful premium gift and combo pack, perfect for birthdays, celebrations and special moments."
        }

    ];



    /* =====================================================
       NEW ARRIVALS
    ===================================================== */

    const newArrivalProducts = [

        {
            id: "new-arrival-premium",

            name: "New Arrival Premium Product",

            price: 1490,

            oldPrice: null,

            discount: "NEW",

            rating: 5,

            reviews: 0,

            category: "Others",

            image: "images/new-arrival.jpg",

            description:
                "A newly arrived premium product selected for Dreamly Mart customers."
        },


        {
            id: "smart-lifestyle-product",

            name: "Smart Lifestyle Product",

            price: 890,

            oldPrice: null,

            discount: "NEW",

            rating: 5,

            reviews: 0,

            category: "Home & Kitchen",

            image: "images/smart-lifestyle.jpg",

            description:
                "A smart lifestyle product designed to add convenience and comfort to everyday living."
        }

    ];



    /* =====================================================
       COMBINE ALL PRODUCTS
    ===================================================== */

    const allProducts = [

        ...topSellingProducts,

        ...newArrivalProducts

    ];



    /* =====================================================
       SAVE PRODUCT FOR DETAILS PAGE
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
           IMAGE BOX
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


        /* IMAGE FALLBACK */

        image.onerror = function () {

            image.style.display =
                "none";


            imageBox.classList.add(
                "image-placeholder"
            );


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


        /* OLD PRICE */

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



        /* ADD TO CART */

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



        /* BUY NOW */

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


        grid.innerHTML = "";


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
       TOP SELLING PRODUCTS
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
       NEW ARRIVALS
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
       ADD TO CART — TEMPORARY
    ===================================================== */

    function addToCart(product) {

        let cart =
            JSON.parse(
                localStorage.getItem(
                    "dreamlyCart"
                )
            ) || [];


        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });


        localStorage.setItem(
            "dreamlyCart",
            JSON.stringify(cart)
        );


        alert(
            `"${product.name}" added to cart!`
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


                    /*
                     * Category filtering system
                     * পরবর্তী ধাপে connect করা হবে।
                     */

                    console.log(
                        "Selected Category:",
                        category
                    );

                }
            );

        }
    );



    /* =====================================================
       SEARCH — BASIC PREPARATION
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
                            .includes(searchText)
                        ||
                        product.category
                            .toLowerCase()
                            .includes(searchText)
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



    if (searchButton) {

        searchButton.addEventListener(
            "click",
            performSearch
        );

    }


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
       PRODUCT DATA AVAILABLE FOR OTHER JS FILES
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