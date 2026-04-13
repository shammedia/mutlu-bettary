<template>
    <Head>
        <title>{{trans("Register")}} | Mutlu</title>
    </Head>

    <auth-layout
        :title="trans('Register')"
        :heading="trans('Create A New Account')"
        :subheading="trans('Fill out the form below to create your account')"
    >
        <form @submit.prevent="form.post(route('register'))" class="vstack gap-3">
            <div class="row g-3">
                <div class="col-12 col-sm-6">
                    <label for="name" class="form-label">
                        {{ trans('Name') }} <span class="text-danger">*</span>
                    </label>
                    <input
                        id="name"
                        v-model="form.name"
                        autofocus
                        name="name"
                        type="text"
                        :placeholder="trans('Name')"
                        class="form-control"
                        :class="{ 'is-invalid': errors && errors.name }"
                        :disabled="form.processing"
                        required
                    >
                    <div v-if="errors && errors.name" class="invalid-feedback">
                        {{ errors.name }}
                    </div>
                </div>

                <div class="col-12 col-sm-6">
                    <label for="email" class="form-label">
                        {{ trans('Email') }} <span class="text-danger">*</span>
                    </label>
                    <input
                        id="email"
                        v-model="form.email"
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

                <div class="col-12 col-sm-6">
                    <label for="mobile" class="form-label">
                        {{ trans('Mobile') }} <span class="text-danger">*</span>
                    </label>
                    <input
                        id="mobile"
                        v-model="form.mobile"
                        name="mobile"
                        type="text"
                        :placeholder="trans('Mobile')"
                        class="form-control"
                        :class="{ 'is-invalid': errors && errors.mobile }"
                        :disabled="form.processing"
                        required
                    >
                    <div v-if="errors && errors.mobile" class="invalid-feedback">
                        {{ errors.mobile }}
                    </div>
                </div>

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
                    <span>{{ trans('Registering...') }}</span>
                </span>
                <span v-else>{{ trans('Register') }}</span>
            </button>
        </form>

        <template #footer>
            <div class="small text-muted">
                <Link :href="route('login')" class="link-secondary  fw-semibold">
                    {{ trans('Already Have An Account?') }}
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
            name: '',
            email: '',
            mobile: '',
            password: '',
            password_confirmation: '',

        });

        return {form, seo, trans};
    }
}

</script>
