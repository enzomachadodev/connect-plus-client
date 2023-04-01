import { Request, Response } from "express";
import { deleteCustomerService } from "../../services/customers/deleteCustomer.service";

export const deleteCustomerController = async (req: Request, res: Response) => {
	await deleteCustomerService(req.customer.id);
	return res.status(204).json({});
};
