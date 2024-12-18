import { ref } from "vue";
import { defineStore } from "pinia";

export const useStore = defineStore('store', () => {
    const firstName = ref(null);
    const lastName = ref(null);
    const email = ref(null);
    const password = ref("");
    const cart = ref(new Map());

    return { firstName, lastName, email, password, cart };
});