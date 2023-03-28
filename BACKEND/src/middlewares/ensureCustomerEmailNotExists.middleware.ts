import { NextFunction, Request, Response } from "express";
import { prisma } from "../../prisma/seed";
import { AppError } from "../errors/appError";

export const ensureCustomerEmailNotExistsMiddleware = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { email } = req.body;

	email.array.forEach(async (e: string) => {
		const customer = await prisma.customer.findUnique({
			where: {
				email: e,
			},
		});
		if (customer) {
			throw new AppError("This Email already in use", 409);
		}
	});
};
