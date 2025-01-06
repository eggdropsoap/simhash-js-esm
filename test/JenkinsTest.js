import assert from 'assert';
import Jenkins from '../Jenkins.js';

describe('Jenkins', function() {
    describe('#hash32()', function() {
        it('generates a hash32', function() {
            const jenkins = new Jenkins();

            const inputToHash = 'test message';
            const expectedHash = '2968e1bc';

            const actualHash = jenkins.hash32(inputToHash);
            assert.equal(expectedHash,actualHash);
        });
    });

    describe('#hash64()', function() {
        it('generates a hash64', function() {
            const jenkins = new Jenkins();

            const inputToHash = 'test message';
            const expectedHash = '6ae1b89a2968e1bc';

            const actualHash = jenkins.hash64(inputToHash);
            assert.equal(expectedHash,actualHash);
        });
    });
});

