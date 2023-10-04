import express from "express";
import { Request, Response } from 'express';
import { clusterController } from "../controllers/clusterController";

const clusterRouter = express.Router();

/**
 * @route POST /cluster
 * @desc Store cluster data from a form submission.
 * @access Public (You can adjust this based on your application's authentication flow.)
 */
clusterRouter.post(
  "/", 
  clusterController.storeCluster,  
  (_req: Request, res: Response) => {
    return res.status(200).send();
  },
);

/**
 * @route GET /cluster/DB
 * @desc Retrieve cluster data to be displayed, typically triggered from the navigation bar.
 * @access Public (You can adjust this based on your application's authentication flow.)
 */
clusterRouter.get(
  "/DB", 
  clusterController.fetchCluster, 
  (_req: Request, res: Response) => {
    const { clusters } = res.locals;
    return res.status(200).json([...clusters]);
  },
);

export { clusterRouter };
