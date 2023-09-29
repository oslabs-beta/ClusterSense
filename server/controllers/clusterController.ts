import { NextFunction, Request, Response } from "express";
import { pool } from "../database/userDatabase";

/**
 * The clusterController handles interactions with the "cluster" table in the database,
 * allowing users to store and retrieve cluster data based on user IDs and associated ports.
 */
const clusterController = {

  /**
   * @function storeCluster
   * Store a new cluster in the database, associating it with a user ID and port number.
   * 
   * @param req - Express request object.
   * @param res - Express response object.
   * @param next - Express next middleware function.
   */
  storeCluster: async (
    req: Request, res: Response, next: NextFunction
  ): Promise<void> => {
    try {
      const { port } = req.body;
      const user_id = req.cookies.ssid;
      const checkExisting = `SELECT * FROM cluster WHERE user_id=$1 AND cluster_port=$2`;
      const existingEntry = await pool.query(checkExisting, [user_id, port]);

      // If the port number is not already associated with the user ID, insert into the database.
      if (existingEntry.rows.length === 0) {
        const queryCluster = `INSERT INTO cluster (user_id, cluster_port) VALUES ($1, $2)`;
        const clusterResult = await pool.query(queryCluster, [user_id, port]);
        res.locals.clusterResult = clusterResult;
      } else {
        res.locals.clusterResult = 'it exists';
      }

      return next();
    } catch (err) {
      return next({
        log: `Error occurred in clusterController.storeCluster: ${err}`,
        status: 500,
        message: { err: "Unable to save cluster" },
      });
    }
  },

  /**
   * @function fetchCluster
   * Retrieve all clusters associated with a given user ID.
   * 
   * @param req - Express request object.
   * @param res - Express response object.
   * @param next - Express next middleware function.
   */
  fetchCluster: async (
    req: Request, res: Response, next: NextFunction
  ): Promise<void> => {
    try {
      const user_id = req.cookies.ssid;
      const queryClusters = `SELECT cluster_port FROM "cluster" WHERE user_id = $1`;
      const clusterResult = await pool.query(queryClusters, [user_id]);

      res.locals.clusters = clusterResult.rows;
      return next();
    } catch (err) {
      return next({
        log: `Error occurred in clusterController.fetchCluster: ${err}`,
        status: 500,
        message: { err: "Unable to fetch clusters" },
      });
    }
  },
}

export { clusterController };
