interface DefaultInputProps {
	id: string;
	label: string;
	type: string;
	register: any;
	errors: boolean;
	errorMessage?: string;
	value?: string;
}

const DefaultInput = ({
	id,
	label,
	type = "text",
	register,
	errors,
	errorMessage,
	value,
}: DefaultInputProps) => {
	return (
		<div className="my-4">
			<input
				id={id}
				value={value}
				placeholder={label}
				type={type}
				{...register(id)}
				className={`pl-4 w-full text-gray-900 h-14 rounded-xl border-2 ${
					errors ? "border-red-500" : ""
				}`}
			/>
			<p className=" text-red-500">{errorMessage}</p>
		</div>
	);
};

export default DefaultInput;
