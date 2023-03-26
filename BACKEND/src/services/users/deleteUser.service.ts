import { prisma } from "../../../prisma/seed";

const deleteUserService = async (userId: string) => {
	await prisma.user.update({
		where: {
			id: userId,
		},
		data: {
			isActive: false,
		},
	});
};

export { deleteUserService };
