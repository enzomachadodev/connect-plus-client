import { z } from "zod";

export const userCreateRequestSerializer = z.object({
	email: z.string().email({ message: "Formato de email inválido" }),
	name: z.string(),
	password: z.string(),
	avatarUrl: z.string().startsWith("https://", { message: "Use uma URL segura" }).optional(),
});

export type UserCreateRequest = z.infer<typeof userCreateRequestSerializer>;

export const userResponseSerializer = z.object({
	id: z.string(),
	createdAt: z.date(),
	name: z.string(),
	email: z.string().email(),
	avatarUrl: z.string(),
});

export type UserResponse = z.infer<typeof userResponseSerializer>;

export const userUpdateRequestSerializer = z.object({
	name: z.string().optional(),
	email: z.string().email().optional(),
	password: z.string().optional(),
	avatarUrl: z.string().optional(),
});

export type UserUpdateRequest = z.infer<typeof userUpdateRequestSerializer>;

export const listUsersResponseSerializer = z.array(userResponseSerializer);
