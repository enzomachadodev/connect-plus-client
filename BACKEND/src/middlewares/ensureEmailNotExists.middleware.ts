import { NextFunction, Request, Response } from "express";
import prisma from "../prismadb";
import { AppError } from "../errors/appError";

export const ensureEmailNotExistsMiddleware = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { id } = req.params;
	const { email } = req.body;

	if (email) {
		const user = await prisma.user.findUnique({
			where: {
				email: email,
			},
		});

		if (user) {
			if (user.id == id) {
				return next();
			}
			throw new AppError("Este email já está sendo usado", 409);
		}
	}
};
