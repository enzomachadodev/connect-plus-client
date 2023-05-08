import { z } from "zod";

export const sessionRequestSerializer = z.object({
	email: z.string().email({ message: "Formato de email inválido" }),
	password: z.string(),
});

export type SessionRequest = z.infer<typeof sessionRequestSerializer>;
