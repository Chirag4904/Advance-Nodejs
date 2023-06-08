const https = require("https");
const crypto = require("crypto");
const fs = require("fs");

const start = Date.now();

function doRequest() {
	https
		.request("https://www.google.com", (res) => {
			res.on("data", () => {});
			res.on("end", () => {
				console.log(Date.now() - start);
			});
		})
		.end();
}

function doHashing() {
	crypto.pbkdf2("secret", "salt", 100000, 512, "sha512", () => {
		console.log("Hash: ", Date.now() - start, "ms");
	});
}

doRequest();

fs.readFile("multitask.js", "utf8", () => {
	console.log("FS: ", Date.now() - start, "ms");
});

doHashing();
doHashing();
doHashing();
doHashing();

//IF thread pool has 4 threads then output will be:
// 300ms for http request
// 800ms for hashing
// 801m for FS
// 820ms for hashing
// 828ms for hashing
// 836ms for hashing

//THE fs is very fast but it still takes so much time due to context switching.
//Lets see what happens internally:
// 1. The http request is made and it is delegated to os and os does the work and then notifies libuv that the work is done.
// the req is not concerned with thread pool and is asynchronously executed.
//2. fs is called and assigned 1 thread and after that 3 threads are assigned to hashing.
// at this point of time 1 hash function is left to be executed.
//3. there is a pause in fs where node take stats from HD and while the thread is waiting it switches context and takes in the pending task of hashing and starts executing it and this is a continous task so it keeps on executing and the fs task is left behind.
// 4. As soon as any one thread completes it's execution of hashing it takes the fs task and starts executing it and then the fs task is completed and then one by one all hashing tasks are completed.
