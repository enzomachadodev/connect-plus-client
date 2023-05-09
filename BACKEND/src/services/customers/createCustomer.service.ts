import prisma from "../../prismadb";
import {
	CustomerCreateRequest,
	CustomerResponse,
	customerResponseSerializer,
} from "../../serializers/customer.serializer";

export const createCustomerService = async (
	userData: CustomerCreateRequest,
	userId: string
): Promise<CustomerResponse> => {
	const newCustomer = await prisma.customer.create({
		data: {
			...userData,
			avatarUrl: userData.avatarUrl
				? userData.avatarUrl
				: "https://thumbs.dreamstime.com/b/default-avatar-profile-trendy-style-social-media-user-icon-187599373.jpg",

			userId: userId,
		},
	});

	const validatedData = customerResponseSerializer.parse(newCustomer);

	return validatedData;
};
