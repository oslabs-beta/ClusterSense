import { NextFunction, Request, Response } from "express";
import { pool } from "../database/userDatabase";

/*
CREATE TABLE cluster(
  id SERIAL PRIMARY KEY,
  user_id SERIAL REFERENCES users(user_id),
  cluster_port INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
*/

// takes SSID and uses that ID and port to add to database
const clusterController = {
        storeCluster: async (
          req: Request,
          res: Response,
          next: NextFunction,
        ): Promise<void> => {
          try {
              // need to take port # from req and user ID from cookies and log it into the DB
              const {cluster_port} = req.body;
              const user_id = req.cookies.user_id;
              const queryCluster = `INSERT INTO cluster (user_id, cluster_port) VALUES ($1, $2)`;
              const clusterResult = await pool.query(queryCluster, [user_id, cluster_port]);
              // add prometheus fork request if necessary
              res.locals.clusterResult = clusterResult
              next();
          } catch (err) {
            return next({
              log: `Error occurred in clusterController.startSession ${err}`,
              status: 500,
              message: { err: "Unable to save cluster" },
            });
          }
        },
        fetchCluster: async (
            req: Request,
            res: Response,
            next: NextFunction,
          ): Promise<void> => {
            try {
                // need to fetch all clusters from DB associated with userID on cookies and return in res.locals
                const user_id = req.cookies.user_id;
                const queryClusters = `SELECT cluster_port FROM "cluster" WHERE user_id = $1`;
                const clusterResult = await pool.query(queryClusters, [user_id]);
                console.log(clusterResult)
                //want it as an array of cluster numbers
                const result = clusterResult.rows.map(row => row.cluster_port);
                //add all clusters onto res.locals.clusters
                res.locals.clusters = result;
            } catch (err) {
              return next({
                log: `Error occurred in clusterController.startSession ${err}`,
                status: 500,
                message: { err: "Unable to save cluster" },
              });
            }
          },
    }

export { clusterController };