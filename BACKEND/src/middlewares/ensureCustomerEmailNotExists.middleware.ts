import { NextFunction, Request, Response } from "express";
import { prisma } from "../../prisma/seed";
import { AppError } from "../errors/appError";

export const ensureCustomerEmailNotExistsMiddleware = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const userId = req.userId;
	const { email } = req.body;

	const user = await prisma.user.findUnique({
		where: {
			id: userId,
		},
		include: {
			customers: true,
		},
	});

	if (!user) {
		throw new AppError("User not found", 404);
	}

	const customer = user.customers.find((c) => c.email === email);

	if (customer) {
		throw new AppError("This email already in use", 409);
	}

	return next();
};
