import { IconType } from "react-icons";

interface OutlineButtonProps {
	label: string;
	type?: "button" | "submit" | "reset" | undefined;
	onClick?: () => void;
	Icon?: IconType;
	classname?: string;
	iconSize?: number;
}

const OutlineButton = ({
	label,
	onClick,
	type = "button",
	Icon,
	classname = "",
	iconSize = 25,
}: OutlineButtonProps) => {
	return (
		<button
			type={type}
			onClick={onClick}
			className={`${classname} py-3 px-5 gap-1 flex items-center justify-center font-medium border border-white text-white shadow-md duration-200 rounded-xl text-lg`}
		>
			{Icon && (
				<span className="ml-[-1px] mr-[2px]">
					<Icon size={iconSize} />
				</span>
			)}
			<p>{label}</p>
		</button>
	);
};

export default OutlineButton;
