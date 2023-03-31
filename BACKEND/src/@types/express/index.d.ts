import { Contact, Customer, User } from "@prisma/client";
import * as express from "express";
import { IUserRequest, IUserResponse, IUserRetrieve } from "../../interfaces/users.interface";

declare global {
	namespace Express {
		interface Request {
			userId: string;
			user: User;
			customer: Customer;
			contact: Contact;
		}
	}
}
