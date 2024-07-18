import * as admin from "firebase-admin";
import { serviceAccountCredentials } from "./serviceAccountCredentials";

admin.initializeApp({
    credential: admin.credential.cert(
        serviceAccountCredentials as admin.ServiceAccount
    ),
});

const db = admin.firestore();
export { admin, db };
