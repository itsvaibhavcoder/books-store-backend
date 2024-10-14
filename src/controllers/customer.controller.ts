import { Request, Response } from 'express';
import CustomerService from '../services/customer.services';

class CustomerController {
  private customerService = new CustomerService();

  // Get customer details
  public getCustomerDetails = async (req: Request, res: Response): Promise<Response> => {
    try {
      const customerId = req.params.id;
      const customer = await this.customerService.getCustomerDetails(customerId);
      if (!customer) {
        return res.status(404).json({ message: 'Customer not found' });
      }
      return res.status(200).json(customer);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  // Add new customer
  public addCustomer = async (req: Request, res: Response): Promise<Response> => {
    try {
      const customerData = req.body;
      const customer = await this.customerService.addCustomer(customerData);
      return res.status(201).json(customer);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  // Add address to customer
  public addAddress = async (req: Request, res: Response): Promise<Response> => {
    try {
      const customerId = req.params.id;
      const address = req.body;
      const updatedCustomer = await this.customerService.addAddress(customerId, address);
      return res.status(200).json(updatedCustomer);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
}

export default CustomerController;
