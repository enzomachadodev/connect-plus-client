import { Router } from "express";
import { createContactController } from "../controllers/contacts/createContact.controller";
import { updateContactController } from "../controllers/contacts/updateContact.controller";
import { ensureAuthMiddleware } from "../middlewares/ensureAuth.middleware";
import { ensureContactEmailNotExistsMiddleware } from "../middlewares/ensureContactEmail.middleware";
import { ensureContactsExistsMiddleware } from "../middlewares/ensureContactExists.middleware";
import { ensureDataIsValidMiddleware } from "../middlewares/ensureDataIsValid.middleware";
import {
	contactRequestSerializer,
	contactUpdateRequestSerializer,
} from "../serializers/contacts.serializer";

export const contactsRoutes = Router();

contactsRoutes.post(
	"",
	ensureAuthMiddleware,
	ensureDataIsValidMiddleware(contactRequestSerializer),
	ensureContactEmailNotExistsMiddleware,
	createContactController
);

contactsRoutes.patch(
	"",
	ensureAuthMiddleware,
	ensureDataIsValidMiddleware(contactUpdateRequestSerializer),
	ensureContactsExistsMiddleware,
	ensureContactEmailNotExistsMiddleware,
	updateContactController
);
