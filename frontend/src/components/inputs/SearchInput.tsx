import React from "react";
import { FiSearch } from "react-icons/fi";

const SearchInput = () => {
	return (
		<div className="flex items-center gap-2 px-4 h-[56px] rounded-xl hover:shadow-lg active:shadow-sm  shadow-md bg-gray-100 bg-clip-padding backdrop-filter bg-opacity-50">
			<FiSearch size={25} />
			<input
				type="text"
				className="appearance-none border-none bg-transparent focus:outline-none "
			/>
		</div>
	);
};

export default SearchInput;
