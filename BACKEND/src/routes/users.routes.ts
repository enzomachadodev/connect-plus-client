import { Router } from "express";
import { createUserController } from "../controllers/users/createUser.controller";
import { deleteUserController } from "../controllers/users/deleteUser.controller";
import { listCustomersofUserController } from "../controllers/users/listCustomersOfUser.controller";
import { listUsersController } from "../controllers/users/listUsers.controller";
import { retrieveUserController } from "../controllers/users/retrieveUser.controller";
import { updateUserController } from "../controllers/users/updateUser.controller";
import { ensureAuthMiddleware } from "../middlewares/ensureAuth.middleware";
import { ensureDataIsValidMiddleware } from "../middlewares/ensureDataIsValid.middleware";
import { ensureEmailNotExistsMiddleware } from "../middlewares/ensureEmailNotExists.middleware";
import { ensureAdminOrOwnerMiddleware } from "../middlewares/ensureIsAdminOrOwner.middleware";
import { ensureUserExistsMiddleware } from "../middlewares/ensureUserExists.middleware";
import { ensureUserIsActive } from "../middlewares/ensureUserIsActive.middleware";
import {
	userRequestSerializer,
	userUpdateRequestSerializer,
} from "../serializers/users.serializer";

export const userRoutes = Router();

userRoutes.post(
	"",
	ensureDataIsValidMiddleware(userRequestSerializer),
	ensureEmailNotExistsMiddleware,
	createUserController
);
userRoutes.get("", ensureAuthMiddleware, ensureAdminOrOwnerMiddleware, listUsersController);
userRoutes.get("/profile", ensureAuthMiddleware, retrieveUserController);
userRoutes.get("/customers", ensureAuthMiddleware, listCustomersofUserController);
userRoutes.patch(
	"/:id",
	ensureAuthMiddleware,
	ensureDataIsValidMiddleware(userUpdateRequestSerializer),
	ensureUserExistsMiddleware,
	ensureUserIsActive,
	ensureAdminOrOwnerMiddleware,
	ensureEmailNotExistsMiddleware,
	updateUserController
);
userRoutes.delete(
	"",
	ensureAuthMiddleware,
	ensureUserExistsMiddleware,
	ensureUserIsActive,
	ensureAdminOrOwnerMiddleware,
	deleteUserController
);
