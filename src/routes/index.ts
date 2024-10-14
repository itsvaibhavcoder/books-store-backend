import express, { IRouter } from 'express';
const router = express.Router();

import userRoute from './user.route';
import cartRoutes from './cart.routes';
import wishlistRoutes from './wishlist.routes'; // Rename to be consistent
import bookRoutes from './book.routes';
import CustomerRoutes from './customer.routes'; // Notice capitalization

const routes = (): IRouter => {
  router.get('/', (req, res) => {
    res.json('Welcome Vaibhav...');
  });

  router.use('/users', new userRoute().getRoutes());
  router.use('/books', new bookRoutes().getRoutes());
  router.use('/cart', new cartRoutes().getRoutes());
  router.use('/wishlist', new wishlistRoutes().getRoutes()); 
  router.use('/customers', new CustomerRoutes().getRoutes()); 
  
  return router;
};

export default routes;
