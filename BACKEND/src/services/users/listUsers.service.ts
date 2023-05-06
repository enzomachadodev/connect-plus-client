import prisma from "../../prismadb";
import { IUserRequest, IUserResponse } from "../../interfaces/users.interface";
import { listUsersResponseSerializer } from "../../serializers/users.serializer";

export const listUsersService = async (): Promise<IUserResponse[]> => {
	const users = await prisma.user.findMany();

	const validatedData = listUsersResponseSerializer.parse(users);

	return validatedData;
};
