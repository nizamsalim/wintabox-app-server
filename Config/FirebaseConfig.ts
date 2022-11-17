import admin from "firebase-admin";

export default function initializeFirebase(
  serviceAccount: admin.ServiceAccount
) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}
