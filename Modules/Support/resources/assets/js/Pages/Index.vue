<template>
    <Head>
        <title>{{trans("Contact Us") }} | Mutlu</title>
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
                            <h1 class="breadcumb-title">{{ trans("Contact Us") }}</h1>
                            <ul class="breadcumb-menu">
                                <li>
                                    <Link :href="route('home')">{{ trans("Home") }}</Link>
                                </li>
                                <li class="active">{{ trans("Contact Us") }}</li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-lg-6 d-lg-block d-none">
                        <div class="breadcumb-thumb">
                            <img :src="asset_path + 'images/custom/contact_us.png'" alt="img">
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!--==============================
        Contact info cards
        ==============================-->
        <div class="contact-area space">
            <div class="container">
                <div class="row gy-4 justify-content-center">
                    <div v-if="contactAddressLines.length" class="col-xxl-3 col-lg-4 col-md-6">
                        <div class="contact-info">
                            <div class="contact-info_icon">
                                <i class="fas fa-map-marker-alt"></i>
                            </div>
                            <h6 class="contact-info_title">{{ trans("Address") }}</h6>
                            <p v-for="(line, idx) in contactAddressLines" :key="`addr-${idx}`"
                               class="contact-info_text">
                                {{ line }}
                            </p>
                        </div>
                    </div>

                    <div v-if="contactPhoneLines.length" class="col-xxl-3 col-lg-4 col-md-6">
                        <div class="contact-info">
                            <div class="contact-info_icon">
                                <i class="fas fa-phone-alt"></i>
                            </div>
                            <h6 class="contact-info_title">{{ trans("Phone Number") }}</h6>
                            <p v-for="(phone, idx) in contactPhoneLines" :key="`phone-${idx}`"
                               class="contact-info_text">
                                <a dir="ltr" :href="`tel:${phone}`">{{ phone }}</a>
                            </p>
                        </div>
                    </div>


                    <div v-if="contactEmailLines.length" class="col-xxl-3 col-lg-4 col-md-6">
                        <div class="contact-info">
                            <div class="contact-info_icon">
                                <i class="fas fa-envelope"></i>
                            </div>
                            <h6 class="contact-info_title">{{ trans("E-mail") }}</h6>
                            <p v-for="(email, idx) in contactEmailLines" :key="`email-${idx}`"
                               class="contact-info_text">
                                <a dir="ltr" :href="`mailto:${email}`">{{ email }}</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <!--==============================
        Contact Form + Branches
        ==============================-->
        <section class="contact-form-area appointment-area-2 bg-smoke overflow-hidden"
                  :style="{ backgroundImage: `url(${asset_path}images/custom/contact_bg.png)` }">
            <div class="container">
                <div class="row gx-0 contact-us__grid">
                    <div class="col-lg-6 d-flex">

                        <div class="contact-form-wrap contact-us__panel mb-1">
                                <div class="title-area">
                                <span class="sub-title">{{ trans("Our Agents") }}</span>
                            </div>

                            <div class="contact-us__locator">
                                <div class="contact-us__map-shell">
                                    <div ref="mapEl" class="contact-us__map"></div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div class="col-lg-6 d-flex">
                        <div class="contact-form-wrap contact-us__panel">
                            <div class="title-area">
                                <span class="sub-title">{{ trans("Contact form") }}</span>
                                <h2 class="sec-title">{{ trans("Please Fill The Form Below") }}</h2>
                            </div>

                            <form @submit.prevent="handleSubmit" class="appointment-form ajax-contact">
                                <div class="row">
                                    <div class="col-md-6 form-group">
                                        <input
                                            v-model="contactForm.name"
                                            type="text"
                                            name="name"
                                            id="name"
                                            :placeholder="trans('Your Name')"
                                            class="form-control style-white"
                                            :class="{ 'error': contactForm.errors.name }"
                                            :disabled="contactForm.processing"
                                            required
                                        >
                                        <i class="far fa-user"></i>
                                        <div v-if="contactForm.errors.name" class="text-danger mt-1 small">
                                            {{ contactForm.errors.name }}
                                        </div>
                                    </div>

                                    <div class="col-md-6 form-group">
                                        <input
                                            v-model="contactForm.email"
                                            type="email"
                                            name="email"
                                            id="email"
                                            :placeholder="trans('Email Address')"
                                            class="form-control style-white"
                                            :class="{ 'error': contactForm.errors.email }"
                                            :disabled="contactForm.processing"
                                            required
                                        >
                                        <i class="far fa-envelope"></i>
                                        <div v-if="contactForm.errors.email" class="text-danger mt-1 small">
                                            {{ contactForm.errors.email }}
                                        </div>
                                    </div>

                                    <div class="col-md-6 form-group">
                                        <input
                                            v-model="contactForm.mobile"
                                            type="text"
                                            name="mobile"
                                            id="mobile"
                                            :placeholder="trans('Phone Number')"
                                            class="form-control style-white"
                                            :class="{ 'error': contactForm.errors.mobile }"
                                            :disabled="contactForm.processing"
                                        >
                                        <i class="far fa-phone"></i>
                                        <div v-if="contactForm.errors.mobile" class="text-danger mt-1 small">
                                            {{ contactForm.errors.mobile }}
                                        </div>
                                    </div>


                                    <div class="col-md-6 form-group">
                                        <input
                                            v-model="contactForm.subject"
                                            type="text"
                                            name="subject"
                                            id="subject"
                                            :placeholder="trans('Subject')"
                                            class="form-control style-white"
                                            :class="{ 'error': contactForm.errors.subject }"
                                            :disabled="contactForm.processing"
                                        >
                                        <i class="far fa-phone"></i>
                                        <div v-if="contactForm.errors.subject" class="text-danger mt-1 small">
                                            {{ contactForm.errors.subject }}
                                        </div>
                                    </div>

                                    <div class="col-12 form-group">
                                        <textarea
                                            v-model="contactForm.message"
                                            :placeholder="trans('Type Your Message')"
                                            class="form-control style-white"
                                            :class="{ 'error': contactForm.errors.message }"
                                            :disabled="contactForm.processing"
                                            required
                                        ></textarea>
                                        <i class="far fa-pencil"></i>
                                        <div v-if="contactForm.errors.message" class="text-danger mt-1 small">
                                            {{ contactForm.errors.message }}
                                        </div>
                                    </div>

                                    <div class="col-12 form-group mb-0">
                                        <button class="btn style2" type="submit" :disabled="contactForm.processing">
                                            <span v-if="contactForm.processing">
                                                <i class="fa-solid fa-spinner fa-spin me-2"></i>{{
                                                    trans("Sending...")
                                                }}
                                            </span>
                                            <span v-else>
                                                {{ trans("Send Message") }}
                                            </span>
                                        </button>
                                    </div>

                                    <div v-if="submitSuccess" class="col-12 mt-3">
                                        <div class="alert alert-success">
                                            {{ trans("Thank you for contacting us! We will get back to you soon.") }}
                                        </div>
                                    </div>
                                </div>
                            </form>


                        </div>
                    </div>
                </div>
            </div>
        </section>


        <!-- FAQs on contact page -->
        <FaqSection :faqs="faqs"/>


    </app-layout>
</template>

<script setup>
import {computed, onMounted, nextTick, ref} from 'vue'
import {usePage, useForm, Head, Link} from '@inertiajs/vue3'
import FaqSection from '@/Components/FaqSection.vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

const page = usePage()
const trans = (key) => page.props.translations[key] || key;
const seo = computed(() => page.props.seo)
const asset_path = computed(() => page.props.asset_path || '')
const locale = computed(() => page.props.locale || 'en')
const settings = computed(() => page.props.settings || {})
const branches = computed(() => page.props.branches || [])
const faqs = computed(() => page.props.faqs || [])
const openBranchId = ref(null)
const submitSuccess = ref(false)

const splitLines = (value) => {
    if (!value) return []
    const v = String(value).trim()
    if (!v) return []
    return v
        .split(/\r?\n|,/) // allow either newline or comma separated values
        .map((x) => String(x).trim())
        .filter(Boolean)
}

const primaryBranch = computed(() => (branches.value && branches.value.length ? branches.value[0] : null))

const contactAddressLines = computed(() => {
    const s = settings.value || {}
    const lines = splitLines(s.address)
    if (lines.length) return lines

    const b = primaryBranch.value
    const branchAddress = b?.address ? (b.address[locale.value] || b.address) : ''
    const branchCity = b?.city ? (b.city[locale.value] || b.city) : ''
    return [branchAddress, branchCity].map((x) => String(x || '').trim()).filter(Boolean)
})

const contactPhoneLines = computed(() => {
    const s = settings.value || {}
    const phones = splitLines(s.phone)
    if (phones.length) return phones

    const b = primaryBranch.value
    const phone = b?.phone ? (b.phone[locale.value] || b.phone) : ''
    return phone ? [String(phone).trim()] : []
})

const contactEmailLines = computed(() => {
    const s = settings.value || {}
    return splitLines(s.email)
})

const contactHoursLines = computed(() => {
    const s = settings.value || {}
    // Optional keys (not in admin UI by default, but supported if added later)
    return splitLines(s.opening || s.opening_hours || s.hours || s.working_hours)
})

// Branch Locator Map
const mapEl = ref(null)
const osmMap = ref(null)
const osmMarkers = ref(new Map())
const isMapReady = ref(false)

const hasValidCoords = (b) => {
    const lat = Number(b?.lat)
    const lng = Number(b?.lng)
    return Number.isFinite(lat) && Number.isFinite(lng) && Math.abs(lat) <= 90 && Math.abs(lng) <= 180
}

const getBranchTitle = (b) => {
    const name = b?.name ? (b.name[locale.value] || b.name) : ''
    const city = b?.city ? (b.city[locale.value] || b.city) : ''
    return [name, city].map((x) => String(x || '').trim()).filter(Boolean).join(' — ')
}

const getBranchPopupHtml = (b) => {
    const name = b?.name ? (b.name[locale.value] || b.name) : ''
    const city = b?.city ? (b.city[locale.value] || b.city) : ''
    const address = b?.address ? (b.address[locale.value] || b.address) : ''
    const phone = b?.phone ? (b.phone[locale.value] || b.phone) : ''

    const safe = (x) => String(x || '').replace(/[&<>"']/g, (c) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]))

    const parts = []
    if (name) parts.push(`<div style="font-weight:700;margin-bottom:6px;">${safe(name)}</div>`)
    if (city) parts.push(`<div style="margin-bottom:4px;"><strong>${safe(trans('City'))}:</strong> ${safe(city)}</div>`)
    if (address) parts.push(`<div style="margin-bottom:4px;"><strong>${safe(trans('Address'))}:</strong> ${safe(address)}</div>`)
    if (phone) parts.push(`<div><strong>${safe(trans('Phone'))}:</strong> <a href="tel:${safe(phone)}">${safe(phone)}</a></div>`)
    return `<div style="min-width:240px;max-width:320px;">${parts.join('')}</div>`
}

const initBranchMap = async () => {
    if (!mapEl.value) return
    if (osmMap.value) return

    // Fix Leaflet default marker icons under Vite
    // (Prevents Leaflet from prefixing imagePath and producing broken URLs like: /images/https://... )
    delete L.Icon.Default.prototype._getIconUrl
    L.Icon.Default.mergeOptions({
        iconRetinaUrl: markerIcon2x,
        iconUrl: markerIcon,
        shadowUrl: markerShadow,
    })

    // Syria-ish default center
    const defaultCenter = [34.8021, 38.9968]

    osmMap.value = L.map(mapEl.value, { zoomControl: true, attributionControl: true }).setView(defaultCenter, 6)

    // OpenStreetMap tiles (free). For high traffic, consider a hosted tiles provider.
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap contributors',
    }).addTo(osmMap.value)

    osmMarkers.value = new Map()
    const bounds = []

    for (const b of branches.value || []) {
        if (!hasValidCoords(b)) continue
        const lat = Number(b.lat)
        const lng = Number(b.lng)
        const marker = L.marker([lat, lng], { title: getBranchTitle(b) }).addTo(osmMap.value)
        marker.bindPopup(getBranchPopupHtml(b), { maxWidth: 360 })
        osmMarkers.value.set(b.id, marker)
        bounds.push([lat, lng])
    }

    if (bounds.length) {
        osmMap.value.fitBounds(bounds, { padding: [40, 40] })
    }

    isMapReady.value = true

    // Ensure proper render when the container height is determined by flex layout.
    setTimeout(() => osmMap.value?.invalidateSize(), 0)
}

const focusBranchOnMap = (branch) => {
    if (!isMapReady.value) return
    if (!branch || !hasValidCoords(branch)) return

    const marker = osmMarkers.value.get(branch.id)
    if (!marker || !osmMap.value) return

    const lat = Number(branch.lat)
    const lng = Number(branch.lng)
    osmMap.value.setView([lat, lng], Math.max(osmMap.value.getZoom() || 0, 15), { animate: true })
    marker.openPopup()
}

const contactForm = useForm({
    name: '',
    email: '',
    mobile: '',
    subject: '',
    message: '',
})

const handleSubmit = () => {
    if (contactForm.processing) {
        return false;
    }

    // Validate required fields
    if (!contactForm.name || !contactForm.name.trim()) {
        return false;
    }

    if (!contactForm.email || !contactForm.email.trim()) {
        return false;
    }

    if (!contactForm.message || !contactForm.message.trim()) {
        return false;
    }

    let contactUrl = '/contact-us';
    try {
        if (typeof route !== 'undefined' && route) {
            contactUrl = route('contact-us.store');
        } else {
            const currentLocale = page.props.locale || '';
            contactUrl = currentLocale ? `/${currentLocale}/contact-us` : '/contact-us';
        }
    } catch (e) {
        const currentLocale = page.props.locale || '';
        contactUrl = currentLocale ? `/${currentLocale}/contact-us` : '/contact-us';
    }

    contactForm.post(contactUrl, {
        preserveScroll: true,
        preserveState: true,
        onBefore: () => {
            submitSuccess.value = false;
        },
        onSuccess: () => {
            submitSuccess.value = true;
            contactForm.reset();
            contactForm.clearErrors();
            setTimeout(() => {
                submitSuccess.value = false;
            }, 5000);
        },
        onError: () => {
            submitSuccess.value = false;
        },
    });

    return false;
}

// Complaint Modal Logic
const showComplaintModal = ref(false)
const selectedBranch = ref(null)
const complaintSuccess = ref(false)

const complaintForm = useForm({
    name: '',
    mobile: '',
    branch_id: null,
    description: '',
})

const openComplaintModal = (branch) => {
    selectedBranch.value = branch
    complaintForm.reset()
    complaintForm.clearErrors()
    complaintForm.branch_id = branch.id
    complaintSuccess.value = false
    showComplaintModal.value = true
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden'
}

const closeComplaintModal = () => {
    if (!complaintForm.processing) {
        showComplaintModal.value = false
        selectedBranch.value = null
        complaintForm.reset()
        complaintForm.clearErrors()
        complaintSuccess.value = false
        // Restore body scroll
        document.body.style.overflow = ''
    }
}

const handleComplaintSubmit = (e) => {
    if (e) {
        e.preventDefault();
        e.stopPropagation();
    }

    if (complaintForm.processing) {
        return false;
    }

    // Validate required fields
    if (!complaintForm.branch_id) {
        alert(trans('Please select a branch'));
        return false;
    }

    if (!complaintForm.name || !complaintForm.name.trim()) {
        return false;
    }

    if (!complaintForm.description || !complaintForm.description.trim()) {
        return false;
    }

    if (!complaintForm.mobile || !complaintForm.mobile.trim()) {
        return false;
    }

    let complaintUrl = '/complaint';
    try {
        if (typeof route !== 'undefined' && route) {
            complaintUrl = route('complaint.store');
        } else {
            const currentLocale = page.props.locale || '';
            complaintUrl = currentLocale ? `/${currentLocale}/complaint` : '/complaint';
        }
    } catch (e) {
        const currentLocale = page.props.locale || '';
        complaintUrl = currentLocale ? `/${currentLocale}/complaint` : '/complaint';
    }

    complaintForm.post(complaintUrl, {
        preserveScroll: true,
        preserveState: true,
        onBefore: () => {
            complaintSuccess.value = false;
        },
        onSuccess: () => {
            complaintSuccess.value = true;
            // Don't reset form on success, let user see the success message
            setTimeout(() => {
                complaintSuccess.value = false;
                closeComplaintModal();
            }, 3000);
        },
        onError: (errors) => {
            complaintSuccess.value = false;
            console.error('Complaint submission error:', errors);
        },
        onFinish: () => {
            // Form processing finished
        }
    });

    return false;
}

// Branch accordion helpers
const toggleBranch = (id) => {
    openBranchId.value = openBranchId.value === id ? null : id
}

const isBranchOpen = (id) => {
    return openBranchId.value === id
}

const onBranchClick = (branch) => {
    toggleBranch(branch.id)
    focusBranchOnMap(branch)
}

onMounted(() => {
    nextTick(() => {
        // Open first branch by default if available
        if (branches.value && branches.value.length > 0) {
            openBranchId.value = branches.value[0].id
        }
    })

    // Lazy-init map after mount
    initBranchMap().catch((e) => {
        // If map fails to load, we keep the page functional (contact form still works)
        console.warn('OpenStreetMap init failed:', e)
    })
})

</script>

<script>


import AppLayout from '@/Layouts/App.vue';

export default {
    components: {
        AppLayout
    }

};
</script>

<style scoped>


input[type="email"]:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

input[type="email"].error,
input[type="text"].error,
select.error,
textarea.error {
    border-color: #dc3545;
}


.contact-us__branches-accordion .accordion-card {
    margin-bottom: 15px;
}

.contact-us__branches-accordion .accordion-card:last-child {
    margin-bottom: 0;
}

.contact-us__branch-item .branch-info {
    font-size: 16px;
    color: var(--body-color);
}

.contact-us__branch-item .branch-info a {
    color: var(--theme-color);
    text-decoration: none;
}

.contact-us__branch-item .branch-info a:hover {
    text-decoration: underline;
}

.alert {
    padding: 12px 20px;
    border-radius: 4px;
}

.alert-success {
    background-color: #d4edda;
    border-color: #c3e6cb;
    color: #155724;
}

.form-label {
    display: block;
    margin-bottom: 8px;
    font-weight: 500;
    font-size: 14px;
    color: #333;
}

.form-label .text-danger {
    color: #dc3545;
    font-weight: bold;
}

.contact-us__input .form-label,
.contact-us__textarea .form-label {
    margin-bottom: 8px;
}

.branch-icon-wrapper {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background-color: var(--smoke-color2);
    border-radius: 10px;
    flex-shrink: 0;
}

.branch-icon-wrapper i {
    color: var(--theme-color);
    font-size: 18px;
}

.contact-us__branch-item .branch-name .branch-icon-wrapper {
    margin-right: 10px;
}

.default-title i,
.sec-title i {
    color: var(--theme-color);
}

/* Branch Locator Map */
.contact-us__grid {
    align-items: stretch;
}

.contact-us__panel {
    width: 100%;
    display: flex;
    flex-direction: column;
}

.contact-us__map-shell {
    margin-bottom: 18px;
    flex: 1 1 auto;
    display: flex;
}

.contact-us__map {
    width: 100%;
    height: 100%;
    min-height: 500px;
    border-radius: 14px;
    overflow: hidden;
    border: 1px solid rgba(0, 0, 0, 0.08);
    box-shadow: 0 10px 24px rgba(0, 0, 0, 0.08);
    background: #f5f5f5;
}

@media (max-width: 991.98px) {
    .contact-us__map {
        height: 320px;
        min-height: 320px;
    }
}

@media (max-width: 575.98px) {
    .contact-us__map {
        height: 280px;
        min-height: 280px;
    }
}

.rr-btn i {
    font-size: 14px;
}

/* Complaint Modal Styles */
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    padding: 20px;
    animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

.modal-content {
    background: white;
    border-radius: 8px;
    max-width: 720px;
    width: 100%;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    animation: slideUp 0.3s ease-out;
}

@keyframes slideUp {
    from {
        transform: translateY(50px);
        opacity: 0;
    }
    to {
        transform: translateY(0);
        opacity: 1;
    }
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    border-bottom: 1px solid #dee2e6;
}

.modal-title {
    margin: 0;
    font-size: 20px;
    font-weight: 600;
    color: #333;
}

.btn-close {
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    color: #666;
    padding: 0;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.btn-close:hover {
    color: #000;
}

.modal-body {
    padding: 20px;
}

.modal-footer {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    padding: 20px;
    border-top: 1px solid #dee2e6;
}

.search.custom-search {
    justify-content: center;
    gap: 10px;
}

.search.custom-search input {
    flex: 0 0 auto;
    min-width: 300px;
}

.search.custom-search button {
    flex: 0 0 auto;
    white-space: nowrap;
}

/* Secondary button style to match theme */
.rr-btn.rr-btn-secondary {
    background-color: #ffffff;
    color: #cc4444;
    border: 1px solid #cc4444;
}

.rr-btn.rr-btn-secondary:hover {
    background-color: #ffe5d9;
    color: #cc4444;
}

/* Complaint modal form inputs - match contact form styling */
.modal-content .contact-us__form .contact-us__input input,
.modal-content .contact-us__form .contact-us__textarea textarea {
    width: 100%;
    margin-left: 0;
    margin-bottom: 30px;
    background: var(--rr-common-white, #ffffff);
    padding: 13px 20px;
    border-radius: 12px;
    border: 1px solid #333333;
}

.modal-content .contact-us__form .contact-us__input input:disabled {
    background-color: #f5f5f5;
    opacity: 1;
}

@media (max-width: 767.98px) {
    .modal-content .contact-us__form .row > [class*="col-"] {
        margin-bottom: 15px;
    }
}

@media (max-width: 575.98px) {
    .modal-content {
        max-width: 100%;
        margin: 0;
    }
}

</style>
