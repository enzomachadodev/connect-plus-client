import { Request, Response } from "express";
import { updateCustomerService } from "../../services/customers/updateCustomer.service";

export const updateCustomerController = async (req: Request, res: Response) => {
	const customer = await updateCustomerService(req.body, req.customer);
	return res.status(201).json(customer);
};
