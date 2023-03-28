import { createContext, useEffect, useState } from "react";
import { api } from "@/services/api";
import { IUser, IUserLogin } from "@/types/users";
import { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { redirect } from "next/navigation";
import nookies from "nookies";

interface AuthContextData {
	isAuthenticated: boolean;
	signIn: (data: IUserLogin) => Promise<void>;
	user: IUser | undefined;
}

interface AuthProviderProps {
	children: React.ReactNode;
}

export const AuthContext = createContext({} as AuthContextData);

export const AuthProvider = ({ children }: AuthProviderProps) => {
	const [user, setUser] = useState<IUser | undefined>();
	const isAuthenticated = !!user;

	const getUser = async () => {
		try {
			await api.get("/users", {}).then((res) => {
				console.log(res);
			});
		} catch (err) {
			if (err instanceof AxiosError) {
				console.log(err?.response?.data.message);
			}
		}
	};
	useEffect(() => {
		const cookies = nookies.get();
		if (cookies["token"]) {
			getUser();
		}
	}, []);

	const signIn = async (data: IUserLogin) => {
		try {
			api.post("/login", data).then((res: AxiosResponse) => {
				toast.dismiss();
				toast.success("Successful login");

				nookies.set(undefined, "token", res.data, {
					maxAge: 60 * 60 * 1, //1 hour
				});

				api.defaults.headers.authorization = `Bearer ${res.data}`;
			});
		} catch (err) {
			toast.dismiss();
			toast.error("error no login");
			console.log(err);
		}
	};

	return (
		<AuthContext.Provider value={{ isAuthenticated, signIn, user }}>
			{children}
		</AuthContext.Provider>
	);
};
