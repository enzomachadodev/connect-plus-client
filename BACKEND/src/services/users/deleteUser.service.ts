import prisma from "../../prismadb";

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
