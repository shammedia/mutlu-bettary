import 'bootstrap';
import 'toastr';

import {createApp, h, nextTick} from 'vue';
import {createInertiaApp, router} from '@inertiajs/vue3';
// Bridge utilities to (re)initialize legacy theme JS after Inertia navigations
import './theme-bridge';
import {resolvePageComponent} from 'laravel-vite-plugin/inertia-helpers';
import {createPinia} from "pinia";


createInertiaApp({
    resolve: (name) => {
        const modules = name.split("::");
        if (modules.length > 1) {
            return resolvePageComponent(
                `../../Modules/${modules[0]}/resources/assets/js/Pages/${modules[1]}.vue`,
                import.meta.glob('../../Modules/**/resources/assets/js/Pages/**/*.vue')
            );
        } else {
            return resolvePageComponent(
                `./Pages/${name}.vue`,
                import.meta.glob('./Pages/**/*.vue')
            );
        }
    },
    setup({el, App, props, plugin}) {
        const pinia = createPinia();
        const vue = createApp({render: () => h(App, props)})
            .use(plugin).mixin({methods: {route}})
            .use(pinia)
            .mount(el);

        // Run legacy theme initializers after first mount
        if (typeof window !== 'undefined' && typeof window.siteThemeInit === 'function') {
            try { window.siteThemeInit(); } catch (e) { console && console.warn('siteThemeInit error (initial):', e); }
        }

        // Re-run initializers after every successful Inertia navigation
        router.on('success', async () => {
            await nextTick();
            if (typeof window !== 'undefined' && typeof window.siteThemeInit === 'function') {
                try { window.siteThemeInit(); } catch (e) { console && console.warn('siteThemeInit error (nav):', e); }
            }
        });
    },
});
