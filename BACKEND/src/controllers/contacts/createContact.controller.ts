import { Request, Response } from "express";
import { createContactService } from "../../services/contacts/createContact.service";

export const createContactController = async (req: Request, res: Response) => {
	const newContact = await createContactService(req.body);
	return res.status(201).json(newContact);
};
