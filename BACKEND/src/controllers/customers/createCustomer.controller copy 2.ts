import { Request, Response } from "express";
import { createCustomerService } from "../../services/customers/createCustomer.service";

export const createCustomerController = async (req: Request, res: Response) => {
	const newCustomer = await createCustomerService(req.body, req.userId);
	return res.status(201).json(newCustomer);
};
