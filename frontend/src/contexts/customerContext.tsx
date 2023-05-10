import { api } from "@/services/api";
import { Customer, CustomerCreateRequest, CustomerUpdateRequest } from "@/types/customers";
import { AxiosError } from "axios";

import { createContext, useEffect, useState } from "react";
import { UseFormReset } from "react-hook-form";
import { toast } from "react-toastify";

interface ICustomerContextData {
	customerLoading: boolean;
	currentCustomer: string;
	setCurrentCustomer: React.Dispatch<React.SetStateAction<string>>;
	getCustomer: (customerId: string) => Promise<Customer | null>;
	customersList: Customer[];
	setCustomersList: React.Dispatch<React.SetStateAction<Customer[]>>;
	retrieveCustomer: Customer | null;
	createCustomer: (data: CustomerCreateRequest, handleClose: () => void) => Promise<void>;
	updateCustomer: (
		data: CustomerUpdateRequest,
		id: string,
		handleClose: () => void
	) => Promise<void>;
	excludeCustomer: (customerId: string, handleClose: () => void) => Promise<void>;
	fetchCustomer: () => Promise<void>;
	isLoading: boolean;
}

interface ICustomerProviderProps {
	children: React.ReactNode;
}

export const CustomerContext = createContext({} as ICustomerContextData);

export const CustomerProvider = ({ children }: ICustomerProviderProps) => {
	const [customerLoading, setCustomerLoading] = useState(false);
	const [currentCustomer, setCurrentCustomer] = useState("");
	const [retrieveCustomer, setRetrieveCustomer] = useState<Customer | null>(null);
	const [customersList, setCustomersList] = useState<Customer[]>([]);
	const [isLoading, setIsLoading] = useState(false);

	const getAllCustomers = async () => {
		try {
			const { data } = await api.get("/users/customers");
			setCustomersList(data);
		} catch (err) {
			console.log(err);
			toast.error("Ops! Algo deu errado");
		}
	};

	const getCustomer = async (customerId: string): Promise<Customer | null> => {
		try {
			const { data } = await api.get(`/customers/${customerId}`);
			setCustomerLoading(false);
			return data;
		} catch (err) {
			console.log(err);
			toast.error("Ops! Algo deu errado");
			return null;
		}
	};
	const fetchCustomer = async () => {
		const customer = await getCustomer(currentCustomer);
		setRetrieveCustomer(customer);
	};

	useEffect(() => {
		if (currentCustomer) {
			setCustomerLoading(true);
			fetchCustomer().finally(() => {
				setCustomerLoading(false);
			});
		}
	}, [currentCustomer]);

	const createCustomer = async (data: CustomerCreateRequest, handleClose: () => void) => {
		toast.loading("Adicionando Cliente...");
		setIsLoading(true);

		try {
			await api.post("/customers", data).then((res) => {
				setIsLoading(false);
				toast.dismiss();
				getAllCustomers();
				toast.success("Cliente Adiconado!");
				handleClose();
			});
		} catch (err) {
			toast.dismiss();
			setIsLoading(false);
			console.log(err);
			if (err instanceof AxiosError) {
				toast.error(err.response?.data.message);
			}
		}
	};

	const updateCustomer = async (
		data: CustomerUpdateRequest,
		id: string,
		handleClose: () => void
	) => {
		toast.loading("Atualiazando Cliente...");
		setIsLoading(true);
		try {
			await api.patch(`/customers/${id}`, data).then((res) => {
				getAllCustomers();
				fetchCustomer();
				toast.dismiss();
				toast.success("Cliente Atualizado!");
				handleClose();
				setIsLoading(false);
			});
		} catch (err) {
			toast.dismiss();
			console.log(err);
			setIsLoading(false);
			if (err instanceof AxiosError) {
				toast.error(err.response?.data.message);
			}
		}
	};

	const excludeCustomer = async (customerId: string, handleClose: () => void) => {
		toast.loading("Apagando Cliente...");
		setIsLoading(true);
		try {
			await api.delete(`/customers/${customerId}`).then((res) => {
				getAllCustomers();
				setCurrentCustomer("");
				setRetrieveCustomer(null);
				toast.dismiss();
				toast.success("Cliente Apagado!");
				handleClose();
				setIsLoading(false);
			});
		} catch (err) {
			toast.dismiss();
			setIsLoading(false);
			console.log(err);
			if (err instanceof AxiosError) {
				toast.error(err.response?.data.message);
			}
		}
	};

	return (
		<CustomerContext.Provider
			value={{
				isLoading,
				fetchCustomer,
				retrieveCustomer,
				customerLoading,
				currentCustomer,
				getCustomer,
				setCurrentCustomer,
				customersList,
				setCustomersList,
				createCustomer,
				updateCustomer,
				excludeCustomer,
			}}
		>
			{children}
		</CustomerContext.Provider>
	);
};
