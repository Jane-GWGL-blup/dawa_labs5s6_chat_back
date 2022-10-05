import { Router } from "express";
import * as Controller from "./controller";

const userRouter = Router();
//Modified: Agregamos el parametro id
userRouter.get("/:id", Controller.findAll)
//
userRouter.post("/", Controller.store)

export default userRouter;