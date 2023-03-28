import { z } from "zod";

export const contactRequestSerializer = z.object({
	email: z.string().email().array(),
	name: z.string(),
	phone: z.string().array(),
	avatarUrl: z.string(),
});

export const contactResponseSerializer = z.object({
	id: z.string(),
	createdAt: z.date(),
	name: z.string(),
	email: z.string().email().array(),
	phone: z.string().array(),
	avatarUrl: z.string(),
});

export const contactUpdateRequestSerializer = z.object({
	email: z.string().email().array(),
	name: z.string(),
	phone: z.string().array(),
	avatarUrl: z.string(),
});

export const listContactsResponseSerializer = z.array(contactResponseSerializer);
