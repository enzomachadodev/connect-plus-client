import prisma from "../../prismadb";
import { UserResponse, userResponseSerializer } from "../../serializers/users.serializer";

export const retrieveUserService = async (userId: string): Promise<UserResponse> => {
	const user = await prisma.user.findUnique({
		where: {
			id: userId,
		},
	});

	const validatedData = userResponseSerializer.parse(user);

	return validatedData;
};
