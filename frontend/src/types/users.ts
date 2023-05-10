export interface User {
	name: string;
	email: string;
	avatarUrl: string;
}

export interface UserCreateRequest {
	name: string;
	email: string;
	password: string;
	avatarUrl?: string;
}

export interface UserLoginRequest {
	email: string;
	password: string;
}
