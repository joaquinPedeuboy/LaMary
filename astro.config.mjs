// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap'

import netlify from '@astrojs/netlify';

// https://astro.build/config
export default defineConfig({
    vite: {
        plugins: [tailwindcss()]
    },

    image: {
        domains: ['lightgoldenrodyellow-camel-304621.hostingersite.com']
    },
    output: 'server',
    adapter: netlify(),
    site: 'https://www.transportelamary.com',
    integrations: [sitemap()]
});