<script setup lang="ts">
import {useAuthStore} from '../stores/auth.store';
import { storeToRefs } from 'pinia'
import Login from './Login.vue'
import Logout from './Logout.vue'

const store = useAuthStore()
const { user } = storeToRefs(store)
</script>

<template>
    <template v-if="user !== undefined && user !== null">
        <div>
            <slot />

            <Logout />
        </div>
    </template>

    <template v-else>
        <Login />
    </template>
</template>
