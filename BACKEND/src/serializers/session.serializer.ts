import { z } from "zod";

export const sessionRequestSerializer = z.object({
	email: z.string().email(),
	password: z.string(),
});
