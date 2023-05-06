import prisma from "../../prismadb";

export const deleteContactService = async (contactId: string) => {
	await prisma.contact.delete({
		where: {
			id: contactId,
		},
	});
};
