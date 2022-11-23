import { writable } from 'svelte/store';

export const Socket = writable(io());