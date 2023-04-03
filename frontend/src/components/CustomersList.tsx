import { CustomerContext } from "@/contexts/customerContext";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useContext, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { Loader } from "./Loader";

export const CustomersList = () => {
	const {
		setCurrentCustomer,
		customersList,
		defaultCustomerList,
		setCustomersList,
		listLoading,
	} = useContext(CustomerContext);
	const queryClient = useQueryClient();

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.value === "") {
			setCustomersList(defaultCustomerList!);
		} else {
			setCustomersList(
				defaultCustomerList!.filter((e) =>
					e.name.toLowerCase().includes(event.target.value.toLowerCase())
				)
			);
		}
	};

	return (
		<div className="w-full md:w-2/5  h-full overflow-hidden flex-col gap-4 hidden md:flex">
			<div className="rounded-xl p-4 h-24 flex items-center gap-4 border border-gray-100 shadow-md bg-gray-100 bg-clip-padding backdrop-filter bg-opacity-50 dark:bg-gray-900 dark:bg-clip-padding dark:backdrop-filter dark:bg-opacity-50 dark:border-gray-400">
				<span className="text-xl">
					<FiSearch />
				</span>

				<input
					type="text"
					onChange={handleInputChange}
					className="border border-gray-100 dark:border-gray-400 h-10 pl-2 w-full rounded-lg"
					placeholder="Search customer..."
				/>
			</div>
			<ul className="w-full h-full rounded-xl overflow-y-auto p-4 flex flex-col gap-4 border border-gray-100 shadow-md bg-gray-100 bg-clip-padding backdrop-filter bg-opacity-50 dark:bg-gray-900 dark:bg-clip-padding dark:backdrop-filter dark:bg-opacity-50 dark:border-gray-400">
				{listLoading ? (
					<Loader />
				) : (
					customersList?.map((c) => (
						<li
							onClick={() => {
								setCurrentCustomer(c.id);
								queryClient.invalidateQueries(["selected"]);
							}}
							key={c.id}
							className="flex p-4 items-center gap-4 rounded-xl hover:shadow-lg active:shadow-sm border border-gray-100 shadow-md bg-gray-100 bg-clip-padding backdrop-filter bg-opacity-50 dark:bg-gray-900 dark:bg-clip-padding dark:backdrop-filter dark:bg-opacity-50 dark:border-gray-400 cursor-pointer"
						>
							<img
								className="border border-gray-200 w-8 h-8 rounded-full "
								src={c.avatarUrl}
								alt=""
							/>
							<h2>{c.name}</h2>
						</li>
					))
				)}
			</ul>
		</div>
	);
};
