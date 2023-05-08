import prisma from "../../prismadb";
import { UserResponse, listUsersResponseSerializer } from "../../serializers/users.serializer";

export const listUsersService = async (): Promise<UserResponse[]> => {
	const users = await prisma.user.findMany({
		where: {
			isActive: true,
		},
	});

	const validatedData = listUsersResponseSerializer.parse(users);

	return validatedData;
};
