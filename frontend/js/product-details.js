/* =========================================================
   DREAMLY MART
   PRODUCT DETAILS
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const container =
        document.getElementById("productDetails");


    if (!container) {
        return;
    }


    /* ==========================
       GET PRODUCT ID
    ========================== */

    const urlParams =
        new URLSearchParams(window.location.search);

    const productId =
        urlParams.get("id");


    /* ==========================
       FIND PRODUCT
    ========================== */

    const product =
        products.find(function (item) {

            return item.id === productId;

        });


    /* ==========================
       PRODUCT NOT FOUND
    ========================== */

    if (!product) {

        container.innerHTML = `
            <div style="
                grid-column: 1 / -1;
                text-align: center;
                padding: 60px 20px;
            ">

                <h2>Product Not Found</h2>

                <p>
                    Sorry, this product is not available.
                </p>

                <br>

                <a href="index.html">
                    ← Back to Shopping
                </a>

            </div>
        `;

        return;
    }


    /* ==========================
       PRICE
    ========================== */

    const price =
        ৳${product.price.toLocaleString("en-BD")};


    const oldPrice =
        product.oldPrice
            ? ৳${product.oldPrice.toLocaleString("en-BD")}
            : "";


    const discount =
        product.discount > 0
            ? `<span class="discount-text">
                 -${product.discount}%
               </span>`
            : "";


    /* ==========================
       RATING
    ========================== */

    const stars =
        "⭐".repeat(product.rating);


    /* ==========================
       IMAGE
    ========================== */

    const imageHTML = `

        <div class="product-detail-image">

            <img
                src="${product.image}"
                alt="${product.name}"
                onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
            >

            <div
                class="product-image-placeholder"
                style="display:none;"
            >

                <span>🛍️</span>

                <strong>
                    Product Image
                </strong>

                <small>
                    Image will be added later
                </small>

            </div>

        </div>

    `;


    /* ==========================
       PRODUCT HTML
    ========================== */

    container.innerHTML = `

        ${imageHTML}


        <div class="product-detail-info">


            <span class="product-category">

                ${product.category}

            </span>


            <h1>

                ${product.name}

            </h1>


            <div class="product-rating">

                <span class="stars">

                    ${stars}

                </span>

                <span class="review-count">

                    (${product.reviews} Reviews)

                </span>

            </div>


            <div class="product-detail-price">

                <span class="current-price">

                    ${price}

                </span>


                ${
                    product.oldPrice
                        ? `
                            <span class="old-price">
                                ${oldPrice}
                            </span>
                          `
                        : ""
                }


                ${discount}

            </div>


            <p class="product-description">

                ${product.description}

            </p>


            <div class="quantity-wrapper">

                <label>
                    Quantity:
                </label>


                <div class="quantity-control">

                    <button
                        type="button"
                        id="minusQuantity"
                    >
                        −
                    </button>


                    <span id="quantity">
                        1
                    </span>


                    <button
                        type="button"
                        id="plusQuantity"
                    >
                        +
                    </button>

                </div>

            </div>


            <div class="product-actions">

                <button
                    type="button"
                    class="add-cart-detail"
                    id="addToCart"
                >
                    🛒 Add to Cart
                </button>


                <button
                    type="button"
                    class="buy-now-detail"
                    id="buyNow"
                >
                    Buy Now
                </button>

            </div>


        </div>

    `;


    /* ==========================
       QUANTITY
    ========================== */

    let quantity = 1;


    const quantityDisplay =
        document.getElementById("quantity");


    document
        .getElementById("minusQuantity")
        .addEventListener("click", function () {

            if (quantity > 1) {

                quantity--;

                quantityDisplay.textContent =
                    quantity;

            }

        });


    document
        .getElementById("plusQuantity")
        .addEventListener("click", function () {

            quantity++;

            quantityDisplay.textContent =
                quantity;

        });


    /* ==========================
       ADD TO CART
    ========================== */

    document
        .getElementById("addToCart")
        .addEventListener("click", function () {

            alert(
                ${product.name} added to cart! Quantity: ${quantity}
            );

        });


    /* ==========================
       BUY NOW
    ========================== */

    document
        .getElementById("buyNow")
        .addEventListener("click", function () {

            alert(
                Buy Now: ${product.name} — Quantity: ${quantity}
            );

        });

});