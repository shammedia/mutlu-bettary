<template>
    <Head>
        <title>{{ trans("Our Products") }} | Mutlu</title>
    </Head>
    <app-layout>
        <main class="py-5 px-3 max-w-5xl mx-auto overflow-hidden">
            <!-- Hero Section -->
            <section class="mb-4 text-center">
                <h2 class="display-6 fw-bold text-on-surface mb-1">سلة المقتنيات</h2>
                <p class="text-on-surface-variant-80 small">يتوفر شحن حتى باب المنزل.</p>
            </section>
            <div class="row g-4">
                <!-- Product List Area -->
                <div class="col-12 col-lg-8 d-flex flex-column gap-3">
                    <!-- Product Card 1 -->
                    <div class="bg-surface-container-lowest rounded-2xl p-3 p-sm-4 product-card-grid shadow-sm"
                         v-for="cart in carts">
                        <div class="product-image-wrap rounded-3 overflow-hidden flex-shrink-0">
                            <img alt="بطارية" class="w-100 h-100 object-fit-cover" :src="cart.primary_slide"/>
                        </div>
                        <div class="d-flex flex-column justify-content-between min-w-0">
                            <div>
                                <div class="d-flex justify-content-between align-items-start gap-2">
                                    <h3 class="fs-6 fs-sm-5 fw-bold text-on-surface lh-sm text-truncate">بطارية 35Ah B20
                                        (NS40)</h3>
                                    <button @click="removeFromCart(cart)" class="btn p-0 text-primary-60 flex-shrink-0">
                                        <span class="material-symbols-outlined fs-20">delete</span>
                                    </button>
                                </div>
                                <div class="fs-11 small text-on-surface-variant-80 mt-1">
                                    <p class="mb-1">
                                        {{ trans('Capacity (Ah)') }}{{ formatCapacityLabel(cart.capacity) }}</p>
                                    <p class="mb-0">{{ trans('Voltage (V)') }} {{ cart.voltage }}</p>
                                </div>
                            </div>
                            <div class="d-flex justify-content-between align-items-center mt-3">
                                <div class="d-flex align-items-center bg-surface-container rounded-3 p-1">
                                    <button @click="decreaseQty(cart)"
                                            class="btn p-0 qty-btn d-flex align-items-center justify-content-center text-primary-custom active-scale-sm">
                                        <span class="material-symbols-outlined fs-18">remove</span>
                                    </button>
                                    <span class="px-2 px-sm-4 fw-bold small fs-sm-6">{{ cart.quantity }}</span>
                                    <button @click="addToCart(cart)"
                                            class="btn p-0 qty-btn d-flex align-items-center justify-content-center text-primary-custom active-scale-sm">
                                        <span class="material-symbols-outlined fs-18">add</span>
                                    </button>
                                </div>
                                <span class="h5 mb-0 fw-bolder text-on-surface">{{ cart.price }} $</span>
                            </div>
                        </div>
                    </div>


                    <!-- Shipping Method & Location Action -->
                    <div class="bg-surface-container-high rounded-2xl p-4 p-sm-5 d-flex flex-column gap-4">
                        <div>
                            <h4 class="fw-bold h5 mb-4 d-flex align-items-center gap-2">
                                <span class="material-symbols-outlined text-primary-custom">local_shipping</span>
                                طريقة الشحن
                            </h4>
                            <div class="d-flex flex-column gap-3">
                                <label
                                    class="d-flex align-items-center gap-3 p-4 bg-surface-container-lowest rounded-3 border border-transparent hover-border-outline-30 transition-all"
                                    for="home-delivery">
                                    <input checked="" id="home-delivery" name="shipping-method" value="home"
                                           type="radio" v-model="createOrder.deliveryType"/>
                                    <div class="flex-grow-1 d-flex justify-content-between align-items-center">
                                        <div class="d-flex align-items-center gap-2">
                                            <span
                                                class="material-symbols-outlined text-on-surface-variant fs-20">home</span>
                                            <span class="fw-bold small">شحن للمنزل</span>
                                        </div>

                                    </div>
                                </label>
                                <label
                                    class="d-flex align-items-center gap-3 p-4 bg-surface-container-lowest rounded-3 border border-transparent hover-border-outline-30 transition-all"
                                    for="pickup-center">
                                    <input id="pickup-center" name="shipping-method" value="office" type="radio"
                                           v-model="createOrder.deliveryType"/>
                                    <div class="flex-grow-1 d-flex justify-content-between align-items-center">
                                        <div class="d-flex align-items-center gap-2">
                                            <span
                                                class="material-symbols-outlined text-on-surface-variant fs-20">store</span>
                                            <span class="fw-bold small">مركز الاستلام</span>
                                        </div>
                                    </div>
                                </label>
                            </div>
                        </div>
                        <div class="line-outline-30"></div>
                        <div class="d-flex flex-column gap-3">
                            <div class="d-flex align-items-start gap-3">
                                <div
                                    class="rounded-circle bg-primary-10 d-flex align-items-center justify-content-center text-primary-custom flex-shrink-0 mt-1"
                                    style="width: 2.5rem; height: 2.5rem;">
                                    <span class="material-symbols-outlined fs-20"
                                          style="font-variation-settings: 'FILL' 1;">location_on</span>
                                </div>
                                <div class="min-w-0">
                                    <h4 class="fw-bold fs-6">عنوان التوصيل</h4>
                                    <p class="text-on-surface-variant small text-truncate mb-0">لم يتم تحديد موقع
                                        التوصيل بعد</p>
                                </div>
                            </div>
                            <button
                                class="btn w-100 btn-map px-4 py-3 rounded-3 fw-bold small transition-opacity active-scale d-flex align-items-center justify-content-center gap-2">
                                <span class="material-symbols-outlined fs-18">map</span>
                                تحديد موقعي
                            </button>
                        </div>
                    </div>
                </div>
                <!-- Price Breakdown Area -->
                <div class="col-12 col-lg-4 mb-4">
                    <div
                        class="bg-surface-container-low rounded-3xl p-4 p-sm-5 sticky-top shadow-sm border border-outline-10"
                        style="top: 2rem;">
                        <h3 class="h4 fw-bolder mb-4 pb-3 border-bottom border-outline-20">
                            {{ trans('Information Order') }}</h3>
                        <div class="d-flex flex-column gap-3 mb-4">
                            <div class="d-flex justify-content-between text-on-surface-variant small fs-sm-6">
                                <span>{{ trans('Subtotal') }}</span>
                                <span class="fw-semibold text-on-surface">{{ subPrice }} $</span>
                            </div>
                            <div class="d-flex justify-content-between text-on-surface-variant small fs-sm-6">
                                <span>{{ trans('Shipping') }}</span>
                                <span class="fw-semibold text-on-surface">{{ shippingCost }} $</span>
                            </div>
                            <div
                                class="pt-3 mt-3 border-top border-outline-30 d-flex justify-content-between align-items-baseline">
                                <span class="h5 fw-bold text-on-surface mb-0">{{ trans('Total') }}</span>
                                <span
                                    class="display-6 fw-bolder text-primary-custom">{{ shippingCost + subPrice }} $</span>
                            </div>
                        </div>
                        <div class="d-flex flex-column gap-3">
                            <form @submit.prevent="submitOrder">
                            <button
                                class="btn w-100 py-3 rounded-3 btn-gradient fw-bold fs-5 shadow active-scale transition-all">
                                إتمام عملية الشراء
                            </button>
                            </form>
                            <div
                                class="d-flex align-items-center justify-content-center gap-2 text-on-surface-variant-60 small py-2">
                                <span class="material-symbols-outlined" style="font-size: 14px;">lock</span><span>يمكنك الدفع عند الاستلام أو الدفع عبر شام كاش</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </app-layout>
</template>
<script setup>

import {computed, ref, watch, onMounted, nextTick} from 'vue'
import {usePage, useForm, Link, router, Head} from '@inertiajs/vue3'
import AppLayout from '@/Layouts/App.vue'

const page = usePage()
const carts = ref([]);
carts.value = JSON.parse(localStorage.getItem('carts') || '[]');

const createOrder = useForm({
    items: [],
    deliveryType: 'office',
    shippingCost: 0,
    address: '',
    subPrice:0
})
const submitSuccess = ref(false)


const submitOrder=()=>{
    createOrder.items = carts.value;
createOrder.subPrice = subPrice.value;
    createOrder.shippingCost = shippingCost.value;

    let cartUrl = '/cart';
    try {
        if (typeof route !== 'undefined' && route) {
            cartUrl = route('orders.store');
        } else {
            const currentLocale = page.props.locale || '';
            cartUrl = currentLocale ? `/${currentLocale}/orders` : '/orders';
        }
    } catch (e) {
        const currentLocale = page.props.locale || '';
        cartUrl = currentLocale ? `/${currentLocale}/orders` : '/orders';
    }

    createOrder.post(cartUrl, {
        preserveScroll: true,
        preserveState: true,
        onBefore: () => {
            submitSuccess.value = false;
        },
        onSuccess: () => {
            submitSuccess.value = true;
            createOrder.reset();
            createOrder.clearErrors();
            setTimeout(() => {
                submitSuccess.value = false;
            }, 5000);
        },
        onError: () => {
            submitSuccess.value = false;
        },
    });

}
const trans = (key) => page.props.translations[key] || key
const normalizeCapacity = (val) => {
    if (val === null || val === undefined) return ''
    return String(val).trim()
}
const formatCapacityLabel = (cap) => {
    const c = normalizeCapacity(cap)
    if (!c) return ''
    return /ah$/i.test(c) ? c : `${c}Ah`
}

const shippingCost = computed(() => {

    // 1️⃣ حساب إجمالي الكمية
    const totalQty = carts.value.reduce((sum, item) => {
        return sum + (item.quantity || 0);
    }, 0);

    // 2️⃣ حساب الوزن الكلي (kg)
    const totalWeightKg = carts.value.reduce((sum, item) => {
        return sum + ((item.weight || 0) * (item.quantity || 0));
    }, 0);

    // 3️⃣ تحويل إلى طن
    const totalWeightTon = totalWeightKg / 1000;

    // 🏢 تسليم مكتب
    if (createOrder.deliveryType === 'office') {

        // 🔥 أكثر من 20 → 35$ لكل طن
        if (totalQty > 20) {
            return totalWeightTon * 35;
        }

        if (totalQty >= 10) {
            return totalQty * 1;
        }

        return totalQty * 2;
    }

    // 🏠 تسليم عنوان
    if (createOrder.deliveryType === 'home') {

        if (totalQty < 5) {
            return totalQty * 4;
        }

        if (totalQty <= 20) {
            return totalQty * 3;
        }

        return totalQty * 3;
    }

    return 0;
});


const subPrice = computed(() => {
    return carts.value.reduce((total, item) => {
        return total + (item.price * item.quantity);
    }, 0);
});

const addToCart = (cart) => {

    const index = carts.value.findIndex(item =>
        item.id === cart.id &&
        item.product_id === cart.product_id
    );

    if (index !== -1) {
        carts.value[index].quantity += 1;
    }

    localStorage.setItem('carts', JSON.stringify(carts.value));
    console.log(carts.value)
};

const removeFromCart = (cart) => {

    carts.value = carts.value.filter(item =>
        !(item.id === cart.id && item.product_id === cart.product_id)
    );

    localStorage.setItem('carts', JSON.stringify(carts.value));
};

const decreaseQty = (cart) => {

    const item = carts.value.find(item =>
        item.id === cart.id &&
        item.product_id === cart.product_id
    );

    if (!item) return;

    if (item.quantity > 1) {
        item.quantity--;
    } else {
        carts.value = carts.value.filter(item =>
            !(item.id === cart.id && item.product_id === cart.product_id)
        );
    }

    localStorage.setItem('carts', JSON.stringify(carts.value));
};
</script>
<style>
@import "bootstrap";

:root {
    --on-primary-fixed: #000000;
    --primary: #ba001e;
    --surface-dim: #ffc6ce;
    --secondary-dim: #4e5052;
    --secondary-container: #e2e2e5;
    --on-secondary: #f2f2f5;
    --surface-container-low: #ffecee;
    --secondary: #5a5c5e;
    --tertiary: #7443a8;
    --primary-fixed: #ff7671;
    --surface-container: #ffe1e4;
    --surface: #fff4f4;
    --inverse-surface: #24020a;
    --inverse-on-surface: #cb8c96;
    --surface-container-highest: #ffd2d8;
    --on-secondary-fixed-variant: #5a5c5e;
    --error-dim: #b92902;
    --on-surface-variant: #814c56;
    --surface-tint: #ba001e;
    --on-tertiary-container: #470d79;
    --tertiary-container: #cc9bff;
    --surface-bright: #fff4f4;
    --on-primary-container: #4e0007;
    --on-error-container: #520c00;
    --on-secondary-fixed: #3e3f42;
    --tertiary-dim: #68369b;
    --on-tertiary-fixed: #260049;
    --on-background: #4d212a;
    --on-error: #ffefec;
    --surface-variant: #ffd2d8;
    --on-secondary-container: #505254;
    --error-container: #f95630;
    --on-primary-fixed-variant: #60000a;
    --primary-container: #ff7671;
    --inverse-primary: #ff5353;
    --on-primary: #ffefee;
    --surface-container-lowest: #ffffff;
    --tertiary-fixed: #cc9bff;
    --background: #fff4f4;
    --on-tertiary: #fbefff;
    --on-surface: #4d212a;
    --on-tertiary-fixed-variant: #501b83;
    --tertiary-fixed-dim: #c08cf7;
    --secondary-fixed-dim: #d4d4d7;
    --secondary-fixed: #e2e2e5;
    --error: #b02500;
    --outline-variant: #dd9ca6;
    --outline: #a06771;
    --primary-dim: #a40019;
    --surface-container-high: #ffd9de;
    --primary-fixed-dim: #ff5a59;
}
</style>
<style scoped>

body {
    font-family: 'Noto Sans Arabic', 'Plus Jakarta Sans', sans-serif;
    overflow-x: hidden;
    background-color: var(--surface);
    color: var(--on-surface);
}

.material-symbols-outlined {
    font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
    vertical-align: middle;
}

.max-w-5xl {
    max-width: 64rem;
}

.text-primary-custom {
    color: var(--primary) !important;
}

.text-primary-60 {
    color: rgba(186, 0, 30, 0.6) !important;
}

.text-on-surface {
    color: var(--on-surface) !important;
}

.text-on-surface-variant {
    color: var(--on-surface-variant) !important;
}

.text-on-surface-variant-80 {
    color: rgba(129, 76, 86, 0.8) !important;
}

.text-on-surface-variant-60 {
    color: rgba(129, 76, 86, 0.6) !important;
}

.text-on-primary {
    color: var(--on-primary) !important;
}

.text-on-primary-container {
    color: var(--on-primary-container) !important;
}

.bg-surface-container-lowest {
    background-color: var(--surface-container-lowest) !important;
}

.bg-surface-container-low {
    background-color: var(--surface-container-low) !important;
}

.bg-surface-container {
    background-color: var(--surface-container) !important;
}

.bg-surface-container-high {
    background-color: var(--surface-container-high) !important;
}

.bg-surface-container-highest {
    background-color: var(--surface-container-highest) !important;
}

.bg-primary-10 {
    background-color: rgba(186, 0, 30, 0.1) !important;
}

.border-outline-10 {
    border-color: rgba(221, 156, 166, 0.1) !important;
}

.border-outline-20 {
    border-color: rgba(221, 156, 166, 0.2) !important;
}

.border-outline-30 {
    border-color: rgba(221, 156, 166, 0.3) !important;
}

.hover-border-outline-30:hover {
    border-color: rgba(221, 156, 166, 0.3) !important;
}

.line-outline-30 {
    height: 1px;
    background-color: rgba(221, 156, 166, 0.3);
    width: 100%;
}

.rounded-2xl {
    border-radius: 1rem !important;
}

.rounded-3xl {
    border-radius: 1.5rem !important;
}

.product-card-grid {
    display: grid;
    grid-template-columns: 80px 1fr;
    gap: 12px;
}

.product-image-wrap {
    width: 80px;
    height: 80px;
}

.qty-btn {
    width: 1.5rem;
    height: 1.5rem;
}

.fs-11 {
    font-size: 11px;
}

.fs-20 {
    font-size: 20px;
}

.fs-18 {
    font-size: 18px;
}

.fs-sm-5,
.fs-sm-6 {
    font-size: inherit;
}

.transition-all {
    transition: all 0.2s ease;
}

.transition-opacity {
    transition: opacity 0.2s ease;
}

.btn-gradient {
    background: linear-gradient(to bottom right, var(--primary), var(--primary-dim));
    color: var(--on-primary);
    border: 0;
}

.btn-map {
    background-color: var(--surface-container-highest);
    color: var(--on-primary-container);
    border: 0;
}

.active-scale:active {
    transform: scale(0.98);
}

.active-scale-sm:active {
    transform: scale(0.9);
}

input[type="radio"] {
    accent-color: #ba001e;
    width: 1.25rem;
    height: 1.25rem;
    cursor: pointer;
}

@media (min-width: 576px) {
    .fs-sm-5 {
        font-size: 1.25rem !important;
    }

    .fs-sm-6 {
        font-size: 1rem !important;
    }

    .product-card-grid {
        grid-template-columns: 120px 1fr;
        gap: 24px;
    }

    .product-image-wrap {
        width: 120px;
        height: 120px;
    }

    .qty-btn {
        width: 2rem;
        height: 2rem;
    }
}

.btn-cart {
    color: white !important;
    background-color: red !important;
    border: none;
    border-radius: 3px;
    padding-inline: 15px;
    padding-block: 8px;
}

.btn-cart:hover {
    outline: 0;
    box-shadow: none;
    color: red !important;
    background-color: transparent !important;
    border: 1px solid red;
}

</style>
