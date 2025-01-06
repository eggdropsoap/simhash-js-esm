import assert from 'assert';
import SimHash from '../SimHash.js';

describe('SimHash', function() {
    describe('#do()', function() {
        it('generates a simhash', function() {
            const simhash = new SimHash();

            const expectedSimHash = '753cfe9e';
            const actualSimHash = simhash.hash('test message');

            assert.equal(expectedSimHash,actualSimHash);
        });
    });
});

