import { SelectedCustomer } from "./SelectedCustomer";
import { BiPlus } from "react-icons/bi";

export const Customer = () => {
	return (
		<div className="h-full w-full md:w-3/5 flex flex-col gap-4">
			<div className="w-full bg-white rounded-lg flex items-center p-4 justify-between">
				<button className="py-2 px-4 bg-black text-white rounded-lg flex items-center gap-1 shadow-sm hover:shadow-lg">
					<span className="text-xl">
						<BiPlus />
					</span>
					New Customer
				</button>
			</div>
			<div className="h-full w-full bg-white p-4 flex flex-col gap-4 rounded-lg">
				<SelectedCustomer />
			</div>
		</div>
	);
};
