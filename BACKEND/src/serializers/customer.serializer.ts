import { z } from "zod";
import { contactResponseSerializer } from "./contacts.serializer";

export const customerRequestSerializer = z.object({
	email: z.string().email().array(),
	name: z.string(),
	phone: z.string().array(),
	avatarUrl: z.string(),
});

export const customerResponseSerializer = z.object({
	id: z.string(),
	createdAt: z.date(),
	name: z.string(),
	email: z.string().email().array(),
	phone: z.string().array(),
	avatarUrl: z.string(),
	contacts: z.array(contactResponseSerializer).optional(),
});

export const customerUpdateRequestSerializer = z.object({
	email: z.string().email().array(),
	name: z.string(),
	phone: z.string().array(),
	avatarUrl: z.string(),
});

export const listCustomersResponseSerializer = z.array(customerResponseSerializer);
