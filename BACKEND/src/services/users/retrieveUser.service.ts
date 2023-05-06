import prisma from "../../prismadb";
import { IUserResponse } from "../../interfaces/users.interface";
import { userResponseSerializer } from "../../serializers/users.serializer";

export const retrieveUserService = async (userId: string): Promise<IUserResponse> => {
	const user = await prisma.user.findUnique({
		where: {
			id: userId,
		},
	});

	const validatedData = userResponseSerializer.parse(user);

	return validatedData;
};
