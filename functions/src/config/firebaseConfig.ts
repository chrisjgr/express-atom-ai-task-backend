import * as admin from "firebase-admin";
import { envs } from "./envs";

admin.initializeApp({
    credential: admin.credential.cert(
        envs.firebase as admin.ServiceAccount
    ),
});

const db = admin.firestore();
export { admin, db };
