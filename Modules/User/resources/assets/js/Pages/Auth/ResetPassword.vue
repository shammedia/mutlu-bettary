<template>
    <Head>
        <title>{{trans("Reset Password")}} | Mutlu</title>
    </Head>

    <auth-layout
        :title="trans('Reset Password')"
        :heading="trans('Set New Password')"
        :subheading="trans('Enter your email and new password to reset your account')"
    >
        <form @submit.prevent="form.post(route('password.update'))" class="vstack gap-3">
            <input :value="form.token" name="token" type="hidden">

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

            <div class="row g-3">
                <div class="col-12 col-sm-6">
                    <label for="password" class="form-label">
                        {{ trans('Password') }} <span class="text-danger">*</span>
                    </label>
                    <input
                        id="password"
                        v-model="form.password"
                        name="password"
                        type="password"
                        :placeholder="trans('Password')"
                        class="form-control"
                        :class="{ 'is-invalid': errors && errors.password }"
                        :disabled="form.processing"
                        required
                    >
                    <div v-if="errors && errors.password" class="invalid-feedback">
                        {{ errors.password }}
                    </div>
                </div>

                <div class="col-12 col-sm-6">
                    <label for="password_confirmation" class="form-label">
                        {{ trans('Confirm Password') }} <span class="text-danger">*</span>
                    </label>
                    <input
                        id="password_confirmation"
                        v-model="form.password_confirmation"
                        name="password_confirmation"
                        type="password"
                        :placeholder="trans('Confirm Password')"
                        class="form-control"
                        :class="{ 'is-invalid': errors && errors.password_confirmation }"
                        :disabled="form.processing"
                        required
                    >
                    <div v-if="errors && errors.password_confirmation" class="invalid-feedback">
                        {{ errors.password_confirmation }}
                    </div>
                </div>
            </div>

            <button type="submit" class="btn btn-secondary  w-100 py-2" :disabled="form.processing">
                <span v-if="form.processing" class="d-inline-flex align-items-center justify-content-center gap-2">
                    <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
                    <span>{{ trans('Resetting...') }}</span>
                </span>
                <span v-else>{{ trans('Reset Password') }}</span>
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
        errors: Object,
        token: String,
        email: String,
    },
    setup(props) {
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
            email: props.email || '',
            password: '',
            password_confirmation: '',
            token: props.token || ''
        });

        return {form, seo, trans};
    }
}

</script>
