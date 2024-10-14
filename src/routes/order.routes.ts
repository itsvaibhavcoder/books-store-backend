import express, { IRouter } from 'express';
import { userAuth } from '../middlewares/auth.middleware';
import OrderController from '../controllers/order.controller';

class OrderRoutes {
  private router = express.Router();
  private orderController = new OrderController();

  constructor() {
    this.routes();
  }

  private routes = () => {
    this.router.post('/create', userAuth, this.orderController.createOrder);
    this.router.get('/summary', userAuth, this.orderController.getOrderSummary);
  };

  public getRoutes = (): IRouter => {
    return this.router;
  };
}

export default OrderRoutes;
