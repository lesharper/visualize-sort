import { writable } from 'svelte/store';

export const method = writable('bubble');
export const size = writable(20);
export const speed = writable(500);
