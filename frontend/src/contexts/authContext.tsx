import { api } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import { createContext, useEffect, useState } from "react";
import nookies, { destroyCookie } from "nookies";
import { IUser, IUserRegister } from "@/types/users";

interface IAuthContextData {
	user: IUser | undefined;
	isLoading: boolean;
	logoutUser: () => Promise<void>;
	registerUser: ({ email, password, avatarUrl, name }: IUserRegister) => Promise<any>;
}

interface IAuthProviderProps {
	children: React.ReactNode;
}

export const AuthContext = createContext({} as IAuthContextData);

export const AuthProvider = ({ children }: IAuthProviderProps) => {
	const cookies = nookies.get();

	const {
		data: user,
		isLoading,
		error,
	} = useQuery<IUser>(["user", cookies["token"]], async () => {
		const response = await api.get("/users/profile");
		return response.data;
	});

	const registerUser = async ({ email, password, avatarUrl, name }: IUserRegister) => {
		const { data } = await api.post("/users", { email, password, avatarUrl, name });

		return data;
	};

	const logoutUser = async () => {
		destroyCookie(null, "token");

		caches.keys().then((names) => {
			names.forEach((name) => {
				caches.delete(name);
			});
		});
	};

	return (
		<AuthContext.Provider value={{ user, isLoading, logoutUser, registerUser }}>
			{children}
		</AuthContext.Provider>
	);
};
