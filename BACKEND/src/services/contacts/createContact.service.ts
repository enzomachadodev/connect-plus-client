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
			avatarUrl: data.avatarUrl
				? data.avatarUrl
				: "https://thumbs.dreamstime.com/b/default-avatar-profile-trendy-style-social-media-user-icon-187599373.jpg",
		},
	});

	const validatedData = contactResponseSerializer.parse(newContact);

	return validatedData;
};
