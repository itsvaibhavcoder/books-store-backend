// import express, { IRouter } from 'express';
// import { userAuth } from '../middlewares/auth.middleware';
// import OrderController from '../controllers/order.controller';

// class OrderRoutes {
//   private router = express.Router();
//   private orderController = new OrderController();

//   constructor() {
//     this.routes();
//   }

//   private routes = () => {
//     this.router.post('/create', userAuth, this.orderController.createOrder);
//     this.router.get('/summary', userAuth, this.orderController.getOrderSummary);
//   };

//   public getRoutes = (): IRouter => {
//     return this.router;
//   };
// }

// export default OrderRoutes;


// // src/routes/order.routes.ts

// import express from 'express';
// import OrderController from '../controllers/order.controller';
// import { userAuth } from '../middlewares/auth.middleware';

// const router = express.Router();
// const orderController = new OrderController();

// router.post('/orders', userAuth, orderController.createOrder);
// router.get('/orders/:orderId', userAuth, orderController.getOrderById);
// router.get('/orders/user/:userId', userAuth, orderController.getOrdersByUser);
// router.patch('/orders/:orderId', userAuth, orderController.updateOrderStatus);
// router.delete('/orders/:orderId', userAuth, orderController.deleteOrder);

// export default router;
