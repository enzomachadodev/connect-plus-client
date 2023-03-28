"use client";

import { AuthContext } from "@/contexts/AuthContext";
import { GetServerSideProps } from "next";
import { useContext } from "react";
import nookies from "nookies";
import { Nav } from "@/components/Nav";
import { CustomersList } from "@/components/CustomersList";
import { Customer } from "@/components/Customer";

export default function Dashboard() {
	const { user } = useContext(AuthContext);

	return (
		<>
			<Nav />
			<div className=" container mx-auto my-8 md:flex md:flex-row flex-col justify-between border items-center border-red-500 h-5/6 gap-4">
				<Customer />
				<CustomersList />
			</div>
		</>
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
		props: {},
	};
};
