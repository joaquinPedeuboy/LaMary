// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

import netlify from '@astrojs/netlify';

// https://astro.build/config
export default defineConfig({
    vite: {
        plugins: [tailwindcss()]
    },

    image: {
        domains: ['lamarywordpress.test', 'lightgoldenrodyellow-camel-304621.hostingersite.com']
    },

    adapter: netlify()
});