import prisma from "../../prismadb";
import { ICustomerResponse } from "../../interfaces/customers.interface";
import { listCustomersResponseSerializer } from "../../serializers/customer.serializer";

export const listCustomersOfUserService = async (userId: string): Promise<ICustomerResponse[]> => {
	const customersOfUser = await prisma.customer.findMany({
		where: {
			userId: userId,
		},
	});

	const validatedData = listCustomersResponseSerializer.parse(customersOfUser);

	return validatedData;
};
