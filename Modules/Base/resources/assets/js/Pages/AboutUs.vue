<template>
    <Head>
        <title>{{ trans('About Us') }} | Mutlu</title>
    </Head>

    <app-layout>
        <div class="breadcumb-wrapper">
            <!-- bg animated image/ -->
            <div class="container">
                <div class="row">
                    <div class="col-lg-6">
                        <div class="breadcumb-content">
                            <h1 class="breadcumb-title">{{ trans('About Us') }}</h1>
                            <ul class="breadcumb-menu">
                                <li>
                                    <Link :href="route('home')">{{ trans('Home') }}</Link>
                                </li>
                                <li class="active">{{ trans('About Us') }}</li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-lg-6 d-lg-block d-none">
                        <div class="breadcumb-thumb">
                            <img :src="asset_path + 'images/custom/about-us.png'" alt="img">
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="space-top">
            <div class="container">
                <div class="row">
                    <div class="col-xxl-7 col-xl-6">
                        <div class="about-thumb2 mb-40 mb-xl-0">
                            <div class="about-img-1">
                                <img :src="asset_path + 'images/custom/person_checking_battery.png'" alt="img">
                            </div>
                            <div class="about-img-2">
                                <img :src="asset_path + 'images/custom/battery_factory.png'" alt="img">
                            </div>
                            <div class="about-counter-wrap jump-reverse">
                                <img :src="asset_path +'site/img/icon/about_icon2-1.svg'" alt="img">
                                <h3 class="about-counter"><span class="counter-number">{{settings.customer_count || 5}}</span>k+</h3>
                                <h4 class="about-counter-text">{{ trans('Customer') }}</h4>
                            </div>
                            <div class="about-year-wrap2 movingX">
                                <div class="about-year-grid-wrap">
                                    <div class="icon">
                                        <img :src="asset_path +'site/img/icon/about_icon2-2.png'" alt="img">
                                    </div>
                                    <h3 class="about-counter"><span class="counter-number">{{settings.y_experince || 10}}</span>+</h3>
                                </div>
                                <h4 class="about-year-text">{{ trans('Years Of Experience') }}</h4>
                            </div>
                        </div>
                    </div>
                    <div class="col-xxl-5 col-xl-6">
                        <div class="about-content-wrap">
                            <div class="title-area mb-30">
                                <span class="sub-title">{{ trans('About Us') }}</span>
                                <h2 class="sec-title">
                                    {{ trans('The first company to import batteries in syria') }} <img
                                    class="title-bg-shape shape-center"
                                    :src="asset_path +'site/img/bg/title-bg-shape.png'" alt="img"></h2>
                                <p class="sec-text">
                                    {{
                                        trans('Mutlu Company was founded in the city of Sarmada in late 2011, and is one of the first companies specializing in importing batteries in Syria.')
                                    }}. <br/>
                                    {{
                                        trans('We import all types of high-quality batteries for various industrial, commercial, and domestic uses.')
                                    }}: <br/>
                                    {{
                                        trans('car batteries, Indian batteries, lithium batteries, and more. We also carry batteries for modern cars, including start-stop batteries')
                                    }},
                                    <br/>
                                    {{ trans('All types of car batteries from 35 amps to 240 amps') }} <br/>
                                    {{
                                        trans('In addition to all types of solar panels, we also offer residential and agricultural inverters')
                                    }},


                                </p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>

        <section class="process-area-1 space shape-mockup-wrap">
            <div class="portfolio-shape-img shape-mockup d-lg-block d-none">
                <img class="about1-shape-img-1 spin" :src="asset_path + 'site/img/normal/about_shape1-2.svg'" alt="img">
                <img class="about1-shape-img-2 spin2" :src="asset_path + 'site/img/normal/about_shape1-1.svg'"
                     alt="img">
            </div>
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-lg-6">
                        <div class="title-area text-center">
                            <span class="sub-title">{{ trans('Why Us') }}</span>
                            <h2 class="sec-title">{{ trans('Why Mutlu Batteries?') }}</h2>
                        </div>
                    </div>
                </div>
                <div class="row gy-30">
                    <div class="col-lg-4 process-card-wrap">
                        <div class="process-card">
                            <div class="process-card-icon">
                                <img :src="asset_path +'site/img/icon/process-icon-1-1.svg'" alt="img">
                            </div>
                            <h4 class="process-card-title">{{ trans('Technology') }}</h4>
                            <p class="process-card-text">
                                {{ trans('High-tech solutions designed with Mutlu quality and experience for different types of vehicles and intended uses') }}</p>
                        </div>
                    </div>
                    <div class="col-lg-4 process-card-wrap">
                        <div class="process-card process-card-center">
                            <div class="process-card-icon">
                                <img :src="asset_path +'site/img/icon/process-icon-1-2.svg'" alt="img">
                            </div>
                            <h4 class="process-card-title">{{ trans('M-Quality') }}</h4>
                            <p class="process-card-text">
                                {{ trans('The M Quality stamp symbolizes the superior quality of Mutlu Battery products manufactured with different production technologies at IATF 16949 certified plants that respect people and the environment') }}</p>
                        </div>
                    </div>
                    <div class="col-lg-4 process-card-wrap">
                        <div class="process-card">
                            <div class="process-card-icon">
                                <img :src="asset_path +'site/img/icon/process-icon-1-3.svg'" alt="img">
                            </div>
                            <h4 class="process-card-title">{{ trans('Choice of Vehicle Manufacturers') }}</h4>
                            <p class="process-card-text">
                                {{ trans('Meeting the technical and high-performance expectations of vehicle manufacturers for long years, Mutlu Battery is preferred as the original equipment manufacturer by numerous leading automotive companies') }}</p>
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
                                <Link v-else class="btn" :href="contactUsHref">
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
import {computed} from 'vue'
import {Head, Link, usePage} from '@inertiajs/vue3'
import AppLayout from '@/Layouts/App.vue'

const page = usePage()
const trans = (key) => page.props.translations[key] || key

const seo = computed(() => page.props.seo || {})
const asset_path = computed(() => page.props.asset_path || '')
const settings = computed(() => page.props.settings || {})

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

const contactUsHref = computed(() => {
    try {
        return route('contact-us')
    } catch (e) {
        return '/contact-us'
    }
})
</script>

<script>
export default {
    components: {
        AppLayout,
    },
}
</script>






