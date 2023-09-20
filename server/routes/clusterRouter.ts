import express from "express";
import { Request, Response } from 'express';
import { clusterController } from "../controllers/clusterController";
const clusterRouter = express.Router();

//post request from form
clusterRouter.post("/", clusterController.storeCluster, 
  (_req: Request, res: Response) => {
    return res.status(200).send();
  },
);

//get request from navBar
clusterRouter.get("/DB", clusterController.fetchCluster,
  (_req: Request, res: Response) => {
    const { clusters } = res.locals;
    return res.status(200).json([...clusters]);
  },
);
export { clusterRouter };