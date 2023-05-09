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
	customersListSave: Customer[];
	retrieveCustomer: Customer | null;
	createCustomer: (data: CustomerCreateRequest, handleClose: () => void) => Promise<void>;
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
	const [customersListSave, setCustomersListSave] = useState<Customer[]>(customersList);

	const getAllCustomers = async () => {
		try {
			const { data } = await api.get("/users/customers");
			setCustomersList(data);
			setCustomersListSave(data);
		} catch (err) {
			console.log(err);
			toast.error("Ops! Algo deu errado");
		}
	};

	const getCustomer = async (customerId: string): Promise<Customer | null> => {
		try {
			const { data } = await api.get(`/customers/${customerId}`);
			return data;
		} catch (err) {
			console.log(err);
			toast.error("Ops! Algo deu errado");
			return null;
		}
	};

	useEffect(() => {
		const fetchCustomer = async () => {
			const customer = await getCustomer(currentCustomer);
			setRetrieveCustomer(customer);
		};

		if (currentCustomer) {
			fetchCustomer();
		}
	}, [currentCustomer]);

	const createCustomer = async (data: CustomerCreateRequest, handleClose: () => void) => {
		toast.loading("Adicionando Cliente...");
		try {
			await api.post("/customers", data).then((res) => {
				setCustomerLoading(false);
				toast.dismiss();
				toast.success("Cadastro feito com sucesso!");
				getAllCustomers();
				handleClose();
			});
		} catch (err) {
			toast.dismiss();
			console.log(err);
			if (err instanceof AxiosError) {
				toast.error(err.response?.data.message);
			}
		}
	};

	const updateCustomer = async (data: CustomerUpdateRequest) => {};

	const deleteCustomer = async (customerId: string) => {};

	return (
		<CustomerContext.Provider
			value={{
				retrieveCustomer,
				customerLoading,
				currentCustomer,
				getCustomer,
				setCurrentCustomer,
				customersList,
				setCustomersList,
				customersListSave,
				createCustomer,
			}}
		>
			{children}
		</CustomerContext.Provider>
	);
};
