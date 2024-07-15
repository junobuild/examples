import type { UserOption } from '$lib/types/user';
import { writable } from 'svelte/store';

export const userStore = writable<UserOption>(undefined);
