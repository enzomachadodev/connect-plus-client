interface IContactRequest {
	name: string;
	email: string;
	avatarUrl: string;
	phone: string;
	customerId: string;
}

interface IContactUpdate {
	name: string;
	email: string;
	avatarUrl: string;
	phone: string;
}

interface IContactResponse {
	id: string;
	createdAt: Date;
	name: string;
	email: string;
	avatarUrl: string;
	phone: string;
}

interface IContactRetrieve {
	id: string;
	createdAt: Date;
	phone: string;
	name: string;
	email: string;
	avatarUrl: string;
}

export { IContactRequest, IContactUpdate, IContactResponse, IContactRetrieve };
