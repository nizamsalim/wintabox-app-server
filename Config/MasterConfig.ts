import { config } from "dotenv";
import connectDatabase from "./DatabaseConfig";
import initializeFirebase from "./FirebaseConfig";
import admin from "firebase-admin";

export default function MasterConfig() {
  config();
  connectDatabase(process.env.DB_URI as string);
  initializeFirebase(
    JSON.parse(
      process.env.SERVICE_ACCOUNT_SECRET_KEY as string
    ) as admin.ServiceAccount
  );
}
