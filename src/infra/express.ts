import express, { Express } from "express";
import clientRouter from "./api/client";
import setupDb from "../config/db.setup";

export const app: Express = express();
app.use(express.json());
app.use("/client", clientRouter)


setupDb();


