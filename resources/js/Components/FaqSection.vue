<template>
    <section v-if="faqsToShow.length" class="faq-area-2 space">
        <div class="container">
            <div class="row gx-60 flex-row-reverse">
                <div class="col-xl-6">
                    <div class="faq-thumb2 mb-xl-0 mb-50">
                        <div class="about-counter-grid jump">
                            <img
                                :src="asset_path + 'site/img/icon/faq2-counter-icon-1.svg'"
                                alt="img"
                            >

                        </div>

                        <img
                            :src="asset_path + 'images/custom/faqs.jpg'"
                            alt="img"
                        >
                    </div>
                </div>

                <div class="col-xl-6">
                    <div class="title-area">
                        <span class="sub-title">{{ trans('FAQs') }}</span>
                        <h2 class="sec-title">

                        </h2>
                    </div>

                    <div class="accordion-area accordion" id="faqAccordion">
                        <div
                            v-for="faq in faqsToShow"
                            :key="faq.id"
                            class="accordion-card style2"
                            :class="{ active: isFaqOpen(faq.id) }"
                        >
                            <div class="accordion-header" :id="`collapse-item-${faq.id}`">
                                <button
                                    class="accordion-button"
                                    type="button"
                                    @click="toggleFaq(faq.id)"
                                    :class="{ collapsed: !isFaqOpen(faq.id) }"
                                    :aria-expanded="isFaqOpen(faq.id)"
                                    :aria-controls="`collapse-${faq.id}`"
                                >
                                    {{ translatedQuestion(faq) }}
                                </button>
                            </div>

                            <div
                                :id="`collapse-${faq.id}`"
                                class="accordion-collapse collapse"
                                :class="{ show: isFaqOpen(faq.id) }"
                                :aria-labelledby="`collapse-item-${faq.id}`"
                                data-bs-parent="#faqAccordion"
                            >
                                <div class="accordion-body">
                                    <p class="faq-text" v-html="translatedAnswer(faq)"></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import {computed, ref} from 'vue'
import {usePage} from '@inertiajs/vue3'

const props = defineProps({
    faqs: {
        type: Array,
        default: () => [],
    },
})

const page = usePage()
const trans = (key) => page.props.translations[key] || key
const locale = computed(() => page.props.locale || 'en')
const asset_path = computed(() => page.props.asset_path || '')

const faqsToShow = computed(() => props.faqs || [])

const openFaqId = ref(null)

const toggleFaq = (id) => {
    openFaqId.value = openFaqId.value === id ? null : id
}

const isFaqOpen = (id) => openFaqId.value === id

const translatedQuestion = (faq) => {
    if (!faq || !faq.question) return ''
    const loc = locale.value
    if (typeof faq.question === 'string') return faq.question
    return faq.question[loc] || Object.values(faq.question)[0] || ''
}

const translatedAnswer = (faq) => {
    if (!faq || !faq.answer) return ''
    const loc = locale.value
    if (typeof faq.answer === 'string') return faq.answer
    return faq.answer[loc] || Object.values(faq.answer)[0] || ''
}
</script>

<style scoped>
/* Layout/styles are expected to come from your theme CSS for faq-area-2. */
.faq-text {
    margin-bottom: 0;
}
</style>




