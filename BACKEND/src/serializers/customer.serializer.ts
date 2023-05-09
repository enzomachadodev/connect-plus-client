import { z } from "zod";
import { contactResponseSerializer } from "./contacts.serializer";

export const customerCreateRequestSerializer = z.object({
	email: z.string().email({ message: "Formato de email inválido" }),
	name: z.string(),
	phone: z.string(),
	avatarUrl: z
		.string()
		.url()
		.startsWith("https://", { message: "Use uma URL segura" })
		.optional(),
});

export type CustomerCreateRequest = z.infer<typeof customerCreateRequestSerializer>;

export const customerResponseSerializer = z.object({
	id: z.string(),
	createdAt: z.date(),
	name: z.string(),
	email: z.string().email(),
	phone: z.string(),
	avatarUrl: z.string(),
	contacts: z.array(contactResponseSerializer).optional(),
});

export type CustomerResponse = z.infer<typeof customerResponseSerializer>;

export const customerUpdateRequestSerializer = z.object({
	email: z.string().email().optional(),
	name: z.string().optional(),
	phone: z.string().optional(),
	avatarUrl: z.string().optional(),
});

export type CustomerUpdateRequest = z.infer<typeof customerUpdateRequestSerializer>;

export const listCustomersResponseSerializer = z.array(customerResponseSerializer);
