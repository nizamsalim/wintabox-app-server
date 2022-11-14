import { config } from "dotenv";
import connectDatabase from "./DatabaseConfig";
import initializeFirebase from "./FirebaseConfig";

export default function MasterConfig() {
  config();
  connectDatabase(process.env.DB_URI as string);
  initializeFirebase();
}
