function fibonacci(n) {
	return n < 1 ? 0 : n <= 2 ? 1 : fibonacci(n - 1) + fibonacci(n - 2);
}

const doFibonacci = (number) =>
	new Promise((resolve, reject) => {
		const start = Date.now();
		const result = fibonacci(number);
		console.log("Do fibonacci took: ", Date.now() - start, "ms");
		resolve(result);
	});

const main = async () => {
	const start = Date.now();

	const values = await Promise.all([
		doFibonacci(40),
		doFibonacci(40),
		doFibonacci(40),
		doFibonacci(40),
		doFibonacci(40),
		doFibonacci(40),
		doFibonacci(40),
	]);

	console.log("values", values);

	console.log("All values took: ", Date.now() - start, "ms");
};

main().catch(console.error);
