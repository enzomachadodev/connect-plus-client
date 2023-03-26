import { NextFunction, Request, Response } from "express";
import { prisma } from "../../prisma/seed";
import { AppError } from "../errors/appError";

const ensureUserIsActive = async (req: Request, res: Response, next: NextFunction) => {
	const id = req.params.id;

	if (id) {
		const user = await prisma.user.findUnique({
			where: {
				id: id,
			},
		});
		if (!user?.isActive) {
			throw new AppError("This account has been disabled");
		}
	}

	return next();
};

export { ensureUserIsActive };
