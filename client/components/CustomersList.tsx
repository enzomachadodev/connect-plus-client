import { HiMagnifyingGlass } from "react-icons/hi2";

export const CustomersList = () => {
	return (
		<div className="w-full md:w-2/5  h-full overflow-hidden border border-green-500 flex flex-col gap-4">
			<div className=" bg-white rounded-xl p-4 flex flex-col">
				<div className="flex items-center gap-2">
					<HiMagnifyingGlass />
					<input
						type="text"
						className="border border-gray-200 h-10 pl-2 w-full rounded-lg"
						placeholder="Search customer..."
					/>
				</div>
			</div>
			<ul className="w-full h-full bg-white rounded-xl overflow-y-auto p-4 flex flex-col gap-4">
				<li className="w-full border border-gray-200 p-4 rounded-lg hover:shadow-md">
					Contato
				</li>
			</ul>
		</div>
	);
};
