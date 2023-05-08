import prisma from "../../prismadb";
import {
	CustomerResponse,
	listCustomersResponseSerializer,
} from "../../serializers/customer.serializer";

export const listCustomersOfUserService = async (userId: string): Promise<CustomerResponse[]> => {
	const customersOfUser = await prisma.customer.findMany({
		where: {
			userId: userId,
		},
	});

	const validatedData = listCustomersResponseSerializer.parse(customersOfUser);

	return validatedData;
};
