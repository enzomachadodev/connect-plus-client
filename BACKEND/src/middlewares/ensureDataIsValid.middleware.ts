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
			console.log("\n", req.body, "\n");
			return next();
		} catch (error: any) {
			console.log(error);
			throw new AppError(error.errors, 400);
		}
	};

export { ensureDataIsValidMiddleware };
