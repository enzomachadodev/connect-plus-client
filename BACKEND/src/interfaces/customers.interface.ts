import { IContactResponse } from "./contacts.interface";

interface ICustomerRequest {
	name: string;
	email: string[];
	avatarUrl: string;
	phone: string[];
}

interface ICustomerUpdate {
	name: string;
	email: string[];
	avatarUrl: string;
	phone: string[];
}

interface ICustomerResponse {
	id: string;
	createdAt: Date;
	name: string;
	email: string[];
	avatarUrl: string;
	phone: string[];
	contacts?: IContactResponse[] | undefined;
}

interface ICustomerRetrieve {
	id: string;
	createdAt: Date;
	phone: string[];
	name: string;
	email: string[];
	avatarUrl: string;
}

export { ICustomerRequest, ICustomerUpdate, ICustomerResponse, ICustomerRetrieve };
