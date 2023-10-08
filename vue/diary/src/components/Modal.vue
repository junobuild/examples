<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useAuthStore } from '@/stores/auth.store'
import { storeToRefs } from 'pinia'
import { setDoc, uploadFile } from '@junobuild/core'
import { nanoid } from 'nanoid'
import type { Note } from '@/types/note'

const showModal = ref(false)
const inputText = ref('')
const progress = ref(false)
const file = ref<File | undefined>(undefined)

const store = useAuthStore()
const { user } = storeToRefs(store)

const valid = computed(() => inputText.value !== '' && user !== undefined && user !== null)

const setShowModal = (value: boolean) => (showModal.value = value)
const setFile = (f: File | undefined) => (file.value = f)

const reload = () => {
  let event = new Event('reload')
  window.dispatchEvent(event)
}

const add = async () => {
  // Demo purpose therefore edge case not properly handled
  if (user.value === null || user.value === undefined) {
    return
  }

  progress.value = true

  try {
    let url

    if (file.value !== undefined) {
      const filename = `${user.value.key}-${file.value.name}`

      const { downloadUrl } = await uploadFile({
        collection: 'images',
        data: file.value,
        filename
      })

      url = downloadUrl
    }

    const key = nanoid()

    await setDoc<Note>({
      collection: 'notes',
      doc: {
        key,
        data: {
          text: inputText.value,
          ...(url !== undefined && { url })
        }
      }
    })

    setShowModal(false)

    reload()
  } catch (err) {
    console.error(err)
  }

  progress.value = false
}

const onChangeFile = ($event: Event) =>
  setFile(($event as unknown as { target: EventTarget & HTMLInputElement }).target?.files?.[0])
</script>

<template>
  <div class="mt-10 flex items-center justify-center gap-x-6">
    <button
      type="button"
      @click="() => setShowModal(true)"
      class="rounded-md bg-indigo-600 px-3.5 py-1.5 text-base font-semibold leading-7 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    >
      Add an entry
    </button>
  </div>

  <div
    v-if="showModal"
    class="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
  >
    <div class="relative w-auto my-6 mx-auto max-w-3xl">
      <div
        class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none"
      >
        <div class="relative p-6 flex-auto">
          <textarea
            class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-indigo-600 focus:outline-none resize-none"
            rows="5"
            placeholder="Your diary entry"
            v-model="inputText"
            :disabled="progress"
          ></textarea>
          <input
            type="file"
            class="my-4 text-slate-500 text-lg leading-relaxed"
            @change="onChangeFile"
            :disabled="progress"
          />
        </div>

        <div
          class="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b"
        >
          <div
            v-if="progress"
            class="animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent text-indigo-600 rounded-full"
            role="status"
            aria-label="loading"
          >
            <span class="sr-only">Loading...</span>
          </div>

          <div v-else>
            <button
              class="background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none ease-linear transition-all duration-150"
              type="button"
              @click="() => setShowModal(false)"
            >
              Close
            </button>

            <button
              class="rounded-md bg-indigo-600 px-3.5 py-1.5 text-base font-semibold leading-7 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-25"
              type="button"
              @click="add"
              :disabled="!valid"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-if="showModal" class="opacity-25 fixed inset-0 z-40 bg-black"></div>
</template>
