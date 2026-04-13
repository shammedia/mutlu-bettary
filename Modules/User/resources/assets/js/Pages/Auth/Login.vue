<template>
    <Head>
        <title>{{trans("Login")}} | Mutlu</title>
    </Head>

    <auth-layout
        :title="trans('Login')"
        :heading="trans('Sign In to Your Account')"
        :subheading="trans('Enter your credentials to access your account')"
    >
        <form @submit.prevent="form.post(route('login'))" class="vstack gap-3">
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

            <div>
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

            <div class="d-flex justify-content-between align-items-center flex-wrap gap-2">
                <div class="form-check">
                    <input id="remember" v-model="form.remember" class="form-check-input" type="checkbox" :disabled="form.processing">
                    <label class="form-check-label" for="remember">{{ trans('Remember Me') }}</label>
                </div>

                <Link :href="route('password.request')" class="link-secondary  small">
                    {{ trans('Forgot Password') }}
                </Link>
            </div>

            <button type="submit" class="btn btn-secondary  w-100 py-2" :disabled="form.processing">
                <span v-if="form.processing" class="d-inline-flex align-items-center justify-content-center gap-2">
                    <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
                    <span>{{ trans('Signing In...') }}</span>
                </span>
                <span v-else>{{ trans('Sign In') }}</span>
            </button>
        </form>

        <template #footer>
            <div class="small text-muted">
                {{ trans("I Don't Have Account!") }}
                <Link :href="route('register')" class="link-secondary  fw-semibold ms-1">
                    {{ trans('Register') }}
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
            password: '',
            remember: false,
        });

        return {form, seo, trans};
    }
}

</script>
