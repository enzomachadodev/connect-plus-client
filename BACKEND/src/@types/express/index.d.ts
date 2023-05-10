import * as express from "express";
import { UserResponse } from "../../serializers/users.serializer";
import { CustomerResponse } from "../../serializers/customer.serializer";
import { ContactResponse } from "../../serializers/contacts.serializer";

declare global {
	namespace Express {
		interface Request {
			user: UserResponse;
			customer: CustomerResponse;
			contact: ContactResponse;
		}
	}
}
