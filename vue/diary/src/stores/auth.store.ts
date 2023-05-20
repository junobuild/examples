import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import { authSubscribe, type User } from '@junobuild/core'

export const useAuthStore = defineStore('auth', () => {
  const user: Ref<User | null | undefined> = ref(undefined)

  const unsubscribe = authSubscribe((u) => (user.value = u))

  return { user, unsubscribe }
})
