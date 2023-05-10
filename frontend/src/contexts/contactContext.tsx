import { api } from "@/services/api";
import { ContactCreateRequest, ContactUpdateRequest } from "@/types/contacts";
import { AxiosError } from "axios";
import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";
import { CustomerContext } from "./customerContext";

interface ContactContextData {
	createContact: (data: ContactCreateRequest, handleClose: () => void) => Promise<void>;
	updateContact: (
		data: ContactUpdateRequest,
		id: string,
		handleClose: () => void
	) => Promise<void>;
	isLoading: boolean;
	excludeContact: (contactId: string, handleClose: () => void) => Promise<void>;
}

interface ContactProviderProps {
	children: React.ReactNode;
}

export const ContactContext = createContext({} as ContactContextData);

export const ContactProvider = ({ children }: ContactProviderProps) => {
	const [isLoading, setIsLoading] = useState(false);
	const { fetchCustomer } = useContext(CustomerContext);

	const createContact = async (data: ContactCreateRequest, handleClose: () => void) => {
		toast.loading("Adicionando Contato...");
		setIsLoading(true);
		try {
			await api.post("/contacts", data).then((res) => {
				fetchCustomer();
				toast.dismiss();
				setIsLoading(false);
				toast.success("Contato Adiconado!");
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

	const updateContact = async (
		data: ContactUpdateRequest,
		id: string,
		handleClose: () => void
	) => {
		toast.loading("Atualiazando Contato...");
		setIsLoading(true);
		try {
			await api.patch(`/contacts/${id}`, data).then((res) => {
				fetchCustomer();
				toast.dismiss();
				setIsLoading(false);
				toast.success("Contato Atualizado!");
				handleClose();
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

	const excludeContact = async (contactId: string, handleClose: () => void) => {
		toast.loading("Apagando Cliente...");
		setIsLoading(true);
		try {
			await api.delete(`/contacts/${contactId}`).then((res) => {
				toast.dismiss();
				toast.success("Contato Apagado!");
				fetchCustomer();
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
		<ContactContext.Provider
			value={{ excludeContact, createContact, updateContact, isLoading }}
		>
			{children}
		</ContactContext.Provider>
	);
};
