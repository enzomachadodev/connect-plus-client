import { IContactRequest, IContactResponse } from "../../interfaces/contacts.interface";
import prisma from "../../prismadb";
import { contactResponseSerializer } from "../../serializers/contacts.serializer";

export const createContactService = async ({
	name,
	email,
	phone,
	avatarUrl,
	customerId,
}: IContactRequest): Promise<IContactResponse> => {
	const newContact = await prisma.contact.create({
		data: {
			name,
			email,
			phone,
			avatarUrl,
			customerId: customerId,
		},
	});

	const validatedData = contactResponseSerializer.parse(newContact);

	return validatedData;
};
