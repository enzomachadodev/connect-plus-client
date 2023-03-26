import * as yup from "yup";
import { ISessionRequest } from "../interfaces/session.interface";

const sessionRequestSerializer: yup.Schema<ISessionRequest> = yup.object().shape({
	email: yup.string().email().required(),
	password: yup.string().required(),
});

export { sessionRequestSerializer };
