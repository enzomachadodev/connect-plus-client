import { CustomerContext } from "@/contexts/customerContext";

import { useContext, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { Loader } from "./Loader";
import { Customer } from "@/types/customers";
import SearchInput from "./inputs/SearchInput";
import ListCard from "./ListCard";

interface CustomerListProps {
	customers: Customer[] | null;
}

export const CustomersList = ({ customers }: CustomerListProps) => {
	const { setCustomersList, customersList, setCurrentCustomer, customersListSave } =
		useContext(CustomerContext);

	useEffect(() => {
		if (customers) {
			setCustomersList(customers);
		}
	}, []);

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.value === "") {
			setCustomersList(customersListSave);
		} else {
			setCustomersList(
				customersListSave.filter((e) =>
					e.name.toLowerCase().includes(event.target.value.toLowerCase())
				)
			);
		}
	};

	return (
		<div className="w-full md:w-2/5 min-h-[500px] overflow-hidden flex-col gap-4 hidden md:flex p-4 rounded-2xl overflow-y-auto shadow-md bg-gray-400 bg-clip-padding backdrop-filter bg-opacity-20 backdrop-blur-md">
			<SearchInput />
			<hr className="border-gray-700" />
			<ul className="w-full h-full overflow-y-auto flex flex-col gap-4">
				{customersList?.map((c) => (
					<ListCard
						key={c.id}
						name={c.name}
						handleClick={() => {
							setCurrentCustomer(c.id);
						}}
						avatarUrl={c.avatarUrl}
					/>
				))}
			</ul>
		</div>
	);
};
