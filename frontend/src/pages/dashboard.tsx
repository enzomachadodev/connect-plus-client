import { AddContact } from "@/components/AddContact";
import { AddCustomer } from "@/components/AddCustomer";
import { Customer } from "@/components/Customer";
import { CustomersList } from "@/components/CustomersList";
import { EditCustomer } from "@/components/EditCustomer";
import { MenuMobile } from "@/components/MenuMobile";
import { Nav } from "@/components/Nav";
import { GetServerSideProps } from "next";
import nookies from "nookies";

export default function Dashboard() {
	return (
		<div className="w-full h-screen bg-clip-padding backdrop-filter backdrop-blur-3xl bg-opacity-0 p-2 md:p-0">
			<Nav />
			<div className="container max-w-screen-lg mx-auto my-4 md:flex md:flex-row flex-col justify-between items-center h-5/6 gap-4">
				<Customer />
				<CustomersList />
			</div>
			<MenuMobile />
			<AddCustomer />
			<EditCustomer />
			<AddContact />
		</div>
	);
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const cookies = nookies.get(ctx);

	if (!cookies["token"]) {
		return {
			redirect: {
				destination: "/",
				permanent: false,
			},
		};
	}
	return {
		props: { name: cookies["token"] },
	};
};
