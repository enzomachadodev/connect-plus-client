import { Customer } from "@prisma/client";
import prisma from "../../prismadb";
import { ICustomerResponse } from "../../interfaces/customers.interface";
import { customerResponseSerializer } from "../../serializers/customer.serializer";

export const retrieveCustomerService = async (customer: Customer): Promise<ICustomerResponse> => {
	const retriviedCustomer = await prisma.customer.findUnique({
		where: {
			id: customer.id,
		},
		include: {
			contacts: true,
		},
	});

	const validatedData = customerResponseSerializer.parse(retriviedCustomer);

	return validatedData;
};
