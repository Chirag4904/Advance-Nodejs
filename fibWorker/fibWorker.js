const { Worker } = require("worker_threads");

const doFibonacci = async (number) => {
	return new Promise((resolve, reject) => {
		const start = Date.now();

		//starting worker
		const worker = new Worker("./fibWorker/worker.js", {
			workerData: { number },
		});

		//listening for message from worker
		worker.once("message", (data) => {
			console.log(`worker [${worker.threadId}] took ${Date.now() - start} ms`);
			resolve(data);
		});

		//listening for error
		worker.once("error", (err) => reject(err));
	});
};

const main = async () => {
	try {
		const start = Date.now();
		const values = await Promise.all([
			doFibonacci(40),
			// doFibonacci(40),
			// doFibonacci(40),
			// doFibonacci(40),
			// doFibonacci(40),
			// doFibonacci(40),
			// doFibonacci(40),
			// doFibonacci(40),
			// doFibonacci(40),
		]);

		console.log("values", values);
		console.log("Everything took: ", Date.now() - start, "ms"); //takes 1200ms which means that all of these were parallel
	} catch (err) {
		console.log(err);
	}
};

main();
