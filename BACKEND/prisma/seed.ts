import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";
import "dotenv/config";

export const prisma = new PrismaClient();

async function main() {
	const admin = prisma.user.findUnique({
		where: {
			email: process.env.ADMIN_EMAIL as string,
		},
	});

	if (!admin) {
		await prisma.user.create({
			data: {
				name: "admin",
				email: process.env.ADMIN_EMAIL as string,
				password: await hash(process.env.ADMIN_PASSWORD as string, 10),
				isAdmin: true,
			},
		});
	}
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
