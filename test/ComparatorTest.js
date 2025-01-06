import assert from 'assert';
import Comparator from '../Comparator.js';
import SimHash from '../SimHash.js';

describe('Comparator', function() {
    describe('#similarity()', function() {
        it('should find similarity in identical simhashes', function() {
            const simHash = new SimHash();
            const h1 = simHash.hash('test message');
            const h2 = simHash.hash('test message');
            const comp = Comparator.similarity(h1,h2);
            assert.equal(1,comp);
        });
    });
});

