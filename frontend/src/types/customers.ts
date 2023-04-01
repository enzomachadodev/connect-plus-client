import { IContact } from "./contacts";

export interface ICustomer {
	id: string;
	createdAt: Date;
	phone: string;
	name: string;
	email: string;
	avatarUrl: string;
}

export interface ICustomerRetrieve {
	id: string;
	createdAt: Date;
	phone: string;
	name: string;
	email: string;
	avatarUrl: string;
	contacts: IContact[];
}

export interface ICustomerRequest {
	name: string;
	avatarUrl: string;
	email: string;
	phone: string;
}
