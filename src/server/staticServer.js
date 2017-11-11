import serve from "koa-static";
import Koa from "koa";
import { server } from "./http.js";
import { port } from "../global/const.js";

const app = new Koa();

app.use(serve(__dirname + "/../client"));

server.on(`request`, app.callback());

server.listen(port);

console.log(`Static server listening on port ${ port }.`);
