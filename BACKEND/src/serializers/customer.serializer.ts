import { z } from "zod";
import { contactResponseSerializer } from "./contacts.serializer";

export const customerRequestSerializer = z.object({
	email: z.string().email({ message: "Invalid email address" }),
	name: z.string(),
	phone: z.string(),
	avatarUrl: z.string().url().startsWith("https://", { message: "Must provide secure URL" }),
});

export const customerResponseSerializer = z.object({
	id: z.string(),
	createdAt: z.date(),
	name: z.string(),
	email: z.string().email(),
	phone: z.string(),
	avatarUrl: z.string(),
	contacts: z.array(contactResponseSerializer).optional(),
});

export const customerUpdateRequestSerializer = z.object({
	email: z.string().email().optional(),
	name: z.string().optional(),
	phone: z.string().optional(),
	avatarUrl: z.string().optional(),
});

export const listCustomersResponseSerializer = z.array(customerResponseSerializer);
