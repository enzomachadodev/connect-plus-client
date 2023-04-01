import { Request, Response } from "express";
import { deleteContactService } from "../../services/contacts/deleteContact.service";

export const deleteContactController = async (req: Request, res: Response) => {
	await deleteContactService(req.contact.id);
	return res.status(204).json({});
};
