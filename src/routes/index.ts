import express, { IRouter } from 'express';
const router = express.Router();

import userRoute from './user.route';
import cartRoutes from './cart.routes';
/**
 * Function contains Application routes
 *
 * @returns router
 */
const routes = (): IRouter => {
  router.get('/', (req, res) => {
    res.json('Welcome vaibhav...');
  });
  router.use('/users', new userRoute().getRoutes());
  router.use('/cart', new cartRoutes().getRoutes());
  return router;
};

export default routes;
