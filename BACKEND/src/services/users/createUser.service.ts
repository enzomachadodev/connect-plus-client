import { hash } from "bcrypt";
import { prisma } from "../../../prisma/seed";
import { IUserRequest, IUserResponse } from "../../interfaces/users.interface";
import { userResponseSerializer } from "../../serializers/users.serializer";

const createUserService = async ({
	name,
	email,
	password,
	photoUrl,
}: IUserRequest): Promise<IUserResponse> => {
	const hashPassword = await hash(password, 10);

	const newUser = await prisma.user.create({
		data: {
			name,
			email,
			password: hashPassword,
			photoUrl,
		},
	});

	const validatedData = await userResponseSerializer.validate(newUser, {
		stripUnknown: true,
	});

	return validatedData;
};

export { createUserService };
