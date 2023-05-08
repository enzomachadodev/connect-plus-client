import { Request, Response } from "express";
import { updateContactService } from "../../services/contacts/updateContact.service";

export const updateContactController = async (req: Request, res: Response) => {
	const contact = await updateContactService(req.body, req.contact.id);
	return res.status(201).json(contact);
};
