import { Request, Response } from "express";
import { deleteUserService } from "../../services/users/deleteUser.service";

export const deleteUserController = async (req: Request, res: Response) => {
	await deleteUserService(req.params.id);
	return res.status(204).json({ message: "disabled user" });
};
