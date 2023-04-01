import { api } from "@/services/api";
import { IContact } from "@/types/contacts";
import { ICustomer, ICustomerRetrieve } from "@/types/customers";
import { useQuery } from "@tanstack/react-query";
import { createContext, SetStateAction, useCallback, useEffect, useState } from "react";

interface ICustomerContextData {
	currentCustomer: string;
	setCurrentCustomer: React.Dispatch<SetStateAction<string>>;
	defaultCustomerList: ICustomer[] | undefined;
	customersList: ICustomer[] | undefined;
	setCustomersList: React.Dispatch<SetStateAction<ICustomer[]>>;
	listLoading: boolean;
	customerRetrieve: ICustomerRetrieve | undefined;
	retrieveLoading: boolean;
	selectedContact: IContact | undefined;
	setSelectedContact: React.Dispatch<SetStateAction<IContact | undefined>>;
}

interface ICustomerProviderProps {
	children: React.ReactNode;
}

export const CustomerContext = createContext({} as ICustomerContextData);

export const CustomerProvider = ({ children }: ICustomerProviderProps) => {
	const [currentCustomer, setCurrentCustomer] = useState("");
	const [customersList, setCustomersList] = useState<ICustomer[]>([]);
	const [selectedContact, setSelectedContact] = useState<IContact | undefined>();
	const { data: defaultCustomerList, isLoading: listLoading } = useQuery<ICustomer[]>(
		["customer"],
		async () => {
			const response = await api.get(`/users/customers`);
			return response.data;
		}
	);

	useEffect(() => {
		if (defaultCustomerList) {
			setCustomersList(defaultCustomerList);
		}
	}, [defaultCustomerList]);

	const { data: customerRetrieve, isLoading: retrieveLoading } = useQuery<ICustomerRetrieve>(
		["selected", currentCustomer],
		async () => {
			if (currentCustomer !== "") {
				const response = await api.get(`/customers/${currentCustomer}`);
				return response.data;
			}
			return;
		}
	);

	return (
		<CustomerContext.Provider
			value={{
				currentCustomer,
				setCurrentCustomer,
				listLoading,
				defaultCustomerList,
				customersList,
				setCustomersList,
				retrieveLoading,
				customerRetrieve,
				selectedContact,
				setSelectedContact,
			}}
		>
			{children}
		</CustomerContext.Provider>
	);
};
