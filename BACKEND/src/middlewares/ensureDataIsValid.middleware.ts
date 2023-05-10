import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

export const ensureDataIsValidMiddleware =
	(schema: ZodSchema) => async (req: Request, res: Response, next: NextFunction) => {
		try {
			const validatedData = await schema.parse(req.body);
			req.body = validatedData;

			return next();
		} catch (err: any) {
			return res.status(400).json({
				error: err.errors,
			});
		}
	};
