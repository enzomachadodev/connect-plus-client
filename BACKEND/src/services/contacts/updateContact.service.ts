import prisma from "../../prismadb";
import {
	IContactResponse,
	IContactRetrieve,
	IContactUpdate,
} from "../../interfaces/contacts.interface";
import { contactResponseSerializer } from "../../serializers/contacts.serializer";

export const updateContactService = async (
	{ name, email, phone, avatarUrl }: IContactUpdate,
	Contact: IContactRetrieve
): Promise<IContactResponse> => {
	const updatedContact = await prisma.contact.update({
		where: {
			id: Contact.id,
		},
		data: {
			name,
			email,
			phone,
			avatarUrl,
		},
	});

	const validatedData = contactResponseSerializer.parse(updatedContact);

	return validatedData;
};
