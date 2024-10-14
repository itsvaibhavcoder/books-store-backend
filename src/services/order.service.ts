import Order from '../models/order.model';  // Import the Order model
import { IOrder } from '../interfaces/order.interface';

class OrderService {
  // Service for creating an order
  public createOrder = async(userId: string, bookIds: string[], totalAmount: number): Promise<IOrder>=> {
    const newOrder = await Order.create({
      userId,
      bookIds,
      totalAmount,
    });
    return newOrder;
  }

  // Service for fetching order summary based on userId
  public getOrderSummary = async(userId: string): Promise<IOrder[] | null> =>{
    const orders = await Order.find({ userId });
    return orders;
  }
}

export default new OrderService();
