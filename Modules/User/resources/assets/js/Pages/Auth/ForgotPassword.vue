<template>
    <Head>
        <title>{{trans("Forgot Password")}} | Mutlu</title>
    </Head>

    <auth-layout
        :title="trans('Forgot Password')"
        :heading="trans('Reset Your Password')"
        :subheading="trans(`Enter your email address and we'll send you a link to reset your password`)"
    >
        <form @submit.prevent="form.post(route('password.email'))" class="vstack gap-3">
            <div>
                <label for="email" class="form-label">
                    {{ trans('Email') }} <span class="text-danger">*</span>
                </label>
                <input
                    id="email"
                    v-model="form.email"
                    autofocus
                    name="email"
                    type="email"
                    :placeholder="trans('Email')"
                    class="form-control"
                    :class="{ 'is-invalid': errors && errors.email }"
                    :disabled="form.processing"
                    required
                >
                <div v-if="errors && errors.email" class="invalid-feedback">
                    {{ errors.email }}
                </div>
            </div>

            <button type="submit" class="btn btn-secondary  w-100 py-2" :disabled="form.processing">
                <span v-if="form.processing" class="d-inline-flex align-items-center justify-content-center gap-2">
                    <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
                    <span>{{ trans('Sending...') }}</span>
                </span>
                <span v-else>{{ trans('Send Password Reset Link') }}</span>
            </button>
        </form>

        <template #footer>
            <div class="small text-muted">
                <Link :href="route('login')" class="link-secondary  fw-semibold">
                    {{ trans('Back to Login') }}
                </Link>
            </div>
        </template>
    </auth-layout>
</template>


<script>
import {computed} from 'vue';
import {usePage, Link, useForm, Head} from '@inertiajs/vue3';
import AuthLayout from '@/Layouts/AuthLayout.vue';

export default {
    components: {
        AuthLayout, Link, Head
    },
    props: {
        errors: Object
    },
    setup() {
        const page = usePage();

        const seo = computed(() => page.props.seo)
        const trans = (key) => {
            try {
                return page.props.translations?.[key] || key;
            } catch (e) {
                return key;
            }
        };

        const form = useForm({
            email: '',
        });

        return {form, seo, trans};
    }
}

</script>
