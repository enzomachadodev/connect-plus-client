import { Request, Response, NextFunction } from "express";
import { AnyObject } from "yup";
import { AppError } from "../errors/appError";

const ensureDataIsValidMiddleware =
	(schema: AnyObject) => async (req: Request, res: Response, next: NextFunction) => {
		try {
			const validatedData = await schema.validate(req.body, {
				abortEarly: false,
				stripUnknown: true,
			});

			req.body = validatedData;
			return next();
		} catch (error: any) {
			throw new AppError(error.errors, 400);
		}
	};

export { ensureDataIsValidMiddleware };
