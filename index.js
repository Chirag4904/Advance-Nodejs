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

app.listen(3000, () => {
	console.log("Listening on port 3000");
});
