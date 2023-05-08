import { User } from "@prisma/client";
import { hash } from "bcrypt";
import prisma from "../../prismadb";
import {
	UserResponse,
	UserUpdateRequest,
	userResponseSerializer,
} from "../../serializers/users.serializer";

export const updateUserService = async (
	userId: string,
	data: UserUpdateRequest
): Promise<UserResponse> => {
	const updateUser = await prisma.user.update({
		where: {
			id: userId,
		},
		data: {
			...data,
		},
	});

	const validatedData = userResponseSerializer.parse(updateUser);

	return validatedData;
};
