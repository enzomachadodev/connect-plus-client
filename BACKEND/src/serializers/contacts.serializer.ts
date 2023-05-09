import { z } from "zod";

export const contactCreateRequestSerializer = z.object({
	email: z.string().email({ message: "Formato de email inválido" }),
	name: z.string(),
	phone: z.string(),
	avatarUrl: z.string().url().startsWith("https://", { message: "Use uma URL segura" }),
	customerId: z.string().uuid(),
});

export type ContactCreateRequest = z.infer<typeof contactCreateRequestSerializer>;

export const contactResponseSerializer = z.object({
	id: z.string(),
	createdAt: z.date(),
	name: z.string(),
	email: z.string().email(),
	phone: z.string(),
	avatarUrl: z.string().optional(),
});

export type ContactResponse = z.infer<typeof contactResponseSerializer>;

export const contactUpdateRequestSerializer = z.object({
	email: z.string().email().optional(),
	name: z.string().optional(),
	phone: z.string().optional(),
	avatarUrl: z.string().optional(),
});

export type ContactUpdateRequest = z.infer<typeof contactUpdateRequestSerializer>;

export const listContactsResponseSerializer = z.array(contactResponseSerializer);
