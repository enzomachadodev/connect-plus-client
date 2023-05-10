import React from "react";
import { FiSearch } from "react-icons/fi";
interface SearchInputProps {
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	value: string;
}

const SearchInput = ({ onChange, value }: SearchInputProps) => {
	return (
		<div className="text-white flex items-center gap-4 px-4 min-h-[54px] rounded-xl border border-white">
			<span className="">
				<FiSearch size={25} />
			</span>
			<input
				onChange={onChange}
				type="text"
				value={value}
				className="appearance-none border-none bg-transparent focus:outline-none "
			/>
		</div>
	);
};

export default SearchInput;
