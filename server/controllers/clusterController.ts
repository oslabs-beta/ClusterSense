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
              const {port} = req.body;
              const user_id = req.cookies.ssid;
              const checkExisting = `SELECT * FROM cluster WHERE user_id=$1 AND cluster_port=$2`;
              const existingEntry = await pool.query(checkExisting, [user_id, port]);
              // if port num from user input is not in the db
              if (existingEntry.rows.length === 0) {
                const queryCluster = `INSERT INTO cluster (user_id, cluster_port) VALUES ($1, $2)`;
                const clusterResult = await pool.query(queryCluster, [user_id, port]);
                // add prometheus fork request if necessary
                res.locals.clusterResult = clusterResult
                return next();
                // if port num is already in the db, return the current port numbers from database back to the frontend
              } else {
                // const clusterResult = await pool.query(queryCluster, [user_id, port]);
                // res.locals.clusterResult = clusterResult
                // return next();
              }
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
                const user_id = req.cookies.ssid;
                const queryClusters = `SELECT cluster_port FROM "cluster" WHERE user_id = $1`;
                const clusterResult = await pool.query(queryClusters, [user_id]);
                //want it as an array of cluster numbers
                 const result = clusterResult.rows
                 //.map(row => row.cluster_port);
                // console.log(result)
                //add all clusters onto res.locals.clusters
                // [ { cluster_port: 1010 }, { cluster_port: 2020 } ]
                // [ { value: 1010, label: 1010 }, { value: 2020, label: 2020 } ] 

                res.locals.clusters = result;
                return next();
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