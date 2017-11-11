import { Server } from "ws";
import { Radio } from "ws-radio";
import { server } from "./http.js";
import { port } from "../global/const.js";
import Client from "./Client.js";

const wss = new Server({
	server: server
});

function getIPFromConnectionProps (props) {
	return props.headers[`x-forwarded-for`] || props.connection[`remoteAddress`];
}

wss.on(`connection`, (ws, props) => {

	const client = new Client(ws, {
		ip: getIPFromConnectionProps(props)
	});

	ws.on(`close`, () => client.onExit());

});

console.log(`WebSocket server is attached to the server's port ${ port }`);
