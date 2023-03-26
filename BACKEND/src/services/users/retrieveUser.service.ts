import { prisma } from "../../../prisma/seed";
import { IUserResponse } from "../../interfaces/users.interface";
import { userResponseSerializer } from "../../serializers/users.serializer";

const retrieveUserService = async (userId: string): Promise<IUserResponse> => {
	const user = await prisma.user.findUnique({
		where: {
			id: userId,
		},
	});

	const validatedData = await userResponseSerializer.validate(user, {
		stripUnknown: true,
	});

	return validatedData!;
};

export { retrieveUserService };
