import crypto from "crypto";
import Radio from "ws-radio";

/**
 * All connected clients, id => client instance
 * @type {Map}
 */
const clients = new Map();

const generateClientId = () => crypto.randomBytes(16).toString("hex");

export default class Client {

	id = generateClientId();
	radio = new Radio();

	constructor (ws, props = {}) {

		this.radio.renew(ws);

		// bind radio callbacks here

		clients.set(this.id, this);
		console.log(`New client from IP=${ props.ip }, client ID=${ this.id }`);

	}

	onExit () {

		console.log(`Client ID=${ this.id } is gone.`);
		clients.delete(this.id);
		this.radio.end();

	}

}