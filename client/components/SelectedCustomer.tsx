import { BsDownload } from "react-icons/bs";
import { BiPlus } from "react-icons/bi";

export const SelectedCustomer = () => {
	return (
		<>
			<div className="h-1/3 bg-gray-500 w-full"></div>
			<div className="w-full flex gap-4 items-center justify-between">
				<button className="py-2 px-4 border border-gray-200 rounded-lg flex items-center gap-2 hover:shadow-lg">
					<BsDownload /> Download report
				</button>
				<button className="py-2 px-4 rounded-lg bg-black text-white flex items-center gap-1">
					<span className="text-xl">
						<BiPlus />
					</span>
					Add contact
				</button>
			</div>

			<ul className="h-2/3 border border-gray-200 p-4 rounded-lg w-full overflow-y-auto flex flex-row flex-wrap">
				<li className="w-full h-32 border border-gray-200 rounded-lg"></li>
				<li className="w-full h-32 border border-gray-200"></li>
				<li className="w-full h-32 border border-gray-200"></li>
				<li className="w-full h-32 border border-gray-200"></li>
			</ul>
		</>
	);
};
