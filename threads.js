process.env.UV_THREADPOOL_SIZE = 2; //default is 4
const crypto = require("crypto");
const start = Date.now();

/* 1st benchmark 620ms
crypto.pbkdf2("secret", "salt", 100000, 512, "sha512", () => {
	console.log("1: ", Date.now() - start, "ms");
});
*/

/* 2nd benchmark 720ms 770ms 800ms 830ms 1200ms 1250ms

*/
crypto.pbkdf2("secret", "salt", 100000, 512, "sha512", () => {
	console.log("1: ", Date.now() - start, "ms");
});

crypto.pbkdf2("secret", "salt", 100000, 512, "sha512", () => {
	console.log("2: ", Date.now() - start, "ms");
});

crypto.pbkdf2("secret", "salt", 100000, 512, "sha512", () => {
	console.log("3: ", Date.now() - start, "ms");
});

crypto.pbkdf2("secret", "salt", 100000, 512, "sha512", () => {
	console.log("4: ", Date.now() - start, "ms");
});

crypto.pbkdf2("secret", "salt", 100000, 512, "sha512", () => {
	console.log("5: ", Date.now() - start, "ms");
});
crypto.pbkdf2("secret", "salt", 100000, 512, "sha512", () => {
	console.log("6: ", Date.now() - start, "ms");
});
crypto.pbkdf2("secret", "salt", 100000, 512, "sha512", () => {
	console.log("7: ", Date.now() - start, "ms");
});
crypto.pbkdf2("secret", "salt", 100000, 512, "sha512", () => {
	console.log("8: ", Date.now() - start, "ms");
});
crypto.pbkdf2("secret", "salt", 100000, 512, "sha512", () => {
	console.log("9: ", Date.now() - start, "ms");
});
crypto.pbkdf2("secret", "salt", 100000, 512, "sha512", () => {
	console.log("10: ", Date.now() - start, "ms");
});
crypto.pbkdf2("secret", "salt", 100000, 512, "sha512", () => {
	console.log("11: ", Date.now() - start, "ms");
});
crypto.pbkdf2("secret", "salt", 100000, 512, "sha512", () => {
	console.log("12: ", Date.now() - start, "ms");
});
crypto.pbkdf2("secret", "salt", 100000, 512, "sha512", () => {
	console.log("13: ", Date.now() - start, "ms");
});

//Start time is not modified anywhere so every function gives exact time it took
// all the functions are invoked at same time (almost)

//Interesting thing is approxly 4 logs have almost same time while 2 have double of that time so it suggests that 4 threads are working in parallel while 2 are working in background and are not able to get resources to work in parallel.
// i.e libuv by default has a thread pool of 4 threads so 4 threads are working in parallel while 2 are waiting for resources to be free so that they can work in parallel too.

//now sinze hyperv is enabled so each core can have 2 threads but increasing threads doesn't increase performance as it is limited by the hardware but rather it decreases performance as more threads are created and more time is spent in context switching. But it allows us to do more things at same time.(concurrency)

//now lets increase the threads to 12 since i have 6 cores and each core can have 2 threads so 12 threads can work in parallel
//now we see that if we have 13 process then 12 processes are taken by the threads but now my each core has to work twice which reduces it's efficiency that's why we see that time taken by each process is more than double of the previous one. And the 13th process is waiting for resources to be free so that it can be executed after them and it take 600ms only but it has to wait for 1200s initially for the resources to be free.
