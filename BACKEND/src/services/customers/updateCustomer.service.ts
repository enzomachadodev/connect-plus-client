import prisma from "../../prismadb";
import {
	CustomerResponse,
	CustomerUpdateRequest,
	customerResponseSerializer,
} from "../../serializers/customer.serializer";

export const updateCustomerService = async (
	data: CustomerUpdateRequest,
	customerId: string
): Promise<CustomerResponse> => {
	const updatedCustomer = await prisma.customer.update({
		where: {
			id: customerId,
		},
		data: {
			...data,
		},
	});

	const validatedData = customerResponseSerializer.parse(updatedCustomer);

	return validatedData;
};
