import { writeFileSync } from 'fs';
import { resolve } from 'path';

import fixedSeedData  from './fixed-seed-data.json';

function log(text: string) {
    console.log(' 🛠 ', text);
}

async function generate() {

}

// console.log(new Array(100).fill(null).map((x) => uuid()));
generate().then();
