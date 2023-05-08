import { hash } from "bcrypt";
import prisma from "../../prismadb";
import {
	UserCreateRequest,
	UserResponse,
	userResponseSerializer,
} from "../../serializers/users.serializer";

export const createUserService = async ({
	name,
	email,
	password,
	avatarUrl,
}: UserCreateRequest): Promise<UserResponse> => {
	const hashPassword = await hash(password, 10);

	const newUser = await prisma.user.create({
		data: {
			name,
			email,
			password: hashPassword,
			avatarUrl: avatarUrl
				? avatarUrl
				: "https://github.com/m4chado/NodeBooker/blob/main/my-app/public/images/user.jpg?raw=true",
		},
	});

	const validatedData = userResponseSerializer.parse(newUser);

	return validatedData;
};
