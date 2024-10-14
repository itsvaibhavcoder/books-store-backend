import Customer from '../models/customer.model';
import { ICustomer } from '../interfaces/customerdetails.interface';

class CustomerService {
  // Fetch customer details
  public getCustomerDetails = async (customerId: string): Promise<ICustomer | null> => {
    return await Customer.findById(customerId)
  };

  // Add new customer
  public addCustomer = async (customerData: ICustomer): Promise<ICustomer> => {
    const customer = new Customer(customerData);
    return await customer.save();
  };

  // Add an address to the customer's profile
  public addAddress = async (customerId: string, address: any): Promise<ICustomer | null> => {
    const customer = await Customer.findById(customerId);
    if (!customer) {
      throw new Error('Customer not found');
    }
    customer.addresses.push(address); 
    return await customer.save();
  };

}

export default CustomerService;
