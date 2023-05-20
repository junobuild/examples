<script lang="ts" setup>
import { listDocs } from '@junobuild/core'
import { onMounted, ref } from 'vue'

const items = ref([])

const list = async () => {
  const { items: data } = await listDocs({
    collection: 'notes',
    filter: {}
  })

  items.value = data
}

onMounted(async () => await list())
</script>

<template>
  <div class="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-sm border border-gray-200 mt-8">
    <header class="px-5 py-4 border-b border-gray-100">
      <h2 class="font-semibold text-gray-800">Entries</h2>
    </header>
    <div class="p-3">
      <div class="overflow-x-auto">
        <div class="flex items-center gap-6 px-2.5 py-1.5" v-for="(item, index) in items">
          <span
            class="px-4 py-2 rounded-full text-gray-500 bg-gray-200 font-semibold text-sm flex align-center w-max"
          >
            {{ index + 1 }}
          </span>
          <div class="line-clamp-3 text-left grow">{{ item.data.text }}</div>
          <div v-if="item.data.url !== undefined">
            <a
              aria-label="Open data"
              rel="noopener noreferrer"
              href="{{item.data.url}}"
              target="_blank"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
