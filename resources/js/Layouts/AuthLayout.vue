<template>
    <AppLayout>
        <section class="py-5 bg-body-tertiary">
            <div class="container">
                <nav aria-label="breadcrumb" class="mb-4">
                    <ol class="breadcrumb mb-0">
                        <li class="breadcrumb-item">
                            <Link :href="homeUrl">{{ trans('Home') }}</Link>
                        </li>
                        <li class="breadcrumb-item active" aria-current="page">
                            {{ title }}
                        </li>
                    </ol>
                </nav>

                <div class="row justify-content-center">
                    <div class="col-12 col-md-10 col-lg-8 col-xl-6">
                        <div class="card border-0 shadow-sm">
                            <div class="card-body p-4 p-md-5">
                                <h1 class="h4 mb-2">{{ heading }}</h1>
                                <p v-if="subheading" class="text-muted mb-4">{{ subheading }}</p>

                                <slot />
                            </div>
                        </div>

                        <div v-if="$slots.footer" class="text-center mt-3">
                            <slot name="footer" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </AppLayout>
</template>

<script setup>
import { computed } from 'vue'
import { Link, usePage } from '@inertiajs/vue3'
import AppLayout from '@/Layouts/App.vue'

const props = defineProps({
    title: { type: String, required: true },
    heading: { type: String, required: true },
    subheading: { type: String, default: '' },
})

const page = usePage()
const locale = computed(() => page.props.locale || '')

const trans = (key) => {
    try {
        return page.props.translations?.[key] || key
    } catch (e) {
        return key
    }
}

const withLocalePath = (path) => {
    const loc = locale.value || ''
    if (!path || typeof path !== 'string') return path
    if (!path.startsWith('/')) return path
    return loc ? `/${loc}${path}` : path
}

const homeUrl = computed(() => withLocalePath('/'))

const { title, heading, subheading } = props
</script>





