import { Express } from "express";
import UserAuthRouter from "../Routers/UserAuthRouter";
import ArtistAuthRouter from "../Routers/ArtistAuthRouter";

export default function RouterConfig(app: Express) {
  // USER ROUTES
  app.use("/auth", UserAuthRouter);
  // ARTIST ROUTES
  app.use("/artist/auth", ArtistAuthRouter);
}
