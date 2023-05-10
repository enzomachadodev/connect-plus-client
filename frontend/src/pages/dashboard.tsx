import { AddContact } from "@/components/modals/AddContact";
import { AddCustomer } from "@/components/modals/AddCustomer";
import { CurrentCustomer } from "@/components/CurrentCustomer.tsx";
import { CustomersList } from "@/components/CustomersList";
import { DeleteContact } from "@/components/modals/DeleteContact";
import { DeleteCustomer } from "@/components/modals/DeleteCustomer";
import { EditContact } from "@/components/modals/EditContact";
import { EditCustomer } from "@/components/modals/EditCustomer";
import { MenuMobile } from "@/components/header/MenuMobile";
import { NavBar } from "@/components/header/NavBar";

import { api } from "@/services/api";
import { Customer } from "@/types/customers";
import { destroyCookie, parseCookies } from "nookies";
import { useContext } from "react";
import { ModalContext } from "@/contexts/modalContext";

interface DashboardProps {
	customers: Customer[] | null;
}

export default function Dashboard({ customers }: DashboardProps) {
	const {
		addCustomer,
		addContact,
		editCustomer,
		editContact,
		deleteCustomer,
		deleteContact,
		menuMobile,
	} = useContext(ModalContext);
	return (
		<div className="w-full h-full overflow-hidden">
			<NavBar />
			<div className="container p-4 max-w-screen-xl mx-auto md:flex md:flex-row flex-col justify-between items-center md:items-start gap-4">
				<CurrentCustomer />
				<CustomersList customers={customers} />
			</div>
			{menuMobile && <MenuMobile customers={customers} />}
			{addCustomer && <AddCustomer />}
			{editCustomer && <EditCustomer />}
			{deleteCustomer && <DeleteCustomer />}
			{addContact && <AddContact />}
			{editContact && <EditContact />}
			{deleteContact && <DeleteContact />}
		</div>
	);
}

export async function getServerSideProps(ctx: any) {
	let customers = null;

	try {
		const { "connectplus.token": token } = parseCookies(ctx);

		if (!token) {
			return {
				redirect: {
					destination: "/",
					permanent: false,
				},
			};
		}
		api.defaults.headers.common.Authorization = `Bearer ${token}`;

		const { data } = await api.get("/users");
		if (!data) {
			return {
				redirect: {
					destination: "/",
					permanent: false,
				},
			};
		} else {
			try {
				const { data } = await api.get("/users/customers");

				customers = data;
			} catch (err) {
				console.log(err);
			}
		}
	} catch (err) {
		destroyCookie(ctx, "nodebooker.token");
		return {
			redirect: {
				destination: "/",
				permanent: false,
			},
		};
	}

	return {
		props: {
			customers,
		},
	};
}
