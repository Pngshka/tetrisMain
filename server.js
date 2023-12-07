/* eslint-disable no-console */
const express = require("express");
const next = require("next");
// import { readFile } from 'node:fs/promises';
const urlencodedParser = express.urlencoded({extended: false});
const bodyParser = require('body-parser')
console.log(0 / 0);
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
app
  .prepare()
  .then(() => {
    server = express();

    server.use(express.urlencoded({extended: false}));
    server.use(express.json());

    server.post('/ssdd', (req, res) => {
      // console.log(req.body)
      fs.readFile('file.txt', 'utf8', (err, data) => {
        fs.writeFile('file.txt', `${data}` + ` ${req.body.name}`, () => {
        });
      });

      res.send('Login successful');
    })

    server.get('/getResult', (req, res) => {
      fs.readFile('file.txt', 'utf8', (err, data) => {
        testFunction(data);
      });

      res.send('Login successful');
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

function testFunction(data) {
  let name=[], score=[];
  let arrayResults = data.split(/\s+|\n+/);
  for (let i = 0; i < arrayResults.length; i++) {
    i % 2 === 0 ? name.push(arrayResults[i]) : score.push(arrayResults[i]);
  }
  console.log(name + " " + score);
}
