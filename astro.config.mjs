import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

const base = process.env.BASE_PATH || '';

export default defineConfig({
  site: 'https://svazqz.github.io',
  base: base,
  integrations: [
    starlight({
      title: 'Zenthyr Docs',
      social: [
        {
          label: 'GitHub',
          href: 'https://github.com/yourusername/zenthyr',
          icon: 'github',
        },
      ],
      sidebar: [
        {
          label: 'Getting Started',
          items: [
            { label: 'Introduction', link: '/introduction' },
            { label: 'Getting Started', link: '/guides/getting-started' },
            { label: 'Architecture', link: '/guides/architecture' },
            { label: 'Frontend Development', link: '/guides/frontend' },
            { label: 'Backend Development', link: '/guides/backend' },
          ],
        },
      ],
    }),
    react(),
    tailwind(),
  ],
});