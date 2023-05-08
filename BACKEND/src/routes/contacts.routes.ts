import { Router } from "express";
import { createContactController } from "../controllers/contacts/createContact.controller";
import { updateContactController } from "../controllers/contacts/updateContact.controller";
import { ensureAuthMiddleware } from "../middlewares/ensureAuth.middleware";
import { ensureContactEmailNotExistsMiddleware } from "../middlewares/ensureContactEmail.middleware";
import { ensureContactsExistsMiddleware } from "../middlewares/ensureContactExists.middleware";
import { ensureDataIsValidMiddleware } from "../middlewares/ensureDataIsValid.middleware";
import {
	contactCreateRequestSerializer,
	contactUpdateRequestSerializer,
} from "../serializers/contacts.serializer";
import { deleteContactController } from "../controllers/contacts/deleteContact.controller";

export const contactsRoutes = Router();

contactsRoutes.post(
	"",
	ensureAuthMiddleware,
	ensureDataIsValidMiddleware(contactCreateRequestSerializer),
	ensureContactEmailNotExistsMiddleware,
	createContactController
);

contactsRoutes.patch(
	"/:id",
	ensureAuthMiddleware,
	ensureDataIsValidMiddleware(contactUpdateRequestSerializer),
	ensureContactsExistsMiddleware,
	ensureContactEmailNotExistsMiddleware,
	updateContactController
);

contactsRoutes.delete(
	"/:id",
	ensureAuthMiddleware,
	ensureContactsExistsMiddleware,
	deleteContactController
);
