<script setup>
import Header from '../../components/Header.vue';
import { useStore } from '../store';
import { ref } from 'vue';

const store = useStore();

const removeFromCart = (key) => {
    store.cart.delete(key);
    localStorage.setItem(`cart_${store.user.email}`, JSON.stringify(Object.fromEntries(store.cart)));
};

function Checkout() {
    const proceed = window.confirm("Are you sure you want to proceed to checkout?");
    if (proceed) {
        store.cart.clear();
        localStorage.removeItem(`cart_${store.user.email}`);
        alert("Thanks for shopping at BrokeFlix, you will not be happy with your purchase")
    }
}
</script>

<template>
    <Header />
    <div class="cart">
        <h1>Shopping Cart</h1>
        <div v-for="([key, value]) in store.cart">
            <button class="button checkout-button" @click="Checkout()">Checkout</button>
        </div>
        <div class="item-list">
            <div v-for="([key, value]) in store.cart" :key="key" class="item-card">
                <img :src="`https://image.tmdb.org/t/p/w500${value.url}`" class="item-poster" />
                <h2 class="item-title">{{ value.title }}</h2>
                <button class="button remove-button" @click="removeFromCart(key)">Remove</button>
            </div>
        </div>
    </div>
    <div v-if="!store.cart.size">
        <h2>Your cart is empty. Consider giving us your hard earned money.</h2>
    </div>
</template>

<style scoped>
body {
    font-family: Arial, sans-serif;
    background-color: #121212;
    color: #e0e0e0;
    margin: 0;
    padding: 0;
}

.cart {
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
}

h1 {
    font-size: 24px;
    color: black;
    margin-bottom: 20px;
    text-align: center;
    position: relative;
}

.button.checkout-button {
    position: absolute;
    top: 20px;
    right: 20px;
    cursor: pointer;
}

.item-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 20px;
    width: 100%;
    margin-top: 20px;
}

.item-card {
    background-color: #1f1f1f;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    overflow: hidden;
    cursor: pointer;
    transition: transform 0.3s ease-in-out;
    text-align: center;
    padding: 10px;
}

.item-card:hover {
    transform: scale(1.05);
}

.item-poster {
    width: 100%;
    height: auto;
    border-radius: 5px;
    margin-bottom: 10px;
}

.item-title {
    font-size: 16px;
    color: #e0e0e0;
    margin: 10px 0;
}
</style>