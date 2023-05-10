import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
import { hash } from "bcrypt";

const prisma = new PrismaClient();

const generatedNumbers = new Set();

const numberGenerate = () => {
	let phoneNumber = "";

	do {
		phoneNumber = "9";

		for (let i = 0; i < 8; i++) {
			phoneNumber += Math.floor(Math.random() * 10);
		}
	} while (generatedNumbers.has(phoneNumber));

	generatedNumbers.add(phoneNumber);

	return phoneNumber;
};

async function main() {
	const hashPassword = await hash("12345", 10);
	const user = await prisma.user.create({
		data: {
			name: "Enzo Machado",
			email: "teste@email.com",
			password: hashPassword,
			avatarUrl: "https://github.com/m4chado.png",
		},
	});

	for (let i = 0; i < 15; i++) {
		const customer = await prisma.customer.create({
			data: {
				avatarUrl: faker.image.avatar(),
				name: faker.company.name(),
				email: `customer-${i}@email.com`,
				phone: numberGenerate(),
				userId: user.id,
			},
		});

		for (let j = 0; j < 5; j++) {
			await prisma.contact.create({
				data: {
					name: faker.name.fullName(),
					email: `contact-${i}-${j}@email.com`,
					phone: numberGenerate(),
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
