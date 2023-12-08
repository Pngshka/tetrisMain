/* eslint-disable no-console */
const express = require("express");
const next = require("next");
const {project_id: projectId} = require("./package");
const fs = require('fs');

const devProxy = {
    "/api": {
        target: `https://${projectId}.dev.peppers-studio.ru/`,
        changeOrigin: true,
    },
};

const port = parseInt(process.env.PORT, 10) || 3000;
const env = process.env.NODE_ENV;
const dev = env !== "production";
const app = next({
    dir: ".", // base directory where everything is, could move to src later
    dev,
});
const handle = app.getRequestHandler();
let server;

const results = require("./dataResult")

app
    .prepare()
    .then(() => {
        server = express();

        server.use(express.urlencoded({extended: false}));
        server.use(express.json());

        //fs promis
        //todo: 200 записей
        //перезапись имени
        //slice (один из методов билдера)
        //впихнуть в санки
        server.post('/setResult', (req, res) => {
            fs.readFile('file.txt', 'utf8', (err, data) => {

                let dataResult = results.setArrayResults( JSON.parse(data), {name: req.body.name, score: req.body.score});

                fs.writeFile('file.txt', `${JSON.stringify(dataResult)}`,
                    () => {});
                res.send("successful");
            });
        })

        server.get('/getResult', (req, res) => {
            fs.readFile('file.txt', 'utf8', (err, data) => {
                // console.log(data)
                res.send(results.getList(JSON.parse(data)));
            });
        })

        // Set up the proxy.
        if (dev && devProxy) {
            const {createProxyMiddleware} = require("http-proxy-middleware");
            Object.keys(devProxy).forEach(function (context) {
                server.use(createProxyMiddleware(context, devProxy[context]));
            });
        }

        // Default catch-all handler to allow Next.js to handle all other routes
        server.all("*", (req, res) => handle(req, res));

        server.listen(port, (err) => {
            if (err) {
                throw err;
            }
            console.log(`> Ready on port ${port} [${env}]`);
        });


    })
    .catch((err) => {
        console.log("An error occurred, unable to start the server");
        console.log(err);
    });
