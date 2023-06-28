<script setup lang="ts">
import Auth from './components/Auth.vue'
import Background from './components/Background.vue'
import Table from '@/components/Table.vue'
import { onMounted } from 'vue'
import { initJuno } from '@junobuild/core'
import Modal from '@/components/Modal.vue'

onMounted(
  async () =>
    await initJuno({
      satelliteId: 'f62k6-laaaa-aaaal-acq7q-cai'
    })
)
</script>

<template>
  <div class="isolate bg-white">
    <main>
      <div class="relative px-6 lg:px-8">
        <div class="mx-auto max-w-2xl pt-16">
          <div class="text-center">
            <h1 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Sample Juno App
            </h1>
            <p class="mt-6 text-lg leading-8 text-gray-600">
              A sample app build with Vue, Tailwind and
              <a
                href="https://juno.build"
                rel="noopener noreferrer"
                target="_blank"
                class="underline"
              >
                Juno
              </a>
              .
            </p>

            <Auth>
              <Table />

              <Modal />
            </Auth>

            <Background />
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
