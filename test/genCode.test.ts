import { genCodeVerify } from '../src/utils/genCode';

for (let i = 0; i < 100; i++) {
    describe('gen code util', () => {
        test('verify code length is 6', () => {
            expect(genCodeVerify()).toHaveLength(6);
        });
    });
}
