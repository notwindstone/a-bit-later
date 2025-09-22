<script setup lang="ts">
import { ref } from 'vue';

// Search query
const query = ref('');

// Chips on the left side (popular filters)
const chips = ref<string[]>([
    'Популярные онгоинги',
    'Исекаи',
]);

// Emit event when user submits / presses enter (optional extension point)
const emit = defineEmits<{ (e: 'search', value: string): void }>();

function submit() {
    emit('search', query.value.trim());
}

function toggleChip(label: string) {
    // Placeholder for future interactivity (selecting a chip could append to query or apply a filter)
    // For now we just append label if not already present
    if (!query.value.toLowerCase().includes(label.toLowerCase())) {
        query.value = query.value ? `${query.value} ${label}` : label;
    }
    submit();
}
</script>

<template>
    <!-- Wrapper WITHOUT fixed width -->
    <div class="w-full inline-flex flex-col gap-3.5">
        <!-- Search bar -->
        <div
            class="w-full h-12 px-3.5 rounded-xl outline outline-1 outline-offset-[-1px] outline-[#d9d9d9]/5 flex items-center gap-2.5 bg-white/0"
        >
            <IconsSearchIcon class="shrink-0 text-white/70" />
            <!-- Thin divider -->
            <span class="w-px h-4 bg-[#c8c7ca]/10" />
            <form
                class="flex-1 flex items-center"
                @submit.prevent="submit"
            >
                <input
                    v-model="query"
                    type="text"
                    placeholder="Поиск..."
                    class="w-full bg-transparent outline-none border-none text-sm font-medium text-[#c8c7ca] placeholder:text-[#c8c7ca]/70 font-['Montserrat']"
                    @keydown.enter.prevent="submit"
                />
            </form>
        </div>

        <!-- Chips + presets row -->
        <div class="w-full flex flex-wrap justify-between items-center gap-3">
            <!-- Left chips -->
            <div class="flex flex-wrap items-center gap-2.5">
                <button
                    v-for="label in chips"
                    :key="label"
                    type="button"
                    class="px-3.5 py-2.5 rounded-[38px] outline outline-1 outline-offset-[-1px] outline-[#c8c7ca]/5 text-xs font-medium font-['Montserrat'] text-[#c8c7ca] hover:bg-[#c8c7ca]/5 transition-colors"
                    @click="toggleChip(label)"
                >
                    {{ label }}
                </button>
            </div>

            <!-- Right side presets button group -->
            <div class="flex items-center gap-2.5">
                <VerticalDivider class="hidden md:block h-[18px] w-px" />
                <button
                    class="px-3.5 py-2.5 bg-[#c8c7ca]/5 hover:bg-[#c8c7ca]/10 rounded-[10px] text-sm font-medium font-['Montserrat'] text-[#c8c7ca] transition-colors"
                >
                    Прессеты
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* You can move these to a central place if reused elsewhere */
input::-webkit-search-cancel-button { display: none; }
</style>