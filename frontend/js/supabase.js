/* =========================================================
   DREAMLY MART
   SUPABASE CLIENT
   DATABASE CONNECTION
========================================================= */


/* =========================================================
   SUPABASE CONFIGURATION
========================================================= */

const DREAMLY_SUPABASE_URL =
    "https://dwtqsbindgrkqjwbzgvu.supabase.co";


const DREAMLY_SUPABASE_PUBLISHABLE_KEY =
    "sb_publishable_EQF3AZA-w1zHuNpbfvrUyg_Y9I9ZzUY";


/* =========================================================
   CREATE SUPABASE CLIENT
========================================================= */

let dreamlySupabase = null;


if (
    typeof window.supabase !== "undefined" &&
    DREAMLY_SUPABASE_URL &&
    DREAMLY_SUPABASE_PUBLISHABLE_KEY
) {

    dreamlySupabase =
        window.supabase.createClient(
            DREAMLY_SUPABASE_URL,
            DREAMLY_SUPABASE_PUBLISHABLE_KEY
        );

}


/* =========================================================
   CONNECTION STATUS
========================================================= */

window.DreamlySupabase = {

    client:
        dreamlySupabase,

    isConnected:
        dreamlySupabase !== null

};