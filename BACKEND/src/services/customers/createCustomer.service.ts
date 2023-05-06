import prisma from "../../prismadb";
import { ICustomerRequest, ICustomerResponse } from "../../interfaces/customers.interface";
import { customerResponseSerializer } from "../../serializers/customer.serializer";

export const createCustomerService = async (
	{ name, email, phone, avatarUrl }: ICustomerRequest,
	userId: string
): Promise<ICustomerResponse> => {
	const newCustomer = await prisma.customer.create({
		data: {
			name,
			email,
			phone,
			avatarUrl,
			userId: userId,
		},
	});

	const validatedData = customerResponseSerializer.parse(newCustomer);

	return validatedData;
};
