import { prisma } from "../../../prisma/seed";

export const deleteCustomerService = async (customerId: string) => {
	await prisma.customer.delete({
		where: {
			id: customerId,
		},
	});
};
