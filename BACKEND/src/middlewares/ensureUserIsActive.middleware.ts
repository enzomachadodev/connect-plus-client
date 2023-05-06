import { NextFunction, Request, Response } from "express";
import prisma from "../prismadb";
import { AppError } from "../errors/appError";

export const ensureUserIsActive = async (req: Request, res: Response, next: NextFunction) => {
	const id = req.params.id;

	if (id) {
		const user = await prisma.user.findUnique({
			where: {
				id: id,
			},
		});
		if (!user?.isActive) {
			throw new AppError("This account has been disabled", 404);
		}
	}

	return next();
};
