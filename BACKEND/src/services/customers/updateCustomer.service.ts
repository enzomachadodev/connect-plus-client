import prisma from "../../prismadb";
import {
	ICustomerResponse,
	ICustomerRetrieve,
	ICustomerUpdate,
} from "../../interfaces/customers.interface";
import { customerResponseSerializer } from "../../serializers/customer.serializer";

export const updateCustomerService = async (
	{ name, email, phone, avatarUrl }: ICustomerUpdate,
	customer: ICustomerRetrieve
): Promise<ICustomerResponse> => {
	const updatedCustomer = await prisma.customer.update({
		where: {
			id: customer.id,
		},
		data: {
			name,
			email,
			phone,
			avatarUrl,
		},
	});

	const validatedData = customerResponseSerializer.parse(updatedCustomer);

	return validatedData;
};
