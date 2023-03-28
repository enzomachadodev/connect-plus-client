export interface IUserRequest {
	name: string;
	email: string;
	password: string;
	avatarUrl: string;
}

export interface IUserUpdate {
	name?: string;
	email?: string;
	password?: string;
	avatarUrl: string;
}

export interface IUserResponse {
	id: string;
	createdAt: Date;
	name: string;
	email: string;
	avatarUrl: string;
}

export interface IUserRetrieve {
	id: string;
	createdAt: Date;
	password: string;
	name: string;
	email: string;
	avatarUrl: string;
}
