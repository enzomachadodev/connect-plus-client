import { User } from "@prisma/client";
import { hash } from "bcrypt";
import prisma from "../../prismadb";
import { IUserResponse, IUserUpdate } from "../../interfaces/users.interface";
import { userResponseSerializer } from "../../serializers/users.serializer";

export const updateUserService = async (
	userData: User,
	data: IUserUpdate
): Promise<IUserResponse> => {
	const updateUser = await prisma.user.update({
		where: {
			id: userData.id,
		},
		data: {
			name: data.name ? data.name : userData.name,
			email: data.email ? data.email : userData.email,
			password: data.password ? await hash(data.password, 10) : userData.password,
			avatarUrl: data.avatarUrl ? data.avatarUrl : userData.avatarUrl,
		},
	});

	const validatedData = userResponseSerializer.parse(updateUser);

	return validatedData;
};
