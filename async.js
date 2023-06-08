const https = require("https");
const start = Date.now();

//the networking work is done by the os itself and not by libuv or thread pool it has. Libuv just delegates the yask to os and os does the work and then notifies libuv that the work is done.

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

doRequest();
doRequest();
doRequest();
doRequest();
