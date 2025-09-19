// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  "compatibilityDate": "2025-07-15",
  "devtools"         : { "enabled": true },

  "modules": [
    "@nuxt/eslint",
    "@nuxt/image",
    "@nuxt/test-utils",
    "@nuxt/icon",
    "@nuxt/fonts",
    "@unocss/nuxt",
    "@pinia/nuxt",
    "@hebilicious/vue-query-nuxt",
  ],
  "fonts": {
    // What font weights, styles and subsets to load for each font
    "defaults": {
      "weights": [400],
      "styles" : ["normal", "italic"],
      "subsets": [
        "cyrillic-ext",
        "cyrillic",
        "greek-ext",
        "greek",
        "vietnamese",
        "latin-ext",
        "latin",
      ],
    },

    /*
     * Load Geist font
     * https://vercel.com/font
     */
    "families": [
      {
        "name"    : "Geist",
        "provider": "google",
      },
    ],
  },
});