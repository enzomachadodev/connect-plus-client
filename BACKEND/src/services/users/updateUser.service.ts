import { User } from "@prisma/client";
import { hash } from "bcrypt";
import { prisma } from "../../../prisma/seed";
import { IUserResponse, IUserUpdate } from "../../interfaces/users.interface";
import { userResponseSerializer } from "../../serializers/users.serializer";

const updateUserService = async (userData: User, data: IUserUpdate): Promise<IUserResponse> => {
	const updateUser = await prisma.user.update({
		where: {
			id: userData.id,
		},
		data: {
			name: data.name ? data.name : userData.name,
			email: data.email ? data.email : userData.email,
			password: data.password ? await hash(data.password, 10) : userData.password,
			photoUrl: data.photoUrl ? data.photoUrl : userData.photoUrl,
		},
	});

	const validatedData = await userResponseSerializer.validate(updateUser, {
		stripUnknown: true,
	});

	return validatedData;
};

export { updateUserService };
