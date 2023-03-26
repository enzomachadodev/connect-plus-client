interface IUserRequest {
	name: string;
	email: string;
	password: string;
	photoUrl?: string;
}

interface IUserUpdate {
	name?: string;
	email?: string;
	password?: string;
	photoUrl?: string;
}

interface IUserResponse {
	id: string;
	createdAt: Date;
	name: string;
	email: string;
	photoUrl: string;
}

interface IUserRetrieve {
	id: string;
	createdAt: Date;
	password: string;
	name: string;
	email: string;
	photoUrl: string;
}

export { IUserRequest, IUserUpdate, IUserResponse, IUserRetrieve };
