/**
 * Simhash class. Creates a 32-bit simhash.
 *
 * // Usage: 
 * const hash = Simhash.of("This is a test");
 *
 * // Override default values
 * const simhash = new Simhash();
 * const hash = simhash.of("This is a test", {
 *      kshingles: 2,
 *      maxFeatures: 32    
 * });
 */

import { Jenkins } from './Jenkins.js';

export class SimHash {

    constructor(options) {
        /**
         * By default, we tokenize input into chunks of this size.
         */
        this.kshingles = typeof(options) != 'undefined' && typeof(options['kshingles']) != 'undefined' ? options['kshingles'] : 4;

        /**
         * By default, this many number of minimum shingles will 
         * be combined to create the final hash.
         */
        this.maxFeatures = typeof(options) != 'undefined' && typeof(options['maxFeatures']) != 'undefined' ? options['maxFeatures'] : 128;
    }

    // --------------------------------------------------
    // Public access
    // --------------------------------------------------

    /**
     * Driver function.
     */
    hash(input) {
        const tokens = tokenize.call(this,input);
        const shingles = [];
        const jenkins = new Jenkins();
        for (let i in tokens) {
            shingles.push(jenkins.hash64(tokens[i]));
        }
        let simhash = combineShingles.call(this,shingles);
        simhash >>>= 0;
        return simhash.toString(16);
    };

};

// --------------------------------------------------
// Private methods
// --------------------------------------------------

/**
 * TODO: Make this private or take closure that implements 
 * logic to combine shingles.
 */
function combineShingles(shingles) {
    if (shingles.length == 0) return;

    if (shingles.length == 1) return shingles[0];

    shingles.sort(hashComparator);
    if (shingles.length > this.maxFeatures) shingles = shingles.splice(this.maxFeatures);

    let simhash = 0x0;
    let mask = 0x1;
    for (let pos = 0; pos < 32; pos++) {
        let weight = 0;
        for (let i in shingles) {
            const shingle = parseInt(shingles[i], 16);
            weight += !(~shingle & mask) == 1 ? 1 : -1;
        }
        if (weight > 0) simhash |= mask;
        mask <<= 1;
    }

    return simhash;
};

/**
 * Tokenizes input into 'kshingles' number of tokens.
 */
function tokenize(original) {
    const size = original.length;
    if (size <= this.kshingles) {
        return [original.substr(0)];
    }

    const shingles = [];
    for (let i = 0; i < size; i = i + this.kshingles) {
        shingles.push(i + this.kshingles < size ? original.slice(i, i + this.kshingles) : original.slice(i));
    }
    return shingles;
};

/**
 * Calculates binary hamming distance of two base 16 integers.
 */
function hammingDistanceSlow(x, y) {
    let distance = 0;
    let val = parseInt(x, 16) ^ parseInt(y, 16);
    while (val) {
        ++distance;
        val &= val - 1;
    }
    return distance;
};

/**
 * TODO: Use a priority queue. Till then this comparator is 
 * used to find the least 'maxFeatures' shingles.
 */
function hashComparator(a, b) {
    return a < b ? -1 : (a > b ? 1 : 0);
};

export default SimHash;
