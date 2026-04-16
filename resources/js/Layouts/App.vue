<template>
    <!--==============================
    Mobile Menu
    ============================== -->
    <div class="mobile-menu-wrapper">
        <div class="mobile-menu-area">
            <div class="mobile-logo">
                <Link :href="homeUrl"><img :src="asset_path + 'images/red_logo.png'" alt="logo"></Link>
                <button class="menu-toggle"><i class="fa fa-times"></i></button>
            </div>
            <div class="mobile-menu">
                <ul>
                    <li>
                        <Link :href="homeUrl" :class="{ 'nav-route-active': isActive('home') }">{{
                                trans('Home')
                            }}
                        </Link>
                    </li>
                    <li>
                        <Link :href="aboutUrl" :class="{ 'nav-route-active': isActive('about-us') }">
                            {{ trans('About Us') }}
                        </Link>
                    </li>
                    <li class="menu-item-has-children" v-if="shopCategories.length">
                        <a href="#" :class="{ 'nav-route-active': isActive('shop.*') }">{{ trans('Categories') }}</a>
                        <ul class="sub-menu">
                            <li>
                                <Link :href="shopIndexUrl" :class="{ 'nav-route-active': isActive('shop.index') }">
                                    {{ trans('All Products') }}
                                </Link>
                            </li>
                            <li v-for="category in shopCategories" :key="category.id">
                                <Link :href="categoryUrl(category.slug)">{{ translateField(category.name) }}</Link>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <Link :href="contactUrl" :class="{ 'nav-route-active': isActive('contact-us') }">
                            {{ trans('Contact Us') }}
                        </Link>
                    </li>

                    <li v-if="auth?.type === 'admin'"
                        :class="{ active: isActive('admin.dashboard.index') }">
                        <a
                            :href="route('admin.dashboard.index')"
                            class="nav-link main-nav-link"
                        >
                            {{ trans("Dashboard") }}
                        </a>
                    </li>
                    <li class="menu-item-has-children">
                        <a href="#">{{ trans('Language') }}</a>
                        <ul class="sub-menu">
                            <li>
                                <a href="#" @click.prevent="switchLocale('ar')"
                                   :class="{'active': locale === 'ar'}">AR</a>
                            </li>

                            <li>
                                <a href="#" @click.prevent="switchLocale('en')"
                                   :class="{'active': locale === 'en'}">EN</a>
                            </li>
                            <li>
                                <a href="#" @click.prevent="switchLocale('tr')"
                                   :class="{'active': locale === 'tr'}">TR</a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <!--==============================
	Header Area
    ==============================-->
    <header class="nav-header header-layout2">

        <div class="sticky-wrapper">
            <!-- Main Menu Area -->
            <div class="menu-area">
                <div class="container">
                    <div class="row align-items-center justify-content-between align-center">
                        <div class="col-auto header-navbar-logo d-flex gap-2">
                            <div class="header-logo">
                                <Link :href="homeUrl"><img :src="logoSrc" alt="logo"></Link>

                            </div>

                        </div>
                        <div class="col-auto">
                            <nav class="main-menu d-none d-lg-inline-block">
                                <ul>
                                    <li>
                                        <Link :href="homeUrl" :class="{ 'nav-route-active': isActive('home') }">
                                            {{ trans('Home') }}
                                        </Link>
                                    </li>
                                    <li>
                                        <Link :href="aboutUrl" :class="{ 'nav-route-active': isActive('about-us') }">
                                            {{ trans('About Us') }}
                                        </Link>
                                    </li>
                                    <li class="menu-item-has-children" v-if="shopCategories.length">
                                        <a href="#" :class="{ 'nav-route-active': isActive('shop.*') }">{{
                                                trans('Our Products')
                                            }}</a>
                                        <ul class="sub-menu">

                                            <li v-for="category in shopCategories" :key="category.id">
                                                <Link :href="categoryUrl(category.slug)">
                                                    {{ translateField(category.name) }}
                                                </Link>
                                            </li>
                                            <li>
                                                <Link :href="shopIndexUrl"
                                                      :class="{ 'nav-route-active': isActive('shop.index') }">
                                                    <strong>{{ trans('All Products') }} </strong></Link>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <Link :href="contactUrl"
                                              :class="{ 'nav-route-active': isActive('contact-us') }">
                                            {{ trans('Contact Us') }}
                                        </Link>
                                    </li>

                                    <li v-if="auth?.type === 'admin'"
                                        :class="{ active: isActive('admin.dashboard.index') }">
                                        <a
                                            :href="route('admin.dashboard.index')"
                                            class="nav-link main-nav-link"
                                        >
                                            {{ trans("Dashboard") }}
                                        </a>
                                    </li>
                                    <li class="menu-item-has-children">
                                        <a class="text-uppercase" href="#" @click.prevent>
                                            {{ locale }}
                                        </a>
                                        <ul class="sub-menu">
                                            <li>
                                                <a href="#" @click.prevent="switchLocale('ar')"
                                                   :class="{'active': locale === 'ar'}">AR</a>
                                            </li>
                                            <li>
                                                <a href="#" @click.prevent="switchLocale('en')"
                                                   :class="{'active': locale === 'en'}">EN</a>
                                            </li>
                                            <li>
                                                <a href="#" @click.prevent="switchLocale('tr')"
                                                   :class="{'active': locale === 'tr'}">TR</a>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </nav>

                            <div class="navbar-right d-flex d-lg-none align-items-center justify-content-between w-100">
                                <div class="d-flex align-items-center mx-3 justify-content-center flex-grow-1">
                                    <cart />
                                </div>
                                <button type="button" class="menu-toggle icon-btn"><i class="fas fa-bars"></i></button>


                            </div>
                        </div>
                        <div class="col-auto d-xl-block d-none">
                            <div class="social-links" v-if="socialLinks.length">
                                <a v-for="item in socialLinks" :key="item.key" :href="item.url" target="_blank"
                                   rel="noopener">
                                    <i :class="item.icon"></i>
                                </a>
<cart/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>
    <slot/>

    <!--==============================
    Footer Area
==============================-->
    <footer class="footer-wrapper footer-layout2"
            :style="{ backgroundImage: `url(${asset_path}site/img/bg/footer-bg2-1.png)` }">
        <div class="container">

            <div class="widget-area">
                <div class="row justify-content-between">
                    <div class="col-md-6 col-xl-3">
                        <div class="footer-logo mb-3">
                            <Link :href="homeUrl"><img :src="logoSrc" alt="logo"></Link>

                        </div>
                        <div class="widget footer-widget widget-about">

                            <p class="footer-text mb-30">{{ (seo && seo.website_desc) ? seo.website_desc : '' }}</p>
                            <div class="social-btn style3" v-if="socialLinks.length">
                                <a v-for="item in socialLinks" :key="item.key" :href="item.url" target="_blank"
                                   rel="noopener" tabindex="-1">
                                    <i :class="item.icon"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6 col-xl-auto">
                        <div class="widget widget_nav_menu footer-widget">
                            <h3 class="widget_title">{{ trans('Company') }}</h3>
                            <div class="menu-all-pages-container">
                                <ul class="menu">
                                    <li>
                                        <Link :href="homeUrl">{{ trans('Home') }}</Link>
                                    </li>
                                    <li>
                                        <Link :href="aboutUrl">{{ trans('About Us') }}</Link>
                                    </li>
                                    <li>
                                        <Link :href="contactUrl">{{ trans('Contact Us') }}</Link>
                                    </li>
                                    <li v-if="shopCategories.length">
                                        <Link :href="shopIndexUrl">{{ trans('All Products') }}</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6 col-xl-auto">
                        <div class="widget widget_nav_menu footer-widget">
                            <h3 class="widget_title">{{ trans('Our Products') }}</h3>
                            <div class="menu-all-pages-container">
                                <ul class="menu">

                                    <li v-for="category in shopCategories.slice(0, 8)"
                                        :key="`footer-cat-${category.id}`">
                                        <Link :href="categoryUrl(category.slug)">{{
                                                translateField(category.name)
                                            }}
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6 col-xl-auto">
                        <div class="widget footer-widget">
                            <h3 class="widget_title">{{ trans('Contact') }}</h3>
                            <div class="widget-contact2">
                                <div class="widget-contact-grid">
                                    <div class="icon">
                                        <i class="fas fa-map-marker-alt"></i>
                                    </div>
                                    <div class="contact-grid-details">
                                        <p>{{ trans('Address') }}</p>
                                        <h6>{{ settings && settings.address ? settings.address : '' }}</h6>
                                    </div>
                                </div>
                                <div class="widget-contact-grid">
                                    <div class="icon">
                                        <i class="fas fa-phone-alt"></i>
                                    </div>
                                    <div class="contact-grid-details">
                                        <p>{{ trans('Phone Number') }}</p>
                                        <h6>
                                            <a dir="ltr" v-if="settings && settings.phone"
                                               :href="`tel:${settings.phone}`">{{ settings.phone }}</a>
                                        </h6>
                                    </div>
                                </div>
                                <div class="widget-contact-grid">
                                    <div class="icon">
                                        <i class="fas fa-envelope"></i>
                                    </div>
                                    <div class="contact-grid-details">
                                        <p>{{ trans('Email Address') }}</p>
                                        <h6>
                                            <a dir="ltr" v-if="settings && settings.email"
                                               :href="`mailto:${settings.email}`">{{ settings.email }}</a>
                                        </h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="copyright-wrap">
            <div class="container">
                <div class="row gy-3 justify-content-md-between justify-content-center">
                    <div class="col-auto align-self-center">
                        <p class="copyright-text text-center">
                            © <a href="#">{{ (seo && seo.website_name) ? seo.website_name : '' }}</a> {{ currentYear }}
                            | {{ trans('All Rights Reserved') }}
                        </p>
                    </div>
                    <div class="col-auto">
                        <div class="footer-links">
                            <Link :href="aboutUrl">{{ trans('About Us') }}</Link>
                            <Link :href="contactUrl">{{ trans('Contact Us') }}</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </footer>

    <!--********************************
			Code End  Here
	******************************** -->

    <Transition name="wa-fab">
        <a
            v-if="whatsappFabUrl"
            class="wa-fab"
            :href="whatsappFabUrl"
            target="_blank"
            rel="noopener"
            aria-label="WhatsApp"
            :title="trans('WhatsApp')"
        >
            <i class="fab fa-whatsapp" aria-hidden="true"></i>
        </a>
    </Transition>



    <!-- Scroll To Top -->
    <div class="scroll-top">
        <svg class="progress-circle svg-content" width="100%" height="100%" viewBox="-1 -1 102 102">
            <path d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98"
                  style="transition: stroke-dashoffset 10ms linear 0s; stroke-dasharray: 307.919, 307.919; stroke-dashoffset: 307.919;"></path>
        </svg>
    </div>

</template>

<script setup>
import {computed, onMounted, ref, nextTick} from 'vue'
import {Link, usePage} from '@inertiajs/vue3'
import Cart from "@/Components/Cart.vue";


const page = usePage()

const trans = (key) => page.props.translations[key] || key;
const settings = computed(() => page.props.settings)
const storage_path = computed(() => page.props.storage_path)
const asset_path = computed(() => page.props.asset_path || '')
const locale = computed(() => page.props.locale)
const seo = computed(() => page.props.seo)

const auth = computed(() => page.props.auth)


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

const homeUrl = computed(() => safeRoute('home', {}, '/'))
const aboutUrl = computed(() => safeRoute('about-us', {}, '/about-us'))
const contactUrl = computed(() => safeRoute('contact-us', {}, '/contact-us'))
const shopIndexUrl = computed(() => safeRoute('shop.index', {}, '/shop'))


const categoryUrl = (slug) => safeRoute('shop.index', {category: slug}, `/shop?category=${encodeURIComponent(slug || '')}`)

const shopCategories = computed(() => page.props.shopCategories || page.props.categories || [])

const translateField = (value) => {
    if (!value) return ''
    if (typeof value === 'string') return value
    const loc = locale.value || 'en'
    if (typeof value === 'object' && value !== null) {
        return value[loc] || Object.values(value)[0] || ''
    }
    return ''
}

const normalizeUrl = (url) => {
    if (!url) return null
    const u = String(url).trim()
    if (!u) return null
    if (u.startsWith('http://') || u.startsWith('https://')) return u
    return `https://${u}`
}

const whatsappUrl = (value) => {
    if (!value) return null
    const v = String(value).trim()
    if (!v) return null
    if (v.startsWith('http://') || v.startsWith('https://')) return v
    const digits = v.replace(/[^\d]/g, '')
    return digits ? `https://wa.me/${digits}` : null
}

const socialLinks = computed(() => {
    const s = settings.value || {}
    return [
        {key: 'facebook', icon: 'fab fa-facebook-f', url: normalizeUrl(s.facebook)},
        {key: 'instagram', icon: 'fab fa-instagram', url: normalizeUrl(s.instagram)},
        {key: 'youtube', icon: 'fab fa-youtube', url: normalizeUrl(s.youtube)},
        {key: 'whatsapp', icon: 'fab fa-whatsapp', url: whatsappUrl(s.whatsapp)},
    ].filter((x) => x.url)
})

const whatsappFabUrl = computed(() => {
    const s = settings.value || {}
    // Prefer general WhatsApp setting; fall back to sales WhatsApp if present.
    return whatsappUrl(s.whatsapp || s.sales_whatsapp)
})

const logoSrc = computed(() => {
    const s = settings.value || {}
    if (s.white_logo) return `${storage_path.value}${s.white_logo}`
    return `${asset_path.value}site/img/logo.svg`
})

const currentYear = computed(() => new Date().getFullYear())


const openExternal = (url) => {
    if (!url) return
    window.open(url, '_blank')
}

const supportedLocales = ['en', 'ar', 'tr']

const switchLocale = (newLocale) => {
    if (!newLocale) return
    const loc = String(newLocale).toLowerCase()
    if (!supportedLocales.includes(loc)) return

    const current = new URL(window.location.href)
    const parts = current.pathname.split('/').filter(Boolean)

    if (parts.length > 0 && supportedLocales.includes(parts[0])) {
        parts[0] = loc
    } else {
        parts.unshift(loc)
    }

    current.pathname = `/${parts.join('/')}`
    window.location.href = current.toString()
}
const isActive = (routeName) => {
    try {
        if (typeof route === 'undefined' || !route) return false
        const r = typeof route === 'function' ? route() : route
        return !!(r && typeof r.current === 'function' && r.current(routeName))
    } catch (e) {
        return false
    }
}


</script>

<style scoped>
/* Active navbar link (current route): underline + bold */
.main-menu a.nav-route-active,
.mobile-menu a.nav-route-active {
    font-weight: 700 !important;
    text-decoration: underline !important;
    text-underline-offset: 8px;
    text-decoration-thickness: 2px;
}

/* Floating WhatsApp button */
.wa-fab {
    position: fixed;
    left: 30px;
    bottom: 35px; /* keep above scroll-to-top (bottom:30px) */
    width: 50px;
    height: 50px;
    border-radius: 9999px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #25D366;
    color: #fff;
    box-shadow: 0 14px 30px rgba(0, 0, 0, 0.22);
    z-index: 9999;
    transition: transform 180ms ease, box-shadow 180ms ease, filter 180ms ease;
    -webkit-tap-highlight-color: transparent;
}

.wa-fab i {
    font-size: 26px;
    line-height: 1;
}

.wa-fab:hover {
    transform: translateY(-2px) scale(1.03);
    box-shadow: 0 18px 40px rgba(0, 0, 0, 0.26);
    filter: brightness(1.03);
}

.wa-fab:active {
    transform: translateY(0) scale(0.98);
}

.wa-fab:focus-visible {
    outline: 3px solid rgba(37, 211, 102, 0.35);
    outline-offset: 3px;
}

.wa-fab::before {
    content: "";
    position: absolute;
    inset: -8px;
    border-radius: inherit;
    background: rgba(37, 211, 102, 0.35);
    opacity: 0;
    transform: scale(0.9);
    animation: waPulse 2.4s ease-out infinite;
    pointer-events: none;
}
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
