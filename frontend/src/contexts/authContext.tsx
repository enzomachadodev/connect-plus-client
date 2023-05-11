import { api } from "@/services/api";
import { createContext, useContext, useEffect, useState } from "react";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { User, UserCreateRequest, UserLoginRequest } from "@/types/users";
import { UseFormReset } from "react-hook-form";
import { CustomerContext } from "./customerContext";

interface IAuthContextData {
	currentUser: User | null;
	authLoading: boolean;
	loginUser: (
		data: UserLoginRequest,
		reset: UseFormReset<{
			email: string;
			password: string;
		}>
	) => Promise<void>;
	registerUser: (
		data: UserCreateRequest,
		reset: UseFormReset<{
			email: string;
			password: string;
			name: string;
			avatarUrl?: string | undefined;
		}>
	) => Promise<void>;
	logoutUser: () => void;
}

interface IAuthProviderProps {
	children: React.ReactNode;
}

export const AuthContext = createContext({} as IAuthContextData);

export const AuthProvider = ({ children }: IAuthProviderProps) => {
	const { setRetrieveCustomer } = useContext(CustomerContext);
	const route = useRouter();
	const [currentUser, setCurrentUser] = useState<User | null>(null);
	const [authLoading, setAuthLoading] = useState(false);

	const logoutUser = () => {
		setCurrentUser(null);
		destroyCookie(null, "connectplus.token");
		setRetrieveCustomer(null);

		api.defaults.headers.common.Authorization = "";

		fetch("/api/logout")
			.then(() => {
				route.push("/");
			})
			.catch((error) => {
				console.error("Erro ao fazer logout:", error);
			});
	};

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
		data: UserLoginRequest,
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

	const registerUser = async (
		data: UserCreateRequest,
		reset: UseFormReset<{
			email: string;
			password: string;
			name: string;
			avatarUrl?: string | undefined;
		}>
	) => {
		toast.loading("Criando sua conta...");
		setAuthLoading(true);
		try {
			await api.post("/users", data).then((res) => {
				toast.dismiss();
				toast.success("Cadastro feito com sucesso! 🥳");
				setAuthLoading(false);
				reset();
				route.replace("/");
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

	return (
		<AuthContext.Provider
			value={{ logoutUser, currentUser, authLoading, loginUser, registerUser }}
		>
			{children}
		</AuthContext.Provider>
	);
};
