import { NextFunction, Request, Response } from "express";
import { prisma } from "../../prisma/seed";
import { AppError } from "../errors/appError";

export const ensureContactsExistsMiddleware = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const id = req.params.id;

	const contact = await prisma.contact.findUnique({
		where: {
			id: id,
		},
	});
	if (!contact) {
		throw new AppError("contact not found", 404);
	}

	req.contact = contact;

	return next();
};
