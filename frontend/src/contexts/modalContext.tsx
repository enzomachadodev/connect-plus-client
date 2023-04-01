import { createContext, SetStateAction, useState } from "react";

interface IModalContextData {
	addCustomer: boolean;
	setAddCustomer: React.Dispatch<SetStateAction<boolean>>;
	editCustomer: boolean;
	setEditCustomer: React.Dispatch<SetStateAction<boolean>>;
	deleteCustomer: boolean;
	setDeleteCustomer: React.Dispatch<SetStateAction<boolean>>;

	addContact: boolean;
	setAddContact: React.Dispatch<SetStateAction<boolean>>;
	editContact: boolean;
	setEditContact: React.Dispatch<SetStateAction<boolean>>;
	deleteContact: boolean;
	setDeleteContact: React.Dispatch<SetStateAction<boolean>>;

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
	const [editCustomer, setEditCustomer] = useState(false);
	const [deleteCustomer, setDeleteCustomer] = useState(false);
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
