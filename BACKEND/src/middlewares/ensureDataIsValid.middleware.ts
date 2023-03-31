import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

export const ensureDataIsValidMiddleware =
	(schema: ZodSchema) => async (req: Request, res: Response, next: NextFunction) => {
		const result = schema.safeParse(req.body);

		if (!result.success) {
			const formattedError = result.error.issues;

			return res.status(400).json(formattedError);
		}

		req.body = result.data;
		return next();
	};
