import { prisma } from "../../../prisma/seed";
import { IUserRequest, IUserResponse } from "../../interfaces/users.interface";
import { listUsersResponseSerializer } from "../../serializers/users.serializer";

const listUsersService = async (): Promise<IUserResponse[]> => {
	const users = await prisma.user.findMany();

	const validatedData = await listUsersResponseSerializer.validate(users, {
		stripUnknown: true,
	});

	return validatedData!;
};

export { listUsersService };
