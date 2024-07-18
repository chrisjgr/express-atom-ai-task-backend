import * as express from "express";
import { config } from "firebase-functions";


const app = express();

// Middlewares

app.use(express.json());

// Routes
const apiKey = config().private?.key;
const projectId = config().project?.id;
const clientEmail = config().client?.email;

app.get("/", (req, res) => {
    console.log(`API Key: ${apiKey}`);
    console.log(`Project ID: ${projectId}`);
    console.log(`Client Email: ${clientEmail}`);
    res.status(200).send("Hey there!");
});


export { app };
