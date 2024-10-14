// import Order from '../models/order.model';
// import Cart from '../models/cart.model';
// import User from '../models/user.model';
// import { IOrder } from '../interfaces/order.interface';
// import { Request, Response } from 'express';

// class OrderService {
//   // Create a new order
//   public async createOrder(userId: string, paymentMethod: string, addressId?: string): Promise<IOrder> {
//     const cart = await Cart.findOne({ userId });
//     if (!cart || cart.books.length === 0) {
//       throw new Error('No items in the cart to create an order');
//     }

//     const user = await User.findById(userId);
//     if (!user) {
//       throw new Error('User not found');
//     }

//     let shippingAddress;
//     if (addressId) {
//       shippingAddress = user.addresses.find(address => address._id.toString() === addressId);
//       if (!shippingAddress) {
//         throw new Error('Invalid address');
//       }
//     } else {
//       shippingAddress = user.addresses.find(address => address.isDefault);
//       if (!shippingAddress) {
//         throw new Error('No default address found');
//       }
//     }

//     const newOrder = new Order({
//       userId,
//       books: cart.books,
//       totalPrice: cart.totalPrice,
//       totalDiscountPrice: cart.totalDiscountPrice,
//       shippingAddress,
//       paymentMethod,
//       status: 'pending',
//     });

//     await newOrder.save();

//     // Clear the cart after order creation
//     cart.books = [];
//     cart.totalPrice = 0;
//     cart.totalDiscountPrice = 0;
//     await cart.save();

//     return newOrder;
//   }

//   // Get order by ID
//   public async getOrderById(orderId: string): Promise<IOrder | null> {
//     const order = await Order.findById(orderId);
//     if (!order) {
//       throw new Error('Order not found');
//     }
//     return order;
//   }

//   // Get all orders for a user
//   public async getOrdersByUser(userId: string): Promise<IOrder[]> {
//     const orders = await Order.find({ userId });
//     if (orders.length === 0) {
//       throw new Error('No orders found for this user');
//     }
//     return orders;
//   }

//   // Update order status
//   public async updateOrderStatus(orderId: string, status: 'pending' | 'shipped' | 'delivered' | 'cancelled'): Promise<IOrder> {
//     const order = await Order.findById(orderId);
//     if (!order) {
//       throw new Error('Order not found');
//     }

//     order.status = status;
//     await order.save();

//     return order;
//   }

//   // Delete an order
//   public async deleteOrder(orderId: string): Promise<void> {
//     const order = await Order.findByIdAndDelete(orderId);
//     if (!order) {
//       throw new Error('Order not found');
//     }
//   }
// }

// export default new OrderService();
