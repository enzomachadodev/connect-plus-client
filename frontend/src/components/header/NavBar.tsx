import { useRouter } from "next/router";
import { CgMenuGridO } from "react-icons/cg";
import { ModalContext } from "@/contexts/modalContext";
import { AuthContext } from "@/contexts/authContext";
import Image from "next/image";
import { useContext } from "react";
import Avatar from "./Avatar";

export const NavBar = () => {
	const { currentUser } = useContext(AuthContext);
	const { setMenuMobile } = useContext(ModalContext);
	const router = useRouter();

	const handleLogout = () => {
		//logoutUser();
		router.push("/");
	};

	return (
		<div className="flex items-center mx-auto container max-w-screen-xl justify-center pt-4 px-4">
			<div className="p-4 w-full flex justify-between items-center rounded-2xl overflow-y-auto shadow-md bg-gray-400 bg-clip-padding backdrop-filter bg-opacity-20 backdrop-blur-md">
				<Image
					src={"/images/logo.png"}
					width={1000}
					height={1000}
					alt=""
					className="w-32"
				/>
				<button onClick={() => setMenuMobile(true)} className="text-3xl flex md:hidden">
					<CgMenuGridO size={45} />
				</button>

				<div className="md:flex items-center gap-4 hidden">
					{currentUser ? (
						<Avatar
							name={currentUser.name}
							avatarUrl={currentUser.avatarUrl}
							handleLogout={handleLogout}
						/>
					) : (
						<h1>fazer login</h1>
					)}
				</div>
			</div>
		</div>
	);
};
