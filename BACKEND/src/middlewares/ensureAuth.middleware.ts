import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { AppError } from "../errors/appError";

export const ensureAuthMiddleware = async (req: Request, res: Response, next: NextFunction) => {
	let token = req.headers.authorization;

	if (!token) {
		return res.status(401).json({ message: "Invalid token" });
	}

	token = token.split(" ")[1];

	jwt.verify(token, process.env.SECRET_KEY as string, (error, decoded: any) => {
		if (error) {
			throw new AppError("Invalid Token", 401);
		}

		const userId = decoded.sub;

		req.userId = userId;

		return next();
	});
};
