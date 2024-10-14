import express, { IRouter } from 'express';
const router = express.Router();

import userRoute from './user.route';
import cartRoutes from './cart.routes';
import wishlist from './wishlist.routes';
import bookRoutes from './book.routes';
import OrderRoutes from './order.routes';
const routes = (): IRouter => {
  router.get('/', (req, res) => {
    res.json('Welcome vaibhav...');
  });
  router.use('/users', new userRoute().getRoutes());
  router.use('/books', new bookRoutes().getRoutes());
  router.use('/cart', new cartRoutes().getRoutes());
  router.use('/wishlist', new wishlist().getRoutes());
  router.use('/order', new OrderRoutes().getRoutes());
  return router;
};

export default routes;
