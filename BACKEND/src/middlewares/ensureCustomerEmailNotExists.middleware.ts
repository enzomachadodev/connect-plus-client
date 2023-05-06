import { NextFunction, Request, Response } from "express";
import prisma from "../prismadb";
import { AppError } from "../errors/appError";

export const ensureCustomerEmailNotExistsMiddleware = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const customerId = req.params.id;
	const userId = req.userId;
	const { email } = req.body;

	if (customerId) {
		const customer = await prisma.customer.findUnique({
			where: {
				id: customerId,
			},
		});

		if (customer?.email === email && email === "") {
			return next();
		}
	}

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
