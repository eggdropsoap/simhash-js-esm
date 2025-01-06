import assert from 'assert';
import Jenkins from '../Jenkins.js';

describe('Jenkins', function() {
    describe('#hash32()', function() {
        it('generates a hash32', function() {
            const jenkins = new Jenkins();
            jenkins.hash32('test message');
        });
    });

    describe('#hash64()', function() {
        it('generates a hash64', function() {
            const jenkins = new Jenkins();
            jenkins.hash64('test message');
            
        });
    });
});

