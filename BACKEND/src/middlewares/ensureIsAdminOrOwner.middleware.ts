import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/appError";
import prisma from "../prismadb";

export const ensureAdminOrOwnerMiddleware = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const user = await prisma.user.findUnique({
		where: {
			id: req.userId,
		},
	});

	if (user?.isAdmin) {
		return next();
	}

	if (user?.id !== req.params.id) {
		throw new AppError("Unauthorized", 401);
	}

	return next();
};
