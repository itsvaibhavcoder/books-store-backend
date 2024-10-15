import { Request, Response, NextFunction } from 'express';
import OrderService from '../services/order.service';

class OrderController {
  private orderService = new OrderService();

  public createOrder = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { userId } = req.body;
      const data = await this.orderService.createOrder(userId);
      return res.status(201).json({
        code: 201,
        message: 'Order created successfully',
        data
      });
    } catch (error) {
      next(error);
    }
  };

  public getAllOrders = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { userId } = req.body;
      const data = await this.orderService.getAllOrders(userId);
      return res.status(200).json({
        code: 200,
        data,
        message: 'Orders retrieved successfully'
      });
    } 
    catch (error) {
      next(error);
    }
  };


  public getOrderSummary = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const  orderId  = req.params.id; 
      const data = await this.orderService.getOrderSummary(orderId); 

      return res.status(200).json({
        code: 200,
        data,
        message: 'Order summary retrieved successfully'
      });
    } catch (error) {
      next(error);
    }
  };
}

export default OrderController;
