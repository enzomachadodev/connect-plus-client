import { createContext, SetStateAction, useEffect, useState } from "react";

interface IModalContextData {
	addCustomer: boolean;
	setAddCustomer: React.Dispatch<SetStateAction<boolean>>;
	editCustomer: boolean;
	setEditCustomer: React.Dispatch<SetStateAction<boolean>>;
	addContact: boolean;
	setAddContact: React.Dispatch<SetStateAction<boolean>>;
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
	const [addContact, setAddContact] = useState(false);

	return (
		<ModalContext.Provider
			value={{
				menuMobile,
				setMenuMobile,
				addCustomer,
				setAddCustomer,
				editCustomer,
				setEditCustomer,
				addContact,
				setAddContact,
			}}
		>
			{children}
		</ModalContext.Provider>
	);
};
