import { config } from "firebase-functions";

// * Firebase Secrets
const projectId = config().project?.id;
const clientEmail = config().client?.email;
const privateKey = config().private?.key;

// * jwt
const JWT_SEED = config().jwt?.seed;

// * Exporting envs
const envs = {
    firebase: {
        projectId,
        clientEmail,
        privateKey,
    },
    JWT_SEED,
};

export { envs };
