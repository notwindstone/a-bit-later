<script setup lang="ts">
const rawTitle = "Благоухающий цветок расцветает с достоинством";
const LIMIT = 20;
const title =
  rawTitle.length > LIMIT ? rawTitle.slice(0, LIMIT).trimEnd() + "…" : rawTitle;
</script>

<template>
  <NuxtLink href="/" class="flex flex-col gap-2 group">
    <div class="relative overflow-hidden rounded-[14px]">
      <NuxtImg
        src="https://shikimori.one/uploads/poster/animes/59845/8409d8b6f79e81fb487348065e8b549c.jpeg"
        alt="Изображение"
        class="w-full h-full object-cover object-center transition-transform duration-300 ease-out group-hover:scale-105"
        format="webp"
        quality="70"
        loading="lazy"
      />
    </div>
    <div class="flex flex-col gap-1">
      <p class="text-[14px] font-semibold" :title="rawTitle">
        {{ title }}
      </p>
      <div class="flex gap-2 items-center">
        <p class="text-[12px] opacity/70">2023</p>
        <div class="w-[4px] h-[4px] rounded-full bg-[#C8C7CA]/20"></div>
        <p class="text-[12px] opacity/70">ТВ-Сериал</p>
      </div>
    </div>
  </NuxtLink>
</template>

<style scoped></style>
