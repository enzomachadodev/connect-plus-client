import { compare } from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../../prismadb";
import { AppError } from "../../errors/appError";
import { ISessionRequest } from "../../interfaces/session.interface";

const createSessionService = async ({ email, password }: ISessionRequest): Promise<string> => {
	const user = await prisma.user.findUnique({
		where: {
			email: email,
		},
	});

	if (!user) {
		throw new AppError("Invalid user or password", 401);
	}

	const passwordMatch = await compare(password, user.password);

	if (!passwordMatch) {
		throw new AppError("Invalid user or password", 401);
	}

	if (!user?.isActive) {
		throw new AppError("User account is disabled", 404);
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

export { createSessionService };
