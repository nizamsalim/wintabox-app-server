import express, { Express, json as expressJson } from "express";
import cors from "cors";
import AuthRouter from "./Routers/AuthRouter";
import MasterConfig from "./Config/MasterConfig";

// configurations
MasterConfig();
// constants
const app: Express = express();
const PORT: string = process.env.PORT as string;

app.use(expressJson());
app.use(cors());
app.use("/auth", AuthRouter);

app.get("/", (req, res) => {
  res.send("server running");
});

app.listen(PORT, () => {
  console.log("[server]");
});
