/* =========================================================
   DREAMLY MART
   APP.JS — CATEGORY + PRODUCT DATA SYSTEM
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
       DREAMLY MART — PRODUCT DATA
    ===================================================== */

    const topSellingProducts = [

        {
            name: "Casio Illuminator Premium Watch",
            price: 1590,
            oldPrice: 1990,
            discount: "-20%",
            rating: 5,
            reviews: 0,
            category: "Fashion & Style",
            image: "images/casio-watch.jpg"
        },

        {
            name: "Maximum MB3031 Antenna Phone",
            price: 2290,
            oldPrice: 2690,
            discount: "-15%",
            rating: 5,
            reviews: 0,
            category: "Electronics & Gadgets",
            image: "images/maximum-phone.jpg"
        },

        {
            name: "Smart Gadget Premium Collection",
            price: 990,
            oldPrice: 1320,
            discount: "-25%",
            rating: 5,
            reviews: 0,
            category: "Electronics & Gadgets",
            image: "images/smart-gadget.jpg"
        },

        {
            name: "Premium Gift and Combo Pack",
            price: 1290,
            oldPrice: 1440,
            discount: "-10%",
            rating: 5,
            reviews: 0,
            category: "Gifts & Combos",
            image: "images/gift-combo.jpg"
        }

    ];



    /* =====================================================
       NEW ARRIVALS
    ===================================================== */

    const newArrivalProducts = [

        {
            name: "New Arrival Premium Product",
            price: 1490,
            oldPrice: null,
            discount: "NEW",
            rating: 5,
            reviews: 0,
            category: "Others",
            image: "images/new-arrival.jpg"
        },

        {
            name: "Smart Lifestyle Product",
            price: 890,
            oldPrice: null,
            discount: "NEW",
            rating: 5,
            reviews: 0,
            category: "Home & Kitchen",
            image: "images/smart-lifestyle.jpg"
        }

    ];



    /* =====================================================
       PRODUCT CARD
    ===================================================== */

    function createProductCard(product) {

        const card =
            document.createElement("div");

        card.className = "product-card";


        /* IMAGE */

        const imageBox =
            document.createElement("div");

        imageBox.className = "product-image";


        const image =
            document.createElement("img");

        image.src = product.image;

        image.alt = product.name;

        image.loading = "lazy";


        /*
         * Product image এখনো upload করা হয়নি।
         * তাই image না পাওয়া গেলে সুন্দর fallback দেখাবে।
         */

        image.onerror = function () {

            image.style.display = "none";

            imageBox.innerHTML = `
                <div style="
                    width:100%;
                    height:100%;
                    display:flex;
                    align-items:center;
                    justify-content:center;
                    flex-direction:column;
                    gap:10px;
                    background:#f8f7ff;
                    color:#7c3aed;
                    font-size:48px;
                ">
                    🛍️
                    <span style="
                        font-size:13px;
                        color:#777;
                    ">
                        Product Image
                    </span>
                </div>
            `;

        };


        imageBox.appendChild(image);



        /* BADGE */

        if (product.discount) {

            const badge =
                document.createElement("span");

            badge.className =
                product.discount === "NEW"
                    ? "new-badge"
                    : "discount-badge";

            badge.textContent =
                product.discount;

            imageBox.appendChild(badge);

        }


        card.appendChild(imageBox);



        /* PRODUCT INFO */

        const info =
            document.createElement("div");

        info.className = "product-info";


        /* NAME */

        const title =
            document.createElement("h3");

        title.textContent =
            product.name;

        info.appendChild(title);



        /* RATING */

        const rating =
            document.createElement("div");

        rating.className =
            "product-rating";

        rating.innerHTML =
            "★★★★★ " +
            <span>(${product.reviews})</span>;

        info.appendChild(rating);



        /* PRICE */

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

        priceBox.appendChild(currentPrice);


        if (product.oldPrice) {

            const oldPrice =
                document.createElement("span");

            oldPrice.className =
                "old-price";

            oldPrice.textContent =
                "৳" +
                product.oldPrice.toLocaleString("en-BD");

            priceBox.appendChild(oldPrice);

        }


        info.appendChild(priceBox);



        /* ACTION BUTTONS */

        const actions =
            document.createElement("div");

        actions.className =
            "product-actions";


        const cartButton =
            document.createElement("button");

        cartButton.className =
            "add-cart-btn";

        cartButton.type =
            "button";

        cartButton.textContent =
            "🛒 Add to Cart";


        const buyButton =
            document.createElement("button");

        buyButton.className =
            "buy-now-btn";

        buyButton.type =
            "button";

        buyButton.textContent =
            "Buy Now";


        actions.appendChild(cartButton);

        actions.appendChild(buyButton);

        info.appendChild(actions);


        card.appendChild(info);


        return card;

    }



    /* =====================================================
       DISPLAY PRODUCTS
    ===================================================== */

    function displayProducts(products, grids) {

        grids.forEach(function (grid) {

            if (!grid) return;

            grid.innerHTML = "";

            products.forEach(function (product) {

                const card =
                    createProductCard(product);

                grid.appendChild(card);

            });

        });

    }



    /* =====================================================
       TOP SELLING PRODUCT GRID
    ===================================================== */

    const productGrids =
        document.querySelectorAll(
            "#products .product-grid"
        );


    if (productGrids.length > 0) {

        displayProducts(
            topSellingProducts,
            [productGrids[0]]
        );

    }



    /* =====================================================
       NEW ARRIVAL PRODUCT GRID
    ===================================================== */

    const allProductSections =
        document.querySelectorAll(
            ".products .product-grid"
        );


    if (allProductSections.length > 1) {

        displayProducts(
            newArrivalProducts,
            [allProductSections[1]]
        );

    }



    /* =====================================================
       PRODUCT BUTTON — TEMPORARY
    ===================================================== */

    document.addEventListener(
        "click",
        function (event) {

            if (
                event.target.classList.contains(
                    "add-cart-btn"
                )
            ) {

                alert(
                    "Product added to cart!"
                );

            }


            if (
                event.target.classList.contains(
                    "buy-now-btn"
                )
            ) {

                alert(
                    "Buy Now system will be connected in the next step."
                );

            }

        }
    );

});