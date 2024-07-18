import { https } from "firebase-functions";
import { app } from "./config";

// Exporting the application
exports.app = https.onRequest(app);

