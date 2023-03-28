import { prisma } from "../../../prisma/seed";

export const deleteUserService = async (userId: string) => {
	await prisma.user.update({
		where: {
			id: userId,
		},
		data: {
			isActive: false,
		},
	});
};
