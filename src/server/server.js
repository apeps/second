import serve from "koa-static";
import Koa from "koa";
import { port } from "../global/const.js";

const app = new Koa();

app.use(serve(__dirname + "/../client"));

app.listen(port);

console.log(`Server listening on port ${ port }.`);