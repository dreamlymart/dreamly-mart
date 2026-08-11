/* =========================================================
   DREAMLY MART
   CATEGORY VIEW ALL
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const viewAllButton =
        document.getElementById("viewAllCategories");

    const allCategories =
        document.getElementById("allCategories");

    const closeButton =
        document.getElementById("closeCategories");


    /* ==========================
       VIEW ALL
    ========================== */

    if (viewAllButton && allCategories) {

        viewAllButton.addEventListener("click", function () {

            allCategories.classList.add("show");

            allCategories.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    }


    /* ==========================
       CLOSE ALL CATEGORIES
    ========================== */

    if (closeButton && allCategories) {

        closeButton.addEventListener("click", function () {

            allCategories.classList.remove("show");

            document.getElementById("categories")
                .scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

        });

    }

});