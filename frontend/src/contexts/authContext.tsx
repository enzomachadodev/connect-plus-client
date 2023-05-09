import { api } from "@/services/api";
import { createContext, useEffect, useState } from "react";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { User } from "@/types/users";
import { UseFormReset } from "react-hook-form";

interface IAuthContextData {
	currentUser: User | null;
	authLoading: boolean;
	setAuthLoading: React.Dispatch<React.SetStateAction<boolean>>;
	loginUser: (
		data: any,
		reset: UseFormReset<{
			email: string;
			password: string;
		}>
	) => Promise<void>;
}

interface IAuthProviderProps {
	children: React.ReactNode;
}

export const AuthContext = createContext({} as IAuthContextData);

export const AuthProvider = ({ children }: IAuthProviderProps) => {
	const route = useRouter();
	const [currentUser, setCurrentUser] = useState<User | null>(null);
	const [authLoading, setAuthLoading] = useState(false);

	const getUser = async () => {
		try {
			const { "connectplus.token": token } = parseCookies();

			if (token) {
				api.defaults.headers.common.Authorization = `Bearer ${token}`;
				const { data } = await api.get("/users");
				setCurrentUser(data);
			}
		} catch (err) {
			setCurrentUser(null);
			console.error(err);
			destroyCookie(null, "connectplus.token");
		}
	};

	useEffect(() => {
		getUser();
	}, []);

	const loginUser = async (
		data: any,
		reset: UseFormReset<{
			email: string;
			password: string;
		}>
	) => {
		setAuthLoading(true);
		toast.loading("Verificando credenciais...");
		try {
			await api.post("/session", data).then((res) => {
				const { token } = res.data;

				setCookie(undefined, "connectplus.token", token, {
					maxAge: 60 * 60 * 24, // 1 day
				});

				api.defaults.headers.common.Authorization = `Bearer ${token}`;

				getUser();
				reset();
				route.push("/dashboard");
				setAuthLoading(false);
				toast.dismiss();
				toast.success("Bem vindo de volta!");
			});
		} catch (err) {
			toast.dismiss();
			setAuthLoading(false);
			console.log(err);
			if (err instanceof AxiosError) {
				toast.error(err.response?.data.message);
			}
		}
	};

	const registerUser = async (data: any) => {
		setAuthLoading(true);
		try {
			await api.post("/users", data).then((res) => {
				setAuthLoading(false);
				toast.success("Cadastro feito com sucesso! 🥳");
				route.push("/dashboard");
			});
		} catch (err) {
			setAuthLoading(false);
			if (err instanceof AxiosError) {
				toast.error(err.response?.data.message);
			}
		}
	};

	return (
		<AuthContext.Provider value={{ currentUser, authLoading, setAuthLoading, loginUser }}>
			{children}
		</AuthContext.Provider>
	);
};
