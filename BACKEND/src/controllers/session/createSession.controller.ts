import { Request, Response } from "express";
import { createSessionService } from "../../services/session/createSession.service";

export const createSessionController = async (req: Request, res: Response) => {
	const token: string = await createSessionService(req.body);
	return res.status(201).json(token);
};
