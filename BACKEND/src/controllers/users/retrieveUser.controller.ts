import { Request, Response } from "express";
import { retrieveUserService } from "../../services/users/retrieveUser.service";

export const retrieveUserController = async (req: Request, res: Response) => {
	const users = await retrieveUserService(req.user.id);
	return res.status(200).json(users);
};
