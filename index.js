const cluster = require("cluster");

// is this file being executed in master mode or not

if (cluster.isMaster) {
	//if it is in master mode then execute index.js again in child/slave mode
	cluster.fork();

	// cluster.fork();
} else {
	// This is child code and this will be the server
	const express = require("express");
	const app = express();

	function someWork(duration) {
		const start = Date.now();
		while (Date.now() - start < duration) {
			//do nothing
		}
	}

	app.get("/", (req, res) => {
		someWork(5000); // this will block the event loop for 5 seconds and no other req will be served in this time.
		res.send("Hello mate");
	});

	app.get("/fast", (req, res) => {
		res.send("This was fast");
	});

	app.listen(3000, () => {
		console.log("Listening on port 3000");
	});
}
