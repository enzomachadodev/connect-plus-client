import { Request, Response } from "express";
import { retrieveCustomerService } from "../../services/customers/retrieveCustomer.service";

export const retrieveCustomerController = async (req: Request, res: Response) => {
	const customer = await retrieveCustomerService(req.customer.id);
	return res.status(201).json(customer);
};
