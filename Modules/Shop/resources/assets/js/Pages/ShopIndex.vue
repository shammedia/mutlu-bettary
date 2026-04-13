<template>
    <Head>
        <title>{{ trans("Our Products") }} | Mutlu</title>
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
                            <h1 class="breadcumb-title">{{ trans('Our Products') }}</h1>
                            <ul class="breadcumb-menu">
                                <li><Link :href="route('home')">{{ trans('Home') }}</Link></li>
                                <li class="active">{{ trans('Our Products') }}</li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-lg-6 d-lg-block d-none">
                        <div class="breadcumb-thumb">
                            <img :src="asset_path + 'images/custom/shop.png'" alt="img">
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!--==============================
        Product Area
        ==============================-->
        <section class="space-top space-extra-bottom">
            <div class="container">
                <div class="row flex-row-reverse">
                    <!-- Products -->
                    <div class="col-xl-9 col-lg-8">
                        <div class="shop-sort-bar">
                            <div class="row justify-content-between align-items-center">
                                <div class="col-md">
                                    <p class="woocommerce-result-count">
                                        {{ trans('Showing') }}
                                        {{ products.from || 0 }}–{{ products.to || 0 }}
                                        {{ trans('of') }} {{ products.total || 0 }}
                                        {{ trans('results') }}
                                    </p>
                                </div>

                                <div class="col-md-auto">
                                    <form class="woocommerce-ordering" method="get" @submit.prevent>
                                        <div class="form-group mb-0">
                                            <select
                                                ref="sortSelect"
                                                v-model="sortValue"
                                                @change="handleSortChange(sortValue)"
                                                class="single-select orderby"
                                                aria-label="Shop order"
                                                id="shop-sort-select"
                                            >
                                                <option value="default">{{ trans('Default Sorting') }}</option>
                                                <option value="popular">{{ trans('Sort by popularity') }}</option>
                                                <option value="date">{{ trans('Sort by latest') }}</option>
                                                <option value="featured">{{ trans('Featured') }}</option>
                                                <option value="trending">{{ trans('Trending') }}</option>
                                            </select>
                                            <i class="fas fa-angle-down"></i>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>

                        <div class="row gy-4">
                            <template v-if="products.data && products.data.length > 0">
                                <div v-for="product in products.data" :key="product.id" class="col-xl-4 col-md-6">
                                    <div class="product-card style2">
                                        <div class="product-img">
                                            <Link :href="route('shop.show', product.slug)">
                                                <img :src="product.image_link" :alt="product.title">
                                            </Link>
                                        </div>
                                        <div class="product-content">
                                            <h3 class="product-title">
                                                <Link :href="route('shop.show', product.slug)">{{ product.title }}</Link>
                                            </h3>
                                            <span class="star-rating">
                                            </span>
                                            <p class="mb-20">{{ (product.description || '').substring(0, 90) }}</p>
                                            <Link :href="route('shop.show', product.slug)" class="link-btn">
                                                {{ trans('View details') }} <i class="fas fa-arrow-right"></i>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </template>

                            <template v-else>
                                <div class="col-12">
                                    <div class="text-center py-5">
                                        <h4>{{ trans('No products found') }}</h4>
                                        <p>{{ trans('Try adjusting your filters or search criteria.') }}</p>
                                    </div>
                                </div>
                            </template>
                        </div>

                        <!-- Pagination -->
                        <div v-if="products.links && products.links.length > 3" class="pagination justify-content-center mt-70">
                            <ul>
                                <template v-for="(link, index) in products.links" :key="`page-${index}`">
                                    <li v-if="link.url">
                                        <Link :href="link.url" :class="{ active: link.active }" v-html="link.label"></Link>
                                    </li>
                                    <li v-else>
                                        <span v-html="link.label"></span>
                                    </li>
                                </template>
                            </ul>
                        </div>
                    </div>

                    <!-- Sidebar -->
                    <div class="col-xl-3 col-lg-4 sidebar-widget-area">
                        <aside class="sidebar-sticky-area sidebar-area sidebar-shop">
                            <div class="widget widget_search">
                                <h3 class="widget_title">{{ trans('Search') }}</h3>
                                <form class="search-form" @submit.prevent="applySearch">
                                    <input v-model="searchValue" type="text" :placeholder="trans('Lets Find Your Battery')">
                                    <button type="submit"><i class="fas fa-search"></i></button>
                                </form>
                            </div>

                            <div class="widget widget_categories">
                                <h3 class="widget_title">{{ trans('Batteries Categories') }}</h3>
                                <ul>
                                    <li>
                                        <Link :href="route('shop.index', currentQueryWithoutCategory)">
                                            {{ trans('All Categories') }}
                                        </Link>
                                        <span>({{ products.total || 0 }})</span>
                                    </li>
                                    <li v-for="category in categories" :key="`cat-${category.id}`">
                                        <Link :href="route('shop.index', { ...currentQuery, category: category.slug })">{{ category.name }}</Link>
                                        <span>({{ category.products_count }})</span>
                                    </li>
                                </ul>
                            </div>

                        </aside>
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
                            <span class="sub-title style2 text-white">{{trans('Let Us Call You')}}</span>
                            <h2 class="sec-title text-white mb-0">{{trans('Lets Find Your Battery')}}</h2>
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
import { computed, ref, watch, onMounted, nextTick } from 'vue'
import { usePage, Link, router, Head } from '@inertiajs/vue3'
import AppLayout from '@/Layouts/App.vue'

const page = usePage()
const trans = (key, params = {}) => {
    let translation = page.props.translations[key] || key
    if (params && Object.keys(params).length > 0) {
        Object.keys(params).forEach(param => {
            translation = translation.replace(`:${param}`, params[param])
        })
    }
    return translation
}

const products = computed(() => page.props.products)
const categories = computed(() => page.props.categories)
const settings = computed(() => page.props.settings || {})
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

const filters = computed(() => ({
    category: new URLSearchParams(window.location.search).get('category') || null,
    sort: new URLSearchParams(window.location.search).get('sort') || 'default',
    search: new URLSearchParams(window.location.search).get('search') || ''
}))

const sortValue = ref(filters.value.sort)
const sortSelect = ref(null)
const searchValue = ref(filters.value.search || '')

const currentQuery = computed(() => {
    const url = new URL(window.location.href)
    const params = new URLSearchParams(url.search)
    const query = {}
    params.forEach((val, key) => {
        query[key] = val
    })
    return query
})

const currentQueryWithoutCategory = computed(() => {
    const q = { ...currentQuery.value }
    delete q.category
    return q
})

// Watch for URL changes to update sort value
watch(() => page.url, () => {
    const params = new URLSearchParams(window.location.search)
    const newSort = params.get('sort') || 'default'
    if (sortValue.value !== newSort) {
        sortValue.value = newSort
    }
    const newSearch = params.get('search') || ''
    if (searchValue.value !== newSearch) {
        searchValue.value = newSearch
    }
}, { immediate: true })

const handleSortChange = (selectedValue) => {
    // Get the value from parameter or from sortValue ref
    const value = selectedValue || sortValue.value

    console.log('handleSortChange called with value:', value) // Debug

    // Get current URL and parse query parameters
    const url = new URL(window.location.href)
    const currentSort = url.searchParams.get('sort') || 'default'

    console.log('Current sort in URL:', currentSort, 'New value:', value) // Debug

    // Prevent if value hasn't changed
    if (value === currentSort) {
        console.log('Sort value unchanged, skipping') // Debug
        return
    }

    // Update sort parameter - preserve existing params
    const params = new URLSearchParams(url.search)
    if (value === 'default') {
        params.delete('sort')
    } else {
        params.set('sort', value)
    }

    // Build query object for Inertia
    const query = {}
    params.forEach((val, key) => {
        query[key] = val
    })

    console.log('Navigating with query:', query) // Debug

    // Use current pathname (more reliable than route helper in script setup)
    const routePath = url.pathname

    // Navigate with Inertia
    try {
        router.get(routePath, query, {
            preserveState: false,
            preserveScroll: true,
            only: ['products']
        })
        console.log('router.get called successfully') // Debug
    } catch (error) {
        console.error('Error calling router.get:', error) // Debug
    }
}

const applySearch = () => {
    const url = new URL(window.location.href)
    const params = new URLSearchParams(url.search)
    const value = (searchValue.value || '').trim()
    if (!value) {
        params.delete('search')
    } else {
        params.set('search', value)
    }

    const query = {}
    params.forEach((val, key) => {
        query[key] = val
    })

    router.get(url.pathname, query, {
        preserveState: false,
        preserveScroll: true,
        only: ['products']
    })
}

// Re-initialize nice-select after navigation and bind change handler
onMounted(() => {
    nextTick(() => {
        initializeSortSelect()
    })
})

// Watch for Inertia navigation to re-initialize nice-select
watch(() => products.value, () => {
    nextTick(() => {
        initializeSortSelect()
    })
})

const initializeSortSelect = () => {
    if (typeof window !== 'undefined' && window.jQuery) {
        const $ = window.jQuery
        const $select = $('#shop-sort-select')
        if ($select.length) {
            // Remove existing nice-select wrapper if any
            $select.next('.nice-select').remove()

            // Re-initialize nice-select if available
            if (typeof $select.niceSelect === 'function') {
                $select.niceSelect()
            }

            // Bind change event - nice-select triggers change on the original select
            $select.off('change.sortHandler').on('change.sortHandler', function() {
                const value = $(this).val()

                // Always update sortValue and call handleSortChange
                sortValue.value = value

                handleSortChange(value)
            })

            // Fallback: listen to clicks on nice-select options (nice-select uses .list and .option)
            const $niceSelect = $select.next('.nice-select')
            if ($niceSelect.length) {
                // Use a small delay to ensure nice-select has updated the select value
                $niceSelect.find('.option, .list .option').off('click.sortHandler').on('click.sortHandler', function() {
                    setTimeout(() => {
                        const value = $select.val()
                        console.log('Nice-select option clicked, value:', value) // Debug
                        if (value) {
                            sortValue.value = value
                            console.log('About to call handleSortChange with:', value) // Debug
                            handleSortChange(value)
                        }
                    }, 50) // Increased delay to ensure nice-select has updated
                })
            }
        }
    }
}
</script>

<script>
export default {
    components: {
        AppLayout
    }
}
</script>

