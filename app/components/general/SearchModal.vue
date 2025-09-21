<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch, nextTick } from 'vue'
import Search from '~/components/icons/Search.vue'
import ShortDivider from '~/components/icons/ShortDivider.vue'
import CloseReport from '~/components/icons/CloseReport.vue'

const emit = defineEmits<{ (e: 'close'): void }>()

const query = ref('')
const recent = ref<string[]>(['Магическая битва', 'Гатиакута'])
// Mock results
interface ResultItem {
  id: number
  title: string
  score: string
  type: string
  genres: string[]
  img: string
}
const results = ref<ResultItem[]>([
  { id: 1, title: 'Магическая битва', score: '9.2', type: 'ТВ-Сериал', genres: ['Сёнен','Экшен','Фэнтези'], img: 'https://placehold.co/53x70' },
  { id: 2, title: 'Необъятный океан 2', score: '9.2', type: 'ТВ-Сериал', genres: ['Сёнен','Экшен','Фэнтези'], img: 'https://placehold.co/53x70' },
  { id: 3, title: 'Благоухающий цветок расцветает с достоинством', score: '9.2', type: 'ТВ-Сериал', genres: ['Сёнен','Экшен','Фэнтези'], img: 'https://placehold.co/53x70' },
  { id: 4, title: 'Молчаливая ведьма: Тайна молчаливой колдуньи', score: '9.2', type: 'ТВ-Сериал', genres: ['Сёнен','Экшен','Фэнтези'], img: 'https://placehold.co/53x70' },
])

const root = ref<HTMLElement | null>(null)
const inputEl = ref<HTMLInputElement | null>(null)

function close() { emit('close') }

function onKey(e: KeyboardEvent) {
  if (e.key === 'Escape') {
    e.preventDefault()
    close()
  }
  if (e.key === 'Enter' && query.value.trim()) {
    // Add to recent if not exists
    if (!recent.value.includes(query.value.trim())) {
      recent.value.unshift(query.value.trim())
      if (recent.value.length > 6) recent.value.pop()
    }
    // For now just close
    close()
  }
  if (e.key === 'Tab') {
    // Basic focus trap
    const dialog = root.value
    if (!dialog) return
    const focusables = Array.from(dialog.querySelectorAll<HTMLElement>("button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])"))
      .filter(el => !el.hasAttribute('disabled') && !el.getAttribute('aria-hidden'))
    if (focusables.length === 0) return
  const first = focusables[0]
  const last = focusables[focusables.length - 1]
    const active = document.activeElement as HTMLElement
    if (!e.shiftKey && active === last && first) {
      e.preventDefault(); first.focus()
    } else if (e.shiftKey && active === first && last) {
      e.preventDefault(); last.focus()
    }
  }
}

onMounted(() => {
  document.addEventListener('keydown', onKey)
  nextTick(() => inputEl.value?.focus())
})
onBeforeUnmount(() => {
  document.removeEventListener('keydown', onKey)
})

function backdropClick(e: MouseEvent) {
  if (e.target === root.value) close()
}
</script>

<template>
  <teleport to="body">
    <transition name="overlay-fade">
      <div ref="root" @click="backdropClick" v-show="true" class="fixed inset-0 z-50 flex flex-col items-center overflow-y-auto px-4 py-24 md:py-32 bg-black/60 backdrop-blur-sm">
        <!-- Focus guard start -->
        <span tabindex="0" @focus="() => inputEl?.focus()" />
        <!-- Container with fluid width -->
        <transition name="panel">
          <div role="dialog" aria-modal="true" aria-label="Поиск" class="w-full max-w-[1100px] flex flex-col gap-5">
        <!-- Search input block -->
        <div class="w-full px-[18px] py-6 bg-[#c8c7ca] rounded-xl outline outline-1 outline-offset-[-1px] outline-[#c8c7ca]/5 backdrop-blur-[15px] flex flex-col justify-center gap-2.5">
          <div class="flex items-center gap-[12.55px]">
            <Search class="h-[19px] w-[19px] text-[#0c0c0c]" />
            <div class="w-px h-[19px] bg-[#0c0c0c]/10" />
            <input ref="inputEl" v-model="query" placeholder="Поиск..." class="flex-1 bg-transparent outline-none text-[#0c0c0c] text-sm font-medium font-['Montserrat'] placeholder:text-[#0c0c0c]/70" />
            <button @click="close" aria-label="Закрыть" class="p-1 rounded hover:bg-black/10 transition-colors">
              <CloseReport class="w-4 h-4 text-[#0c0c0c]" />
            </button>
          </div>
        </div>

        <!-- Results -->
            <div class="w-full p-5 bg-[#151515] rounded-xl backdrop-blur-[15px] flex flex-col gap-5 shadow-lg outline outline-1 outline-[#c8c7ca]/5">
          <div class="flex flex-col gap-2.5">
            <transition-group name="list" tag="div" class="flex flex-col gap-2.5">
              <div v-for="item in results" :key="item.id" class="group w-full p-3 bg-[#c8c7ca]/5 rounded-xl flex gap-[15px] hover:bg-[#c8c7ca]/10 transition-colors cursor-pointer">
                <img :src="item.img" class="w-[53px] h-[70px] object-cover rounded-[10px]" :alt="item.title" />
                <div class="flex-1 flex flex-col gap-[15px]">
                  <div class="flex items-center gap-3">
                    <div class="text-[#c8c7ca] text-sm font-semibold font-['Montserrat'] line-clamp-1">{{ item.title }}</div>
                    <div class="w-px h-[11px] bg-[#d9d9d9]/10" />
                    <div class="text-[#fde5b9] text-sm font-semibold font-['Montserrat']">{{ item.score }}</div>
                  </div>
                  <div class="flex items-center gap-2.5 flex-wrap">
                    <div class="h-[30px] px-2.5 py-[5px] bg-[#c8c7ca] rounded-[7px] flex items-center">
                      <div class="text-[#0c0c0c] text-xs font-semibold font-['Montserrat']">{{ item.type }}</div>
                    </div>
                    <div class="w-px h-2 bg-[#d9d9d9]/10" />
                    <div class="flex items-center gap-[5px] flex-wrap">
                      <div v-for="g in item.genres" :key="g" class="p-[5px] bg-[#c8c7ca]/5 rounded-[7px]">
                        <div class="text-[#c8c7ca] text-xs font-medium font-['Montserrat'] leading-tight">{{ g }}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </transition-group>
          </div>

          <!-- Recent queries -->
          <div class="flex flex-col gap-5 w-full">
            <div class="h-px bg-[#d9d9d9]/5" />
            <div class="flex flex-col gap-2.5">
              <div class="text-[#c8c7ca]/70 text-xs font-medium font-['Montserrat']">Последние запросы</div>
              <div class="flex flex-wrap gap-[5px]">
                <button v-for="r in recent" :key="r" @click="query = r" class="h-[30px] px-2.5 py-[5px] rounded-[7px] outline outline-1 outline-offset-[-1px] outline-[#c8c7ca]/10 flex items-center gap-2.5 hover:bg-[#c8c7ca]/5 transition-colors">
                  <span class="text-[#c8c7ca] text-xs font-medium font-['Montserrat']">{{ r }}</span>
                </button>
              </div>
            </div>
          </div>
            </div>
          </div>
        </transition>
        <!-- Focus guard end -->
        <span tabindex="0" @focus="() => inputEl?.focus()" />
      </div>
    </transition>
  </teleport>
</template>

<style scoped>
/* Simple transition for list items */
.list-enter-active, .list-leave-active { transition: all .25s ease; }
.list-enter-from { opacity: 0; transform: translateY(4px); }
.list-leave-to { opacity: 0; transform: translateY(-4px); }

/* Overlay fade */
.overlay-fade-enter-active, .overlay-fade-leave-active { transition: opacity .2s ease; }
.overlay-fade-enter-from, .overlay-fade-leave-to { opacity: 0; }

/* Panel animation */
.panel-enter-active, .panel-leave-active { transition: all .25s cubic-bezier(.4,0,.2,1); }
.panel-enter-from, .panel-leave-to { opacity: 0; transform: translateY(12px) scale(.98); }
</style>
