import "reflect-metadata";
import express from "express";
import "express-async-errors";
import { handleError } from "./errors/handleError";
import { userRoutes } from "./routes/users.routes";
import { sessionRoutes } from "./routes/session.routes";

const app = express();
app.use(express.json());

app.use("/login", sessionRoutes);
app.use("/users", userRoutes);

app.use(handleError);
app.listen(3000, () => {
	console.log("Server running in port 3000");
});

export default app;
