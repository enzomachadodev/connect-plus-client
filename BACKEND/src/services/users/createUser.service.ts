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
				: "https://thumbs.dreamstime.com/b/default-avatar-profile-trendy-style-social-media-user-icon-187599373.jpg",
		},
	});

	const validatedData = userResponseSerializer.parse(newUser);

	return validatedData;
};
