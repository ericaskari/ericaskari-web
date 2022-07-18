const { createGlobPatternsForDependencies } = require('@nrwl/angular/tailwind');
const { join } = require('path');

module.exports = {
    mode: 'jit',
    content: [join(__dirname, 'src/**/*.{html,ts,scss}'), ...createGlobPatternsForDependencies(__dirname)],
    important: true,
    darkMode: 'class',
    theme: {
        extend: {
            backgroundImage: (theme) => ({
                'github-dark': "url('/assets/socials/GitHub-Mark-120px-plus.png')",
                'github-light': "url('/assets/socials/GitHub-Mark-Light-120px-plus.png')",
                linkedin: "url('/assets/socials/linkedin.png')",
                profile: "url('/assets/cv/300x320.jpeg')",
                'home-icon': "url('/assets/icons/home.png')",
                'flag-afghanistan': "url('/assets/flags/afghanistan.png')",
                'flag-england': "url('/assets/flags/england.png')",
                'flag-finland': "url('/assets/flags/finland.png')",
                'flag-iran': "url('/assets/flags/iran.png')"
            })
        }
    }
};
