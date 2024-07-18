import { config } from "firebase-functions";


const projectId = config().project?.id;
const clientEmail = config().client?.email;
const privateKey = config().private?.key;


const serviceAccount = {
    projectId,
    clientEmail,
    privateKey,
};

export { serviceAccount };
