import { Router } from "express";
import { createSessionController } from "../controllers/session/createSession.controller";
import { ensureDataIsValidMiddleware } from "../middlewares/ensureDataIsValid.middleware";
import { sessionRequestSerializer } from "../serializers/session.serializer";

export const sessionRoutes = Router();

sessionRoutes.post(
	"",
	ensureDataIsValidMiddleware(sessionRequestSerializer),
	createSessionController
);
