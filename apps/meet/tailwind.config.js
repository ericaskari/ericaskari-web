const { createGlobPatternsForDependencies } = require('@nrwl/angular/tailwind');
const { join } = require('path');

module.exports = {
    content: [join(__dirname, 'src/**/*.{html,ts,scss}'), ...createGlobPatternsForDependencies(__dirname)],
    important: true,
    darkMode: 'class',
    theme: {}
};
