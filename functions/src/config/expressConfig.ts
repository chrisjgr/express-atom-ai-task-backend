import express from "express";
import { AppRouter } from "../router";
import cors from "cors";


const app = express();

// Middlewares

app.use(express.json());

// Routes

app.get("/", (req, res) => {
    res.status(200).send("Hey there!");
});

app.use(cors({
    origin: true,
}));

// * Adding routes
app.use(AppRouter.routes);

export { app };
