<script setup lang="ts"></script>

<template>
  <div class="container">
    <div class="flex flex-col mb-[50px]">
      <h1 class="text-[40px] font-bold">Cписок аниме</h1>
      <p class="opacity-70 text-[14px]">
        Полный каталог доступных аниме. Используйте фильтры и поиск, чтобы найти
        то, что интересно.
      </p>
    </div>
    <div class="flex justify-between gap-[40px]">
        <div class="w-full flex flex-col gap-[30px]"> 
            <GeneralAnimeListAnimeSearch />
            <div class="grid  gap-2 lg:gap-[20px] grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4  xl:grid-cols-6">
                <GeneralAnimeListAnimeCard />
                <GeneralAnimeListAnimeCard />
                <GeneralAnimeListAnimeCard />
                <GeneralAnimeListAnimeCard />
                <GeneralAnimeListAnimeCard />
                <GeneralAnimeListAnimeCard />
                <GeneralAnimeListAnimeCard />
                <GeneralAnimeListAnimeCard />
                <GeneralAnimeListAnimeCard />
                <GeneralAnimeListAnimeCard />
                <GeneralAnimeListAnimeCard />
                <GeneralAnimeListAnimeCard />
                <GeneralAnimeListAnimeCard />
                <GeneralAnimeListAnimeCard />
                <GeneralAnimeListAnimeCard />
                <GeneralAnimeListAnimeCard />
                <GeneralAnimeListAnimeCard />
                <GeneralAnimeListAnimeCard />
            </div>
        </div>
        <div>
            <div class="bg-white/[0.02] min-w-[300px]">
                <p>test</p>
            </div>
        </div>
    </div>
  </div>
</template>
