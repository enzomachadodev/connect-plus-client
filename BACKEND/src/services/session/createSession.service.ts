import { compare } from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../../prismadb";
import { AppError } from "../../errors/appError";
import { SessionRequest } from "../../serializers/session.serializer";
import "dotenv/config";

export const createSessionService = async ({
	email,
	password,
}: SessionRequest): Promise<string> => {
	const user = await prisma.user.findUnique({
		where: {
			email: email,
		},
	});

	if (!user) {
		throw new AppError("Usuário e/ou senha inválidos", 401);
	}

	const passwordMatch = await compare(password, user.password);

	if (!passwordMatch) {
		throw new AppError("Usuário e/ou senha inválidos", 401);
	}

	if (!user?.isActive) {
		throw new AppError("Usuário desativado", 404);
	}

	const token = jwt.sign(
		{
			isAdm: user.isAdmin,
		},
		process.env.SECRET_KEY as string,
		{
			expiresIn: "24h",
			subject: user.id,
		}
	);

	return token;
};
