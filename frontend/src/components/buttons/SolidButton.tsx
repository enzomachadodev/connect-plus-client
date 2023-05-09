import { IconType } from "react-icons";

interface SolidButtonProps {
	label: string;
	type?: "button" | "submit" | "reset" | undefined;
	onClick?: () => void;
	Icon?: IconType;
	classname?: string;
	iconSize?: number;
}

const SolidButton = ({
	label,
	onClick,
	type = "button",
	Icon,
	classname = "",
	iconSize = 25,
}: SolidButtonProps) => {
	return (
		<button
			type={type}
			onClick={onClick}
			className={`${classname} py-3 px-5 bg-violet-800 hover:bg-violet-900 border-1 border-gray-700 hover:border-gray-600 gap-1 flex items-center justify-center text-white shadow-md hover:shadow-xl  transition duration-200 rounded-xl text-lg`}
		>
			{Icon && (
				<span className="-ml-1">
					<Icon size={iconSize} />
				</span>
			)}

			{label}
		</button>
	);
};

export default SolidButton;
