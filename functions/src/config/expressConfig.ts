import express from "express";
import { AppRouter } from "../router";


const app = express();

// Middlewares

app.use(express.json());

// Routes

app.get("/", (req, res) => {
    res.status(200).send("Hey there!");
});

// * Adding routes
app.use(AppRouter.routes);

export { app };
