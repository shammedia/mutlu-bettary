<script setup>
import {computed, ref} from "vue";
import {Link, usePage} from '@inertiajs/vue3'
import { storeToRefs } from 'pinia'
import {useCartStore} from "@/Store/cart.js";
const page = usePage()
const trans = (key) => page.props.translations[key] || key;
const cartStore = useCartStore()
const { count } = storeToRefs(cartStore)

const withLocalePath = (path) => {
    const loc = page.props.locale || ''
    if (!path || typeof path !== 'string') return path
    if (!path.startsWith('/')) return path
    return loc ? `/${loc}${path}` : path
}
const safeRoute = (name, params = {}, fallbackPath = '/') => {
    try {
        if (typeof route !== 'undefined' && route) {
            if (typeof route === 'function' && route().has && route().has(name)) {
                return route(name, params)
            }
            return route(name, params)
        }
    } catch (e) {
        // ignore and fallback
    }
    return withLocalePath(fallbackPath)
}
const cartIndexUrl = computed(() => safeRoute('cart.index', {}, '/cart'))
const carts = ref([]);
carts.value = JSON.parse(localStorage.getItem('carts') || '[]');
const cartCount = carts.value.length;
</script>

<template>

    <Link :href="cartIndexUrl" class="position-relative">
        <span v-if="count" class="position-absolute text-danger top-0 start-0 translate-middle badge rounded-pill bg-white">
            {{ count}}
        </span>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" class="bi bi-cart4" viewBox="0 0 16 16">
            <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l.5 2H5V5zM6 5v2h2V5zm3 0v2h2V5zm3 0v2h1.36l.5-2zm1.11 3H12v2h.61zM11 8H9v2h2zM8 8H6v2h2zM5 8H3.89l.5 2H5zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0"/>
        </svg>
    </Link>
    <Transition name="carts">
        <Link
            v-if="count"
            class="cart-fab"
            :href="cartIndexUrl"
            rel="noopener"
            aria-label="Carts"
            :title="trans('Carts')"
        >
             <span v-if="count" class="position-absolute text-white top-0 start-0 translate-middle badge rounded-pill bg-danger">
            {{ count}}
        </span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" class="bi bi-cart4" viewBox="0 0 16 16">
                <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l.5 2H5V5zM6 5v2h2V5zm3 0v2h2V5zm3 0v2h1.36l.5-2zm1.11 3H12v2h.61zM11 8H9v2h2zM8 8H6v2h2zM5 8H3.89l.5 2H5zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0"/>
            </svg>
        </Link>
    </Transition>
</template>

<style scoped>
/*Carts*/

.cart-fab {
    position: fixed;
    left: 30px;
    bottom: 90px; /* keep above scroll-to-top (bottom:30px) */
    width: 50px;
    height: 50px;
    border-radius: 9999px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #ffffff;
    color: #ff0000;
    box-shadow: 0 14px 30px rgba(0, 0, 0, 0.22);
    z-index: 9999;
    transition: transform 180ms ease, box-shadow 180ms ease, filter 180ms ease;
    -webkit-tap-highlight-color: transparent;
}

.cart-fab i {
    font-size: 26px;
    line-height: 1;
}

.cart-fab:hover {
    transform: translateY(-2px) scale(1.03);
    box-shadow: 0 18px 40px rgba(0, 0, 0, 0.26);
    filter: brightness(1.03);
}

.cart-fab:active {
    transform: translateY(0) scale(0.98);
}

.cart-fab:focus-visible {
    outline: 3px solid rgba(255, 0, 0, 0.35);
    outline-offset: 3px;
}

.cart-fab::before {
    content: "";
    position: absolute;
    inset: -8px;
    border-radius: inherit;
    background: rgba(255, 0, 0, 0.35);
    opacity: 0;
    transform: scale(0.9);
    animation: waPulse 2.4s ease-out infinite;
    pointer-events: none;
}

@keyframes waPulse {
    0% {
        opacity: 0;
        transform: scale(0.9);
    }
    20% {
        opacity: 0.35;
    }
    70% {
        opacity: 0;
        transform: scale(1.25);
    }
    100% {
        opacity: 0;
        transform: scale(1.25);
    }
}

/* Smooth entrance */
.wa-fab-enter-active,
.wa-fab-leave-active,
.cart-fab-enter-active,
.cart-fab-leave-active {
    transition: opacity 220ms ease, transform 220ms ease;
}
.wa-fab-enter-from,
.wa-fab-leave-to,
.cart-fab-enter-from,
.cart-fab-leave-to{
    opacity: 0;
    transform: translateY(12px) scale(0.96);
}

</style>
