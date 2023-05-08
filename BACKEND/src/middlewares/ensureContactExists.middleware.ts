import { NextFunction, Request, Response } from "express";

import { AppError } from "../errors/appError";
import prisma from "../prismadb";

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
		throw new AppError("Contato não encontrado", 404);
	}

	req.contact = contact;

	return next();
};
