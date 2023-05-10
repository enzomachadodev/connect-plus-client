import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
import { hash } from "bcrypt";

const prisma = new PrismaClient();

async function main() {
	const hashPassword = await hash("12345", 10);
	const user = await prisma.user.create({
		data: {
			name: "Enzo Machado",
			email: "enzomachado@email.com",
			password: hashPassword,
			avatarUrl: "https://github.com/m4chado.png",
		},
	});

	for (let i = 0; i < 10; i++) {
		const customer = await prisma.customer.create({
			data: {
				avatarUrl: faker.image.business(),
				name: faker.company.name(),
				email: faker.internet.email(),
				phone: faker.phone.number(),
				userId: user.id,
			},
		});

		for (let j = 0; j < 3; j++) {
			await prisma.contact.create({
				data: {
					name: faker.name.fullName(),
					email: faker.internet.email(),
					phone: faker.phone.number(),
					avatarUrl: faker.image.avatar(),
					customerId: customer.id,
				},
			});
		}
	}
}

main()
	.catch((error) => {
		console.error(error);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
