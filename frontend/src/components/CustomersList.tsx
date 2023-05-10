import { CustomerContext } from "@/contexts/customerContext";

import { useContext, useEffect, useState } from "react";
import { Customer } from "@/types/customers";
import SearchInput from "./inputs/SearchInput";
import ListCard from "./ListCard";
import { ModalContext } from "@/contexts/modalContext";

interface CustomerListProps {
	customers: Customer[] | null;
	className?: string;
}

export const CustomersList = ({ customers, className = "" }: CustomerListProps) => {
	const { setCustomersList, customersList, setCurrentCustomer } = useContext(CustomerContext);
	const { setMenuMobile } = useContext(ModalContext);
	const [search, setSearch] = useState("");

	useEffect(() => {
		if (customers) {
			setCustomersList(customers);
		}
	}, []);

	return (
		<div
			className={`w-full md:w-2/5 h-[80vh] overflow-hidden flex-col gap-4 hidden md:flex p-4 rounded-2xl overflow-y-auto shadow-md bg-gray-400 bg-clip-padding backdrop-filter bg-opacity-20 backdrop-blur-md ${className}`}
		>
			<SearchInput onChange={(e) => setSearch(e.target.value)} value={search} />
			<hr className="border-white" />
			<ul className="w-full pr-2 overflow-y-scroll flex flex-col gap-4">
				{customersList.length == 0 ? (
					<h2 className="text-2xl text-white">
						Você ainda não possui nenhum cliente cadastrado.
					</h2>
				) : search == "" ? (
					customersList.map((c) => (
						<ListCard
							key={c.id}
							name={c.name}
							handleClick={() => {
								setCurrentCustomer(c.id);
								setMenuMobile(false);
							}}
							avatarUrl={c.avatarUrl}
						/>
					))
				) : (
					customersList
						.filter((e) => e.name.toLowerCase().includes(search.toLowerCase()))
						.map((c) => (
							<ListCard
								key={c.id}
								name={c.name}
								handleClick={() => {
									setCurrentCustomer(c.id);
									setMenuMobile(false);
								}}
								avatarUrl={c.avatarUrl}
							/>
						))
				)}
			</ul>
		</div>
	);
};
