export interface Contact {
	id: string;
	name: string;
	email: string;
	phone: string;
	avatarUrl: string;
	createdAt: Date;
}

export interface ContactCreateRequest {
	name: string;
	email: string;
	phone: string;
	avatarUrl?: string;
	customerId: string;
}

export interface ContactUpdateRequest {
	name?: string;
	email?: string;
	phone?: string;
	avatarUrl?: string;
	customerId: string;
}
