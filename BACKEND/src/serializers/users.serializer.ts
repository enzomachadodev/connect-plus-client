import { z } from "zod";

export const userRequestSerializer = z.object({
	email: z.string().email(),
	name: z.string(),
	password: z.string(),
	avatarUrl: z.string(),
});

export const userResponseSerializer = z.object({
	id: z.string(),
	createdAt: z.date(),
	name: z.string(),
	email: z.string().email(),
	avatarUrl: z.string(),
});

export const userUpdateRequestSerializer = z.object({
	name: z.string().optional(),
	email: z.string().email().optional(),
	password: z.string().optional(),
	avatarUrl: z.string().optional(),
});

export const listUsersResponseSerializer = z.array(userResponseSerializer);
