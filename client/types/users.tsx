export interface IUserLogin {
	email: string;
	password: string;
}

export interface IUserLoginForm extends IUserLogin {}

export interface IUserRegister {
	name: string;
	avatarUrl: string;
	email: string;
	password: string;
}

export interface IUserRegisterForm extends IUserRegister {
	confirmPassword: string;
}

export interface IUser {
	name: string;
	email: string;
	avatarUrl: string;
}
