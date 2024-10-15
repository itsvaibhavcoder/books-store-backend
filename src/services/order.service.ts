import Order from '../models/order.model';
import Cart from '../models/cart.model';
import { IOrder } from '../interfaces/order.interface';
import mongoose from 'mongoose';

class OrderService {

  public createOrder = async (userId: string): Promise<IOrder> => {
    const cart = await Cart.findOne({ userId });
    if (!cart || cart.books.length === 0) {
      throw new Error('No items in cart to create order');
    }

    const newOrder = new Order({
      orderId: new mongoose.Types.ObjectId(userId),
      books: cart.books,
      totalPrice: cart.totalPrice,
      totalDiscountPrice: cart.totalDiscountPrice,
      orderStatus: true
    });

    await newOrder.save();
    cart.books = [];
    cart.totalPrice = 0;
    cart.totalDiscountPrice = 0;
    await cart.save();
    return newOrder;
  };

  public getAllOrders = async (userId: string): Promise<IOrder[]> => {
    return await Order.find({ userId });
  };
  
  public getOrderSummary = async (orderId: string): Promise<IOrder | null> => {
    const order = await Order.findOne({ orderId: orderId }).select(
      'books totalPrice totalDiscountPrice orderStatus'
    );

    if (!order) {
      throw new Error('Order not found');
    }
    return order;
  };
}

export default OrderService;
