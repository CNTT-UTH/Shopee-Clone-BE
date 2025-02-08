import { genCodeVerify } from '../src/utils/genCode';

let cnt = 0;
for (let i = 0; i < 10000; i++) {
    const code = genCodeVerify();
    // console.log(code);
    if (code.length != 6) cnt += 1;
}

console.log(`The result: ${(cnt / 1000) * 100}%`);
