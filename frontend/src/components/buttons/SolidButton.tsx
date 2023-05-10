import { IconType } from "react-icons";

interface SolidButtonProps {
	label: string;
	type?: "button" | "submit" | "reset" | undefined;
	onClick?: () => void;
	Icon?: IconType;
	classname?: string;
	iconSize?: number;
	disabled?: boolean;
}

const SolidButton = ({
	label,
	onClick,
	type = "button",
	Icon,
	classname = "",
	iconSize = 25,
	disabled = false,
}: SolidButtonProps) => {
	return (
		<button
			disabled={disabled}
			type={type}
			onClick={onClick}
			className={`${classname} py-3 px-5 bg-violet-800 border-1 border-gray-700 gap-1 flex items-center justify-center text-white shadow-md transition duration-200 rounded-xl text-lg disabled:opacity-50`}
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
