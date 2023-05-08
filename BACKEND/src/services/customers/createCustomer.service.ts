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
				: "https://github.com/m4chado/NodeBooker/blob/main/my-app/public/images/user.jpg?raw=true",

			userId: userId,
		},
	});

	const validatedData = customerResponseSerializer.parse(newCustomer);

	return validatedData;
};
