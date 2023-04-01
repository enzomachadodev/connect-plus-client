import { prisma } from "../../../prisma/seed";

export const deleteContactService = async (contactId: string) => {
	await prisma.contact.delete({
		where: {
			id: contactId,
		},
	});
};
