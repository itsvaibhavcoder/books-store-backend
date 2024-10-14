
// import { Request, Response } from 'express';
// import OrderService from '../services/order.service';

// class OrderController {
//   // Create a new order
//   public createOrder = async (req: Request, res: Response): Promise<Response> => {
//     try {
//       const { userId, paymentMethod, addressId } = req.body;
//       const order = await OrderService.createOrder(userId, paymentMethod, addressId);
//       return res.status(201).json({ message: 'Order created successfully', order });
//     } catch (error: any) {
//       return res.status(400).json({ message: error.message });
//     }
//   };

//   // Get order by ID
//   public getOrderById = async (req: Request, res: Response): Promise<Response> => {
//     try {
//       const { orderId } = req.params;
//       const order = await OrderService.getOrderById(orderId);
//       return res.status(200).json({ order });
//     } catch (error: any) {
//       return res.status(404).json({ message: error.message });
//     }
//   };

//   // Get all orders for a user
//   public getOrdersByUser = async (req: Request, res: Response): Promise<Response> => {
//     try {
//       const { userId } = req.params;
//       const orders = await OrderService.getOrdersByUser(userId);
//       return res.status(200).json({ orders });
//     } catch (error: any) {
//       return res.status(404).json({ message: error.message });
//     }
//   };

//   // Update order status
//   public updateOrderStatus = async (req: Request, res: Response): Promise<Response> => {
//     try {
//       const { orderId } = req.params;
//       const { status } = req.body;
//       const order = await OrderService.updateOrderStatus(orderId, status);
//       return res.status(200).json({ message: 'Order status updated successfully', order });
//     } catch (error: any) {
//       return res.status(404).json({ message: error.message });
//     }
//   };

//   // Delete an order
//   public deleteOrder = async (req: Request, res: Response): Promise<Response> => {
//     try {
//       const { orderId } = req.params;
//       await OrderService.deleteOrder(orderId);
//       return res.status(200).json({ message: 'Order deleted successfully' });
//     } catch (error: any) {
//       return res.status(404).json({ message: error.message });
//     }
//   };
// }

// export default OrderController;
