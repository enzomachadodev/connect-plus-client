import { z } from "zod";

export const contactRequestSerializer = z.object({
	email: z.string().email({ message: "Invalid email address" }),
	name: z.string(),
	phone: z.string(),
	avatarUrl: z.string().startsWith("https://", { message: "Must provide secure URL" }),
	customerId: z.string().uuid(),
});

export const contactResponseSerializer = z.object({
	id: z.string(),
	createdAt: z.date(),
	name: z.string(),
	email: z.string().email(),
	phone: z.string(),
	avatarUrl: z.string(),
});

export const contactUpdateRequestSerializer = z.object({
	email: z.string().email().optional(),
	name: z.string().optional(),
	phone: z.string().optional(),
	avatarUrl: z.string().optional(),
	customerId: z.string(),
});

export const listContactsResponseSerializer = z.array(contactResponseSerializer);
