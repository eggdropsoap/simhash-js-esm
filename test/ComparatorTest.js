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
        
        it('should find similarity in very similar short inputs', function() {
            const simHash = new SimHash();
            const threshold = 0.5;
            const msg = {
                a: 'test message',
                b: ' test message'
            }

            const h1 = simHash.hash(msg.a);
            const h2 = simHash.hash(msg.b);
            const comp = Comparator.similarity(h1,h2);

            assert(comp > threshold);
        });

        it('should not find similarity in very different short inputs', function() {
            const simHash = new SimHash();
            const threshold = 0.5;
            const msg = {
                a: 'test message',
                b: 'mock parrots'
            }

            const h1 = simHash.hash(msg.a);
            const h2 = simHash.hash(msg.b);
            const comp = Comparator.similarity(h1,h2);

            assert(comp < threshold);
        });

        it('should find similarity in very similar medium inputs', function() {
            const simHash = new SimHash();
            const threshold = 0.7;
            const msg = {
                a: "This is a test of the Emergency Blogcast System",
                b: "This is a second test of the Emergency Blogcast System"
            }
            const h1 = simHash.hash(msg.a);
            const h2 = simHash.hash(msg.b);
            const comp = Comparator.similarity(h1,h2);

            assert(comp > threshold);
        });

    });
});

