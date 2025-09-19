<script setup lang="ts">
import { useQuery } from "@tanstack/vue-query";
// Reset all CSS styles in a Tailwind style
import "@unocss/reset/tailwind.css";
import "./globals.css";

const { data, isPending } = useQuery({
  "queryKey": ["temporary"],
  "queryFn" : async (): Promise<Blob> => {
    const response = await fetch("https://new.freesmlauncher.org/metadata/epl_metadata.json");

    return response.json();
  },
});
</script>

<template>
  <div class="bg-black text-white">
    <div v-if="isPending">
      Loading some data...
    </div>
    <div v-else-if="data" class="whitespace-pre">
      {{ JSON.stringify(data, null, 2) }}
    </div>
  </div>
</template>
