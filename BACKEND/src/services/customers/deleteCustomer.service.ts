import prisma from "../../prismadb";

export const deleteCustomerService = async (customerId: string) => {
	await prisma.customer.delete({
		where: {
			id: customerId,
		},
	});
};
