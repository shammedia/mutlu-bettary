<template>
    <Head>
        <title>{{ product.title }} | Mutlu</title>
    </Head>
    <app-layout>
        <!--==============================
        Breadcumb
        ============================== -->
        <div class="breadcumb-wrapper">
            <div class="container">
                <div class="row">
                    <div class="col-lg-6">
                        <div class="breadcumb-content">
                            <h1 class="breadcumb-title">{{ product.title }}</h1>
                            <ul class="breadcumb-menu">
                                <li>
                                    <Link :href="route('home')">{{ trans('Home') }}</Link>
                                </li>
                                <li>
                                    <Link :href="route('shop.index')">{{ trans('Our Products') }}</Link>
                                </li>
                                <li class="active">{{ product.title }}</li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-lg-6 d-lg-block d-none">
                        <div class="breadcumb-thumb">
                            <img :src="product.image_link" :alt="product.title">
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!--==============================
        Product Details
        ==============================-->
        <section class="product-details my-3">
            <div class="container">
                <div class="row gx-80">

                    <div class="col-lg-12">
                        <h2 class="product-title">{{ product.title }}</h2>
                        <div class="product_meta">
                                <span class="posted_in">
                                    {{ trans('Category') }}:
                                    <template v-if="product.category">
                                        <Link :href="route('shop.index', { category: product.category.slug })"
                                              rel="tag">{{ product.category.name }}</Link>
                                    </template>
                                    <template v-else>
                                        <span>{{ trans('Uncategorized') }}</span>
                                    </template>
                                </span>

                        </div>
                        <div class="paragraph" v-html="product.content"></div>
                        <div v-if="keywordList.length">
                            <h4>{{ trans('Keywords') }}:</h4>
                            <template v-for="(kw, index) in keywordList" :key="`kw-cell-${index}`">
                                <Link :href="route('shop.index', { s: kw.trim() })">
                                    {{ kw.trim() }}
                                </Link>
                                <span v-if="index !== keywordList.length - 1">, </span>
                            </template>

                        </div>
                    </div>
                </div>


                <!--==============================
                Sub Products (Tabbed by Capacity)
                ==============================-->
                <div v-if="subProducts && subProducts.length" class="space-extra-top">
                    <div class="row justify-content-between align-items-end">
                        <div class="col-md-6">
                            <div class="title-area mb-20">
                                <h2 class="sec-title">{{ trans('Available sizes') }}</h2>
                            </div>
                        </div>
                    </div>

                    <div class="capacity-tabs mb-30">
                        <button
                            type="button"
                            class="capacity-tab-btn"
                            :class="{ active: activeCapacity === 'all' }"
                            @click="activeCapacity = 'all'"
                        >
                            {{ trans('All') }}
                        </button>
                        <button
                            v-for="cap in capacityTabs"
                            :key="`cap-${cap}`"
                            type="button"
                            class="capacity-tab-btn"
                            :class="{ active: activeCapacity === cap }"
                            @click="activeCapacity = cap"
                        >
                            {{ formatCapacityLabel(cap) }}
                        </button>
                    </div>

                    <div class="row gy-4">
                        <div v-for="sp in filteredSubProducts" :key="`sp-${sp.id}`" class="col-xl-4 col-lg-4 col-md-6">
                            <div class="sub-product-card">
                                <div class="sub-product-img">
                                    <img :src="getSubProductSelectedSlide(sp)" :alt="sp.name || product.title">
                                </div>
                                <div v-if="sp.slides && sp.slides.length" class="sub-product-thumbs">
                                    <button
                                        v-for="(img, idx) in sp.slides"
                                        :key="`sp-${sp.id}-thumb-${idx}`"
                                        type="button"
                                        class="sub-product-thumb"
                                        :class="{ active: getSubProductSelectedSlide(sp) === img }"
                                        @click="selectedSlideBySubProductId[sp.id] = img"
                                    >
                                        <img :src="img" :alt="`${sp.name || product.title} - ${idx + 1}`">
                                    </button>
                                </div>
                                <div class="sub-product-content">
                                    <h3 class="sub-product-title">
                                        {{ sp.name || `${formatCapacityLabel(sp.capacity)}` }}
                                    </h3>

                                    <table class="sub-product-table">
                                        <tbody>
                                        <tr v-if="sp.capacity">
                                            <th>{{ trans('Capacity (Ah)') }}</th>
                                            <td>{{ sp.capacity }}</td>
                                        </tr>
                                        <tr v-if="sp.voltage">
                                            <th>{{ trans('Voltage (V)') }}</th>
                                            <td>{{ sp.voltage }}</td>
                                        </tr>
                                        <tr v-if="sp.box">
                                            <th>{{ trans('Box') }}</th>
                                            <td>{{ sp.box }}</td>
                                        </tr>
                                        <tr v-if="sp.length">
                                            <th>{{ trans('Length (mm)') }}</th>
                                            <td>{{ sp.length }}</td>
                                        </tr>
                                        <tr v-if="sp.height">
                                            <th>{{ trans('Height (mm)') }}</th>
                                            <td>{{ sp.height }}</td>
                                        </tr>
                                        <tr v-if="sp.weight">
                                            <th>{{ trans('Weight (kg)') }}</th>
                                            <td>{{ sp.weight }}</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!--==============================
                Related Product
                ==============================-->
                <div v-if="relatedProducts && relatedProducts.length" class="space-extra-top space-bottom">
                    <div class="row justify-content-between">
                        <div class="col-md-6">
                            <div class="title-area">
                                <h2 class="sec-title">{{ trans('Related Products') }}</h2>
                            </div>
                        </div>
                        <div class="col-md-auto">
                            <div class="sec-btn mb-40">
                                <Link :href="route('shop.index')" class="btn style-border2">{{
                                        trans('See More')
                                    }}
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div class="row global-carousel"
                         id="productCarousel"
                         data-slide-show="4"
                         data-lg-slide-show="4"
                         data-md-slide-show="3"
                         data-sm-slide-show="2"
                         data-xs-slide-show="1">
                        <div v-for="relatedProduct in relatedProducts" :key="relatedProduct.id"
                             class="col-lg-3 col-md-6">
                            <div class="product-card style2">
                                <div class="product-img">
                                    <Link :href="route('shop.show', relatedProduct.slug)">
                                        <img :src="relatedProduct.image_link" :alt="relatedProduct.title">
                                    </Link>
                                </div>
                                <div class="product-content">
                                    <h3 class="product-title">
                                        <Link :href="route('shop.show', relatedProduct.slug)">{{
                                                relatedProduct.title
                                            }}
                                        </Link>
                                    </h3>
                                    <span class="star-rating">
                                        <i v-for="i in 5" :key="`rel-star-${relatedProduct.id}-${i}`"
                                           class="fas fa-star"></i>
                                    </span>
                                    <p class="mb-20">{{ (relatedProduct.description || '').substring(0, 90) }}</p>
                                    <Link :href="route('shop.show', relatedProduct.slug)" class="link-btn">
                                        {{ trans('View details') }} <i class="fas fa-arrow-right"></i>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <div class="cta-area-1">
            <div class="cta1-bg-thumb">
                <img :src="asset_path +'images/custom/cta.png'" alt="img">
            </div>
            <div class="container">
                <div class="cta-wrap1">
                    <div class="row justify-content-md-between align-items-center">
                        <div class="col-lg-6 col-md-8">
                            <div class="title-area mb-md-0">
                                <span class="sub-title style2 text-white">{{ trans('Let Us Call You') }}</span>
                                <h2 class="sec-title text-white mb-0">{{ trans('Lets Find Your Battery') }}</h2>
                            </div>
                        </div>
                        <div class="col-md-auto">
                            <div class="title-area mb-0">
                                <a
                                    v-if="whatsappHref"
                                    target="_blank"
                                    rel="noopener"
                                    class="btn"
                                    :href="whatsappHref"
                                >
                                    {{ trans('Contact Us') }} <i class="fas fa-arrow-right ms-2"></i>
                                </a>
                                <Link v-else class="btn" :href="route('contact-us')">
                                    {{ trans('Contact Us') }} <i class="fas fa-arrow-right ms-2"></i>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </app-layout>
</template>

<script setup>
import {computed, ref, reactive} from 'vue'
import {usePage, Link, Head} from '@inertiajs/vue3'
import AppLayout from '@/Layouts/App.vue'

const page = usePage()
const trans = (key) => page.props.translations[key] || key

const seo = computed(() => page.props.seo)
const settings = computed(() => page.props.settings || {})
const product = computed(() => page.props.product)
const relatedProducts = computed(() => page.props.relatedProducts)
const subProducts = computed(() => page.props.subProducts || [])
const asset_path = computed(() => page.props.asset_path || '')

const whatsappHref = computed(() => {
    const s = settings.value || {}
    const raw = s.whatsapp || s.sales_whatsapp
    if (!raw) return null

    const v = String(raw).trim()
    if (!v) return null
    if (v.startsWith('http://') || v.startsWith('https://')) return v

    const digits = v.replace(/[^\d]/g, '')
    return digits ? `https://wa.me/${digits}` : null
})

const activeCapacity = ref('all')
const selectedSlideBySubProductId = reactive({})

const normalizeCapacity = (val) => {
    if (val === null || val === undefined) return ''
    return String(val).trim()
}

const formatCapacityLabel = (cap) => {
    const c = normalizeCapacity(cap)
    if (!c) return ''
    return /ah$/i.test(c) ? c : `${c}Ah`
}

const getSubProductSelectedSlide = (sp) => {
    const id = sp?.id
    if (!id) return sp?.primary_slide || product.value?.image_link
    return selectedSlideBySubProductId[id] || sp?.primary_slide || product.value?.image_link
}

const capacityTabs = computed(() => {
    const unique = new Set()
    for (const sp of (subProducts.value || [])) {
        const cap = normalizeCapacity(sp?.capacity)
        if (cap) unique.add(cap)
    }
    const arr = Array.from(unique)
    arr.sort((a, b) => {
        const na = parseFloat(a)
        const nb = parseFloat(b)
        const aNum = Number.isFinite(na)
        const bNum = Number.isFinite(nb)
        if (aNum && bNum) return na - nb
        if (aNum && !bNum) return -1
        if (!aNum && bNum) return 1
        return a.localeCompare(b)
    })
    return arr
})

const filteredSubProducts = computed(() => {
    if (!subProducts.value || subProducts.value.length === 0) return []
    if (activeCapacity.value === 'all') return subProducts.value
    const selected = normalizeCapacity(activeCapacity.value)
    return subProducts.value.filter((sp) => normalizeCapacity(sp?.capacity) === selected)
})

const getKeywords = (keywords) => {
    if (!keywords) return []
    if (typeof keywords === 'string') {
        return keywords.split(',').slice(0, 3)
    }
    return []
}

const keywordList = computed(() => getKeywords(product.value?.keywords))

</script>

<script>
export default {
    components: {
        AppLayout
    }
}
</script>

<style scoped>
.capacity-tabs {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}

.capacity-tab-btn {
    border: 1px solid rgba(255, 0, 0, 0.25);
    background: rgba(255, 0, 0, 0.06);
    color: #ff0000;
    padding: 10px 18px;
    border-radius: 8px;
    font-weight: 600;
    line-height: 1;
    transition: all 0.15s ease;
}

.capacity-tab-btn:hover {
    background: rgba(255, 0, 0, 0.12);
}

.capacity-tab-btn.active {
    background: #ff0000;
    border-color: #ff0000;
    color: #fff;
}

.sub-product-card {
    background: #fff;
    border: 1px solid rgba(0, 0, 0, 0.06);
    border-radius: 14px;
    overflow: hidden;
    height: 100%;
}

.sub-product-img {
    background: #fafafa;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px 16px 10px;
}

.sub-product-img img {
    max-width: 100%;
    height: 160px;
    object-fit: contain;
}

.sub-product-thumbs {
    display: flex;
    gap: 8px;
    padding: 0 16px 12px;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
}

.sub-product-thumb {
    border: 1px solid rgba(0, 0, 0, 0.12);
    background: #fff;
    border-radius: 10px;
    padding: 6px;
    flex: 0 0 auto;
    line-height: 0;
    transition: border-color 0.15s ease, box-shadow 0.15s ease;
}

.sub-product-thumb img {
    width: 56px;
    height: 46px;
    object-fit: contain;
    display: block;
}

.sub-product-thumb.active {
    border-color: rgba(255, 0, 0, 0.55);
    box-shadow: 0 0 0 2px rgba(255, 0, 0, 0.12);
}

.sub-product-content {
    padding: 14px 16px 16px;
}

.sub-product-title {
    font-size: 20px;
    margin: 0 0 10px;
}

.sub-product-table {
    width: 100%;
    border-collapse: collapse;
    text-align: center;
}

.sub-product-table th,
.sub-product-table td {
    padding: 8px 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.08);
}

.sub-product-table th {
    font-weight: 700;
    color: rgba(0, 0, 0, 0.65);
    width: 52%;
}

.sub-product-table td {
    color: rgba(0, 0, 0, 0.6);
}

@media (max-width: 575.98px) {
    .sub-product-img img {
        height: 140px;
    }

    .sub-product-thumb img {
        width: 50px;
        height: 42px;
    }
}
</style>





