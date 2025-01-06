import assert from 'assert';
import SimHash from '../SimHash.js';

describe('SimHash', function() {
    describe('#do()', function() {
        it('generates a simhash', function() {
            const simhash = new SimHash();
            simhash.hash('test message');
        });
    });
});

