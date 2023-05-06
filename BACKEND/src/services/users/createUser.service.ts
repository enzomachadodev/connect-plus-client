import { hash } from "bcrypt";
import prisma from "../../prismadb";
import { IUserRequest, IUserResponse } from "../../interfaces/users.interface";
import { userResponseSerializer } from "../../serializers/users.serializer";

export const createUserService = async ({
	name,
	email,
	password,
	avatarUrl,
}: IUserRequest): Promise<IUserResponse> => {
	const hashPassword = await hash(password, 10);

	const newUser = await prisma.user.create({
		data: {
			name,
			email,
			password: hashPassword,
			avatarUrl,
		},
	});

	const validatedData = userResponseSerializer.parse(newUser);

	return validatedData;
};
