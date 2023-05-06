import { NextFunction, Request, Response } from "express";
import prisma from "../prismadb";
import { AppError } from "../errors/appError";

export const ensureUserExistsMiddleware = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const id = req.params.id;

	const user = await prisma.user.findUnique({
		where: {
			id: id,
		},
	});
	if (!user) {
		throw new AppError("User not found", 404);
	}

	req.user = user;

	return next();
};
