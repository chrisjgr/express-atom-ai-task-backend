import * as functions from "firebase-functions";
import * as express from "express";

const app = express();

const apiKey = functions.config().private?.key;
const projectId = functions.config().project?.id;
const clientEmail = functions.config().client?.email;

app.get("/", (req, res) => {
    console.log(`API Key: ${apiKey}`);
    console.log(`Project ID: ${projectId}`);
    console.log(`Client Email: ${clientEmail}`);
    res.status(200).send("Hey there!");
});
exports.app = functions.https.onRequest(app);
