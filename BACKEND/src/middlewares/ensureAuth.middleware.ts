import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { AppError } from "../errors/appError";
import prisma from "../prismadb";
import { userResponseSerializer } from "../serializers/users.serializer";

export const ensureAuthMiddleware = async (req: Request, res: Response, next: NextFunction) => {
	let token = req.headers.authorization;

	if (!token) {
		return res.status(401).json({ message: "Token inválido" });
	}

	token = token.split(" ")[1];

	jwt.verify(token, process.env.SECRET_KEY as string, async (error, decoded: any) => {
		if (error) {
			return res.status(401).json({ message: "Token inválido" });
		}
		const user = await prisma.user.findUnique({
			where: {
				id: decoded.sub as string,
			},
		});

		if (!user) {
			return res.status(401).json({ message: "Token inválido" });
		}

		const userFiltered = userResponseSerializer.parse(user);

		req.user = userFiltered;

		return next();
	});
};
