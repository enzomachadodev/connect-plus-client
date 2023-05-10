import prisma from "../../prismadb";
import {
	ContactResponse,
	ContactUpdateRequest,
	contactResponseSerializer,
} from "../../serializers/contacts.serializer";

export const updateContactService = async (
	data: ContactUpdateRequest,
	contactId: string
): Promise<ContactResponse> => {
	const updatedContact = await prisma.contact.update({
		where: {
			id: contactId,
		},
		data: {
			...data,
		},
	});

	const validatedData = contactResponseSerializer.parse(updatedContact);

	return validatedData;
};
