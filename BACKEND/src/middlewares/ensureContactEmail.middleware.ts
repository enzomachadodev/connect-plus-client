import { NextFunction, Request, Response } from "express";
import prisma from "../prismadb";
import { AppError } from "../errors/appError";

export const ensureContactEmailNotExistsMiddleware = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { email, customerId } = req.body;
	const id = req.params.id;

	const customer = await prisma.customer.findUnique({
		where: {
			id: customerId,
		},
		include: {
			contacts: true,
		},
	});

	if (!customer) {
		throw new AppError("Customer not found", 404);
	}

	const contact = customer?.contacts.find((c) => c.email == email);

	if (contact?.id !== id) {
		throw new AppError("This Email already in use", 409);
	}

	return next();
};
