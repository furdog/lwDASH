const serverAddress = @ENV_WS_SERVER_ADDRESS;
let serverIsOnline = false;
let socket;

socket = new WebSocket(serverAddress);

socket.onopen = function() {
	serverOnline();
	console.log("Connected to server");
};

socket.onclose = function() {
	if (serverIsOnline) serverOffline();
	console.log("Disconnected from server");
};

socket.onmessage = function(event) {
	const data = JSON.parse(event.data);
	console.log("Received message:", data[0], data[1]);
	receiveMessage(data[0], data[1]);
};

setTimeout(() => {
	if (socket.readyState !== WebSocket.OPEN)
		if (serverIsOnline) serverOffline();
}, 5000);

function sendMessage(type, message) {
	if (socket && socket.readyState === WebSocket.OPEN)
		socket.send(JSON.stringify([ type, message ]));
}

function receiveMessage(type, message) {
	console.log("receiveMessage is not implemented");
	// Implement your custom message handling logic here
}

function serverOnline() {
	console.log("serverOnline is not implemented");
	// Implement your custom message handling logic here
}

function serverOffline() {
	console.log("serverOffline is not implemented");
	// Implement your custom message handling logic here
}
