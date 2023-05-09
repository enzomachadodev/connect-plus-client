import { Contact } from "./contacts";

export interface Customer {
	id: string;
	name: string;
	email: string;
	phone: string;
	avatarUrl: string;
	createdAt: Date;
	contacts?: Contact[];
}

export interface CustomerCreateRequest {
	name: string;
	email: string;
	phone: string;
	avatarUrl?: string;
}

export interface CustomerUpdateRequest {
	name?: string;
	email?: string;
	phone?: string;
	avatarUrl?: string;
}
