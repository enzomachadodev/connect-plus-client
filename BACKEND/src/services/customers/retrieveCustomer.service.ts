import prisma from "../../prismadb";
import {
	CustomerResponse,
	customerResponseSerializer,
} from "../../serializers/customer.serializer";

export const retrieveCustomerService = async (customerId: string): Promise<CustomerResponse> => {
	const retriviedCustomer = await prisma.customer.findUnique({
		where: {
			id: customerId,
		},
		include: {
			contacts: {
				orderBy: {
					createdAt: "desc",
				},
			},
		},
	});

	const validatedData = customerResponseSerializer.parse(retriviedCustomer);

	return validatedData;
};
