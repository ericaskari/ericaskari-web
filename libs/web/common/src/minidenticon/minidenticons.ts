// Code is copied form https://github.com/laurentpayot/minidenticons/blob/main/minidenticons.js and modified.

// density of 4 for the lowest probability of collision
const SQUARE_DENSITY = 4;
// 18 different colors only for easy distinction
const COLORS_NB = 18;
const DEFAULT_SATURATION = 50;
const DEFAULT_LIGHTNESS = 50;

// 32 bit FNV-1a hash parameters
const FNV_PRIME = 16777619;
const OFFSET_BASIS = 2166136261;

// based on the FNV-1a hash algorithm, modified for *signed* 32 bit integers http://www.isthe.com/chongo/tech/comp/fnv/index.html
function simpleHash(str: string) {
    return (
        str
            .split('')
            // >>> 0 for 32 bit unsigned integer conversion https://2ality.com/2012/02/js-integers.html
            .reduce((hash, char) => ((hash ^ char.charCodeAt(0)) >>> 0) * FNV_PRIME, OFFSET_BASIS)
    );
}

export interface IdenticonRect {
    x: number;
    y: number;
    width: number;
    height: number;
}

export interface IdenticonBuilder {
    rects: IdenticonRect[];
    hue: number;
    saturation: number;
    lightness: number;
    fill: string;
}

export function identiconBuilder(username: string, saturation = DEFAULT_SATURATION, lightness = DEFAULT_LIGHTNESS): IdenticonBuilder {
    const hash = simpleHash(username);

    const rects: IdenticonRect[] = [...Array(username ? 25 : 0)].reduce(
        (prevValue: IdenticonRect[], _: unknown, index): IdenticonRect[] => {
            if (hash % (16 - (index % 15)) < SQUARE_DENSITY) {
                return [
                    ...prevValue,
                    {
                        x: index > 14 ? 7 - ~~(index / 5) : ~~(index / 5),
                        y: index % 5,
                        width: 1,
                        height: 1
                    }
                ];
            }
            return prevValue;
        },
        [] as IdenticonRect[]
    );

    const hue = ((hash / FNV_PRIME) % COLORS_NB) * (360 / COLORS_NB);
    return {
        rects,
        hue,
        lightness,
        saturation,
        fill: `hsl(${hue} ${saturation}% ${lightness}%)`
    };
}

// dividing hash by FNV_PRIME to get last XOR result for better color randomness (will be an integer except for empty string hash)
// 2 + ((3 * 5 - 1) - modulo) to concentrate squares at the center
// return prevValue + `<rect x="${index > 14 ? 7 - ~~(index / 5) : ~~(index / 5)}" y="${index % 5}" width="1" height="1"/>`;
// ((): IdenticonRect[] => {
//     return
//     // xmlns attribute added in case of SVG file generation https://developer.mozilla.org/en-US/docs/Web/SVG/Element/svg#sect1
//     // `<svg viewBox="-1.5 -1.5 8 8" xmlns="http://www.w3.org/2000/svg" fill="hsl(${hue} ${saturation}% ${lightness}%)">`
// }
