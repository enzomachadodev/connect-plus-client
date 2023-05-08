import express from "express";
import "express-async-errors";
import cors from "cors";
import { handleError } from "./errors/handleError";
import { userRoutes } from "./routes/users.routes";
import { sessionRoutes } from "./routes/session.routes";
import { customerRoutes } from "./routes/customers.routes";
import { contactsRoutes } from "./routes/contacts.routes";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/session", sessionRoutes);
app.use("/users", userRoutes);
app.use("/customers", customerRoutes);
app.use("/contacts", contactsRoutes);

app.use(handleError);
app.listen(3333, () => {
	console.log("Server running in port 3333");
});

export default app;
