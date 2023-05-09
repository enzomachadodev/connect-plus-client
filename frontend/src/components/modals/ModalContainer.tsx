import { FiX } from "react-icons/fi";

interface ModalContainerProps {
	children: React.ReactNode;
	onClose: () => void;
	isOpen: boolean;
}

const ModalContainer = ({ children, onClose, isOpen }: ModalContainerProps) => {
	return (
		<div
			onClick={(e) => {
				const target = e.target as HTMLElement;
				if (target.id === "overlay") {
					onClose();
				}
			}}
			id="overlay"
			className={`${
				isOpen ? "" : "hidden"
			} fixed bg-black/50 w-full h-full z-20 left-0 top-0`}
		>
			<div className="absolute p-8 pt-10 w-4/5 max-w-md top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-3xl flex flex-col gap-6  shadow-lg bg-gray-100">
				<button onClick={() => onClose()} className="absolute top-2 right-2 text-3xl">
					<FiX size={25} />
				</button>
				{children}
			</div>
		</div>
	);
};

export default ModalContainer;
