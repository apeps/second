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
    name = "Anonymous";
    /**
     * @type {Radio}
     */
    radio = new Radio();

    constructor(ws, props = {}) {

        this.radio.renew(ws);

        this.init();

        clients.set(this.id, this);
        console.log(`New client from IP=${ props.ip }, client ID=${ this.id }`);

    }

    onExit() {

        console.log(`Client ID=${ this.id } is gone.`);
        clients.delete(this.id);
        this.radio.end();

    }

    init() {

        this.radio.listen("message", (msg) => {

            if (!msg || typeof(msg.text) === "string") {
                console.log("Error! The message is not valid.");
                return;
            }
            for (const client of clients.values()) {
                console.log(client);
                this.radio.tell("message", {
                    text: msg.text,
                    name: client.name,
                    id: client.id
                });
            }

        });

        this.radio.listen("config", (conf) => {

            if (!conf || typeof(conf.name) === "string") {
                console.log("Error! The configuration is not valid.");
                return;
            }
            this.name = conf.name;

        });

    }

}