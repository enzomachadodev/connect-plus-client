import { NextFunction, Request, Response } from "express";
import prisma from "../prismadb";
import { AppError } from "../errors/appError";

export const ensureCustomerExistsMiddleware = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const id = req.params.id;

	const customer = await prisma.customer.findUnique({
		where: {
			id: id,
		},
	});
	if (!customer) {
		throw new AppError("Cliente não encontrado", 404);
	}

	req.customer = customer;

	return next();
};
