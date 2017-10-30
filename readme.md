# Web Chat

By a group of enthusiasts.

Development environment setup
-----------------------------

You will need NodeJS v8 to be able to run this project. Prepare:

``` bash
git clone <proj>
cd <proj>
npm install
```

Now run the following depending on what you need:

+ `npm run client-dev`: run client development configuration with hot reload. You will need to run server separately, see below.
+ `npm run build-and-start`: run full production build and start the server.
+ `npm run server-build-and-start`: build and run server only.

Directories and Their Purpose
-----------------------------

```txt
/src
  /client - handles all client files like Vue templates, images, etc.
    /index.js - client's main entry point (do not rename)
    /index.html - HTML index file (do not rename)
    /.babelrc - Babel transpiler options, used to transpile ES6 to ES5
  /server - handles all server files (Server-side JavaScript).
    /index.js - server's main entry point (do not rename)
  /global - includes reusable javascript, which can be both included from server or client.
    /const.js - file with constants used both on server and client sides
```

Workflow
--------

Server: do changes -> `npm run build-and-start` -> test

Client: `npm run server-build-and-start` -> `npm run client-dev` -> do changes -> test 