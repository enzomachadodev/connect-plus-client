import { FiLogOut, FiX } from "react-icons/fi";
import OutlineButton from "../buttons/OutlineButton";
import Avatar from "./Avatar";
import { AuthContext } from "@/contexts/authContext";
import { useContext } from "react";
import { ModalContext } from "@/contexts/modalContext";
import { CustomersList } from "../CustomersList";
import { Customer } from "@/types/customers";

interface MenuMobileProps {
	customers: Customer[] | null;
}

export const MenuMobile = ({ customers }: MenuMobileProps) => {
	const { currentUser, logoutUser } = useContext(AuthContext);
	const { setMenuMobile, menuMobile } = useContext(ModalContext);
	return (
		<div
			className={`${
				menuMobile ? "" : "hidden"
			} fixed bg-gray-900/90 backdrop-blur-sm w-full h-full z-20 left-0 top-0 p-4 flex flex-col items-center`}
		>
			<div className="flex w-full justify-between items-center">
				<button onClick={() => setMenuMobile(false)} className="">
					<FiX size={40} />
				</button>
				<OutlineButton
					label="Sair"
					Icon={FiLogOut}
					classname="flex-row-reverse gap-4 "
					onClick={logoutUser}
				/>
			</div>
			<div className="flex flex-col mx-auto items-center gap-2 my-8">
				<div className="aspect-square h-20 rounded-full overflow-hidden border border-white p-1">
					<img
						className="object-cover h-full w-full rounded-full"
						src={currentUser?.avatarUrl}
						alt=""
					/>
				</div>
				<h2 className="text-xl">{currentUser?.name}</h2>
			</div>
			<CustomersList customers={customers} className="!flex !h-[65vh]" />
		</div>
	);
};
