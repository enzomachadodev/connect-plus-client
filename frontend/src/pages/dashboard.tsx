import { AddContact } from "@/components/AddContact";
import { AddCustomer } from "@/components/modals/AddCustomer";
import { CurrentCustomer } from "@/components/CurrentCustomer.tsx";
import { CustomersList } from "@/components/CustomersList";
import { DeleteContact } from "@/components/DeleteContact";
import { DeleteCustomer } from "@/components/DeleteCustomer";
import { EditContact } from "@/components/EditContact";
import { EditCustomer } from "@/components/modals/EditCustomer";
import { MenuMobile } from "@/components/MenuMobile";
import { NavBar } from "@/components/header/NavBar";

import { api } from "@/services/api";
import { Customer } from "@/types/customers";
import { destroyCookie, parseCookies } from "nookies";

interface DashboardProps {
	customers: Customer[] | null;
}

export default function Dashboard({ customers }: DashboardProps) {
	return (
		<div className="w-full h-full border overflow-hidden">
			<NavBar />
			<div className="container p-4 max-w-screen-xl mx-auto md:flex md:flex-row flex-col justify-between items-center md:items-start gap-4">
				<CurrentCustomer />
				<CustomersList customers={customers} />
			</div>
			{/* <MenuMobile /> */}
			<AddCustomer />
			{/*<EditCustomer />
			<DeleteCustomer />
			<AddContact />
			<EditContact />
			<DeleteContact /> */}
		</div>
	);
}

export async function getServerSideProps(ctx: any) {
	let customers = null;

	try {
		const { "connectplus.token": token } = parseCookies(ctx);

		console.log(token, "@@@@@@@");

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

	try {
		const { data } = await api.get("/users/customers");

		customers = data;
	} catch (err) {
		console.log(err);
	}

	return {
		props: {
			customers,
		},
	};
}
