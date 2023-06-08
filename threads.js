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

//Start time is not modified anywhere so every function gives exact time it took
// all the functions are invoked at same time (almost)

//Interesting thing is approxly 4 logs have almost same time while 2 have double of that time so it suggests that 4 threads are working in parallel while 2 are working in background and are not able to get resources to work in parallel.
// i.e libuv by default has a thread pool of 4 threads so 4 threads are working in parallel while 2 are waiting for resources to be free so that they can work in parallel too.
