import { Contact } from "@/types/contacts";
import { Customer } from "@/types/customers";
import { createContext, SetStateAction, useState } from "react";

interface IModalContextData {
	addCustomer: boolean;
	setAddCustomer: React.Dispatch<SetStateAction<boolean>>;
	editCustomer: Customer | null;
	setEditCustomer: React.Dispatch<SetStateAction<Customer | null>>;
	deleteCustomer: string;
	setDeleteCustomer: React.Dispatch<SetStateAction<string>>;

	addContact: boolean;
	setAddContact: React.Dispatch<SetStateAction<boolean>>;
	editContact: Contact | null;
	setEditContact: React.Dispatch<SetStateAction<Contact | null>>;
	deleteContact: string;
	setDeleteContact: React.Dispatch<SetStateAction<string>>;

	menuMobile: boolean;
	setMenuMobile: React.Dispatch<SetStateAction<boolean>>;
}

interface IModalProviderProps {
	children: React.ReactNode;
}

export const ModalContext = createContext({} as IModalContextData);

export const ModalProvider = ({ children }: IModalProviderProps) => {
	const [menuMobile, setMenuMobile] = useState(false);
	const [addCustomer, setAddCustomer] = useState(false);
	const [editCustomer, setEditCustomer] = useState<Customer | null>(null);
	const [deleteCustomer, setDeleteCustomer] = useState<string>("");
	const [addContact, setAddContact] = useState(false);
	const [editContact, setEditContact] = useState(false);
	const [deleteContact, setDeleteContact] = useState(false);

	return (
		<ModalContext.Provider
			value={{
				menuMobile,
				setMenuMobile,
				addCustomer,
				setAddCustomer,
				editCustomer,
				setEditCustomer,
				deleteCustomer,
				setDeleteCustomer,
				addContact,
				setAddContact,
				editContact,
				setEditContact,
				deleteContact,
				setDeleteContact,
			}}
		>
			{children}
		</ModalContext.Provider>
	);
};
