import prisma from "../../prismadb";
import {
	ContactCreateRequest,
	ContactResponse,
	contactResponseSerializer,
} from "../../serializers/contacts.serializer";

export const createContactService = async (
	data: ContactCreateRequest
): Promise<ContactResponse> => {
	const newContact = await prisma.contact.create({
		data: {
			...data,
		},
	});

	const validatedData = contactResponseSerializer.parse(newContact);

	return validatedData;
};
