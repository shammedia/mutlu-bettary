<!-- resources/js/Pages/Index.vue -->
<template>
    <Head>
        <title>{{trans("Home") }} | Mutlu</title>
    </Head>
    <app-layout>
        <div class="hero-wrapper hero-2" id="hero"

             :style="{
            backgroundImage: `url(${storage_path + settings.hero_img})`
        }">
            <div class="hero-shape2-1">
                <span class="hero-shape2-2"></span>
            </div>
            <div class="container">
                <div class="row">
                    <div class="col-xxl-6 col-xl-5 col-lg-8">
                        <div class="hero-style2">
                            <span class="sub-title text-white">{{trans('Mutlu Batteries')}}</span>
                            <h1 class="hero-title text-white">  {{seo.main_title}}
                            </h1>
                            <p class="hero-text text-white">{{seo.website_desc}}</p>
                            <div class="btn-group">
                                <Link :href="route('about-us')" class="btn">{{ trans('Learn More') }}</Link>
                                <div class="call-media-wrap">
                                    <div class="icon">
                                        <img :src="asset_path + 'site/img/icon/phone-1.svg'" alt="img">
                                    </div>
                                    <div class="media-body">
                                        <h6 class="title text-white">{{trans('Requesting A Call') }}:</h6>
                                        <h4 class="link">
                                            <a dir="ltr" class="text-white" :href="'tel:'+settings.phone">{{settings.phone}}</a>
                                        </h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Featured products -->
        <div class="portfolio-area-1 space overflow-hidden">
            <div class="container">
                <div class="row justify-content-between align-items-end">
                    <div class="col-xl-5 col-lg-6">
                        <div class="title-area">
                            <span class="sub-title">{{trans('Our Featured Products')}}</span>
                            <h2 class="sec-title">{{trans('Check out the best-selling products at affordable prices')}} <img class="title-bg-shape"
                                                                                                :src="asset_path + 'site/img/bg/title-bg-shape.png'"
                                                                                                alt="img"></h2>
                        </div>
                    </div>
                    <div class="col-sm-auto">
                        <div class="title-area">
                            <div class="icon-box">
                                <button data-slick-prev=".portfolio-slider1" class="slick-arrow default"><i
                                    class="fas fa-arrow-left"></i></button>
                                <button data-slick-next=".portfolio-slider1" class="slick-arrow default"><i
                                    class="fas fa-arrow-right"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container-fluid p-0">
                <div class="row global-carousel gx-30 portfolio-slider1" data-slide-show="1" data-center-mode="true"
                     data-xl-center-mode="true" data-ml-center-mode="true" data-lg-center-mode="true"
                     data-center-padding="578px" data-xl-center-padding="350px" data-ml-center-padding="300px"
                     data-lg-center-padding="200px">
                    <template v-if="featuredProducts && featuredProducts.length">
                        <div v-for="product in featuredProducts" :key="product.id" class="col-lg-6">
                            <div class="portfolio-card style2">
                                <div class="portfolio-card-thumb">
                                    <img :src="product.image_link" :alt="translateField(product.title) || 'Product'">
                                </div>
                                <div class="portfolio-card-details">
                                    <div class="media-left">
                                        <h4 class="portfolio-card-details_title">
                                            <Link :href="route('shop.show', product.slug)">
                                                {{ translateField(product.title) }}
                                            </Link>
                                        </h4>

                                    </div>
                                    <Link :href="route('shop.show', product.slug)" class="icon-btn">
                                        <i class="fas fa-arrow-right"></i>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </template>
                    <template v-else>
                        <div class="col-12">
                            <div class="text-center py-5">
                                <h4>{{ trans('No featured products yet') }}</h4>
                            </div>
                        </div>
                    </template>
                </div>
            </div>
        </div>

        <!-- Contact form -->
        <div class="appointment-area-2 bg-smoke overflow-hidden"
             :style="{ backgroundImage: `url(${asset_path}images/custom/contact_bg.png)` }">
            <div class="container">
                <div class="row gx-0">
                    <div class="col-xl-7">
                        <div class="space">
                            <div class="appointment-form-wrap bg-white">
                                <div class="title-area">
                                <span class="sub-title">{{trans('Let Us Call You')}}
                                </span>
                                    <h2 class="sec-title">{{trans('Please Fill The Form Below')}}</h2>
                                </div>
                                <form @submit.prevent="handleContactSubmit" class="appointment-form">
                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <input
                                                    v-model="contactForm.name"
                                                    type="text"
                                                    class="form-control style-border"
                                                    name="name"
                                                    id="home_contact_name"
                                                    :placeholder="trans('Your Name')"
                                                    :disabled="contactForm.processing"
                                                >
                                                <div v-if="contactForm.errors.name" class="text-danger mt-1 small">
                                                    {{ contactForm.errors.name }}
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <input
                                                    v-model="contactForm.email"
                                                    type="email"
                                                    class="form-control style-border"
                                                    name="email"
                                                    id="home_contact_email"
                                                    :placeholder="trans('Email Address')"
                                                    :disabled="contactForm.processing"
                                                >
                                                <div v-if="contactForm.errors.email" class="text-danger mt-1 small">
                                                    {{ contactForm.errors.email }}
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <input
                                                    v-model="contactForm.mobile"
                                                    type="text"
                                                    class="form-control style-border"
                                                    name="mobile"
                                                    id="home_contact_mobile"
                                                    :placeholder="trans('Phone Number')"
                                                    :disabled="contactForm.processing"
                                                >
                                                <div v-if="contactForm.errors.mobile" class="text-danger mt-1 small">
                                                    {{ contactForm.errors.mobile }}
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <input
                                                    v-model="contactForm.subject"
                                                    type="text"
                                                    class="form-control style-border"
                                                    name="subject"
                                                    id="home_contact_mobile"
                                                    :placeholder="trans('Subject')"
                                                    :disabled="contactForm.processing"
                                                >
                                                <div v-if="contactForm.errors.subject" class="text-danger mt-1 small">
                                                    {{ contactForm.errors.subject }}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group col-12">
                                        <textarea
                                            v-model="contactForm.message"
                                            :placeholder="trans('Message here..')"
                                            id="home_contact_message"
                                            name="message"
                                            class="form-control style-border"
                                            :disabled="contactForm.processing"
                                        ></textarea>
                                        <div v-if="contactForm.errors.message" class="text-danger mt-1 small">
                                            {{ contactForm.errors.message }}
                                        </div>
                                    </div>

                                    <div class="form-btn col-12">
                                        <button class="btn style2" type="submit" :disabled="contactForm.processing">
                                            <span v-if="contactForm.processing">{{ trans('Sending...') }}</span>
                                            <span v-else>{{ trans('Submit') }}</span>
                                            <i class="fas fa-arrow-right ms-2"></i>
                                        </button>
                                    </div>
                                    <div v-if="contactSuccess" class="col-12 mt-3">
                                        <div class="alert alert-success">
                                            {{ trans('Thank you for contacting us! We will get back to you soon.') }}
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-5 d-xl-block d-none">
                        <div class="appointment-thumb-2">
                            <img :src="asset_path + 'images/custom/shop.png'" alt="img">
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- FAQs -->
        <FaqSection :faqs="faqs"/>
    </app-layout>
</template>

<script setup>
import {computed, ref} from 'vue'
import {usePage, useForm, Link, Head} from '@inertiajs/vue3'

const page = usePage()
const trans = (key) => page.props.translations[key] || key;
const seo = computed(() => page.props.seo)
const settings = computed(() => page.props.settings)
const asset_path = computed(() => page.props.asset_path || '')
const storage_path = computed(() => page.props.storage_path || '')
const locale = computed(() => page.props.locale)

const clients = computed(() => page.props.clients || [])
const faqs = computed(() => page.props.faqs || [])
const featuredProducts = computed(() => page.props.featuredProducts || [])

const translateField = (value) => {
    if (!value) return ''
    if (typeof value === 'string') return value
    const loc = locale.value || 'en'
    if (typeof value === 'object' && value !== null) {
        return value[loc] || Object.values(value)[0] || ''
    }
    return ''
}

const truncate = (text, max = 80) => {
    const t = text || ''
    return t.length > max ? `${t.slice(0, max)}...` : t
}


const formatDate = (dateString, type = 'full') => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    if (type === 'day') {
        return date.getDate().toString().padStart(2, '0');
    } else if (type === 'month') {
        return months[date.getMonth()];
    }
    return date.toLocaleDateString();
}

// Smooth scroll to section by id (used for "Explore More" button)
const scrollToSection = (id) => {
    if (typeof window === 'undefined') return;

    const el = document.getElementById(id);
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const start = window.pageYOffset;
    const offset = start + rect.top - 80; // adjust for header
    const duration = 1200; // <-- make longer for slower scroll
    const startTime = performance.now();

    const animate = (now) => {
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // smooth easing

        window.scrollTo(0, start + (offset - start) * eased);

        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    };

    requestAnimationFrame(animate);
};


// Home contact form (posts to Support module: contact-us.Store)
const contactSuccess = ref(false)
const contactForm = useForm({
    name: '',
    email: '',
    mobile: '',
    subject: '',
    message: '',
})

const handleContactSubmit = () => {
    if (contactForm.processing) return false

    let contactUrl = '/contact-us'
    try {
        if (typeof route !== 'undefined' && route) {
            contactUrl = route('contact-us.Store')
        } else {
            const currentLocale = page.props.locale || ''
            contactUrl = currentLocale ? `/${currentLocale}/contact-us` : '/contact-us'
        }
    } catch (e) {
        const currentLocale = page.props.locale || ''
        contactUrl = currentLocale ? `/${currentLocale}/contact-us` : '/contact-us'
    }

    contactForm.post(contactUrl, {
        preserveScroll: true,
        preserveState: true,
        onBefore: () => {
            contactSuccess.value = false
        },
        onSuccess: () => {
            contactSuccess.value = true
            contactForm.reset()
            contactForm.clearErrors()
            setTimeout(() => {
                contactSuccess.value = false
            }, 5000)
        },
        onError: () => {
            contactSuccess.value = false
        },
    })

    return false
}

</script>

<script>


import AppLayout from '@/Layouts/App.vue';
import FaqSection from '@/Components/FaqSection.vue'

export default {
    components: {
        AppLayout,
        FaqSection
    }

};
</script>


