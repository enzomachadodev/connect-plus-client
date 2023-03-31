import { IContactResponse } from "./contacts.interface";

interface ICustomerRequest {
	name: string;
	email: string;
	avatarUrl: string;
	phone: string;
}

interface ICustomerUpdate {
	name: string;
	email: string;
	avatarUrl: string;
	phone: string;
}

interface ICustomerResponse {
	id: string;
	createdAt: Date;
	name: string;
	email: string;
	avatarUrl: string;
	phone: string;
	contacts?: IContactResponse[];
}

interface ICustomerRetrieve {
	id: string;
	createdAt: Date;
	phone: string;
	name: string;
	email: string;
	avatarUrl: string;
	contacts?: IContactResponse[];
}

export { ICustomerRequest, ICustomerUpdate, ICustomerResponse, ICustomerRetrieve };
