const { createGlobPatternsForDependencies } = require('@nrwl/angular/tailwind');
const { join } = require('path');
const mode = process.env.TAILWIND_MODE === 'watch' ? 'aot' : 'jit';

module.exports = {
    mode: mode,
    content: [join(__dirname, 'src/**/*.{html,ts}'), ...createGlobPatternsForDependencies(__dirname)],
    important: true,
    // Active dark mode on class basis
    darkMode: 'class',
    i18n: {
        locales: ['en-US'],
        defaultLocale: 'en-US',
    },
    theme: {
        extend: {
            backgroundImage: (theme) => ({
                check: "url('/icons/check.svg')",
                landscape: "url('/images/landscape/2.jpg')",
            }),
        },
    },
    variants: {
        extend: {
            backgroundColor: ['checked'],
            borderColor: ['checked'],
            inset: ['checked'],
            zIndex: ['hover', 'active'],
        },
    },
    plugins: [],
    future: {
        purgeLayersByDefault: true,
    },
};
