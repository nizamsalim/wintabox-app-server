import express, { Express, json as expressJson } from "express";
import cors from "cors";

import MasterConfig from "./Config/MasterConfig";
import RouterConfig from "./Config/RouterConfig";

const app: Express = express();
app.use(expressJson());
app.use(cors());

const PORT: string = process.env.PORT as string;

MasterConfig();
RouterConfig(app);

app.get("/", (req, res) => {
  res.send("server running");
});

app.listen(PORT, () => {
  console.log("[server]");
});
