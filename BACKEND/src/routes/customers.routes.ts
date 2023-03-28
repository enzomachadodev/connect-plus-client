import { Router } from "express";
import { createCustomerController } from "../controllers/customers/createCustomer.controller copy 2";
import { retrieveCustomerController } from "../controllers/customers/retrieveCustomer.controller";
import { updateCustomerController } from "../controllers/customers/updateCustomer.controller";
import { ensureAuthMiddleware } from "../middlewares/ensureAuth.middleware";
import { ensureCustomerExistsMiddleware } from "../middlewares/ensureCustomerExists.middleware";
import { ensureDataIsValidMiddleware } from "../middlewares/ensureDataIsValid.middleware";
import {
	customerRequestSerializer,
	customerUpdateRequestSerializer,
} from "../serializers/customer.serializer";

export const customerRoutes = Router();

customerRoutes.post(
	"",
	ensureAuthMiddleware,
	ensureDataIsValidMiddleware(customerRequestSerializer),
	//ensureCustomerEmailNotExistsMiddleware,
	createCustomerController
);
customerRoutes.get(
	"/:id",
	ensureAuthMiddleware,
	ensureCustomerExistsMiddleware,
	retrieveCustomerController
);

customerRoutes.patch(
	"/:id",
	ensureAuthMiddleware,
	ensureDataIsValidMiddleware(customerUpdateRequestSerializer),
	ensureCustomerExistsMiddleware,
	//ensureCustomerEmailNotExistsMiddleware,
	updateCustomerController
);
customerRoutes.delete("");
