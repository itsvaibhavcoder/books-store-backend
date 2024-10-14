import { Request, Response } from 'express';
import HttpStatus from 'http-status-codes';
import OrderService from '../services/order.service';  

class OrderController {
  public getOrderSummary = async (req: Request, res: Response): Promise<Response> => {
    const { userId } = req.body;

    try {
      const orders = await OrderService.getOrderSummary(userId);
      if (!orders) {
        return res.status(HttpStatus.NOT_FOUND).json({
          code: HttpStatus.NOT_FOUND,
          message: 'No orders found for this user',
        });
      }

      return res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: orders,
        message: 'Order summary retrieved successfully',
      });
    } 
    catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'An error occurred while fetching order summary',
      });
    }
  };

public createOrder = async (req: Request, res: Response): Promise<Response> => {
    const { userId, bookIds, totalAmount } = req.body;

    try {
      const newOrder = await OrderService.createOrder(userId, bookIds, totalAmount);
      return res.status(HttpStatus.CREATED).json({
        code: HttpStatus.CREATED,
        data: newOrder,
        message: 'Order created successfully',
      });
    } 
    catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'An error occurred while creating the order',
      });
    }
  };
}

export default OrderController;
