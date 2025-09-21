<script setup lang="ts">
// Reset all CSS styles in a Tailwind style
import "@unocss/reset/tailwind.css";
import "./globals.css";


// В Nuxt 3 компоненты автоматически импортируются из папки components
// Здесь будет основная логика приложения
</script>

<template>
  <LayoutReport />
  <LayoutHeader />
  <div class="px-5">
    <GeneralHero />
  </div>
  <div class="mb-[100px] px-5">
    <GeneralFeaturedSection />
  </div>
  <div class="px-5 mb-[100px]">
    <GeneralCalendarGrid />
  </div>
  <LayoutFooter />
</template>
