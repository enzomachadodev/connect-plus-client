import * as yup from "yup";
import { IUserRequest, IUserResponse, IUserUpdate } from "../interfaces/users.interface";

const userRequestSerializer: yup.Schema<IUserRequest> = yup.object().shape({
	email: yup.string().email().required(),
	name: yup.string().required(),
	password: yup.string().required(),
	photoUrl: yup.string(),
});

const userResponseSerializer: yup.Schema<IUserResponse> = yup.object().shape({
	id: yup.string().required(),
	createdAt: yup.date().required(),
	name: yup.string().required(),
	email: yup.string().email().required(),
	photoUrl: yup.string().required(),
});

const userUpdateRequestSerializer: yup.Schema<IUserUpdate> = yup.object().shape({
	name: yup.string(),
	email: yup.string().email(),
	password: yup.string(),
	photoUrl: yup.string(),
});

const listUsersResponseSerializer: yup.Schema<IUserResponse[] | undefined> =
	yup.array(userResponseSerializer);

export {
	userRequestSerializer,
	userResponseSerializer,
	userUpdateRequestSerializer,
	listUsersResponseSerializer,
};
