import { FiMoon, FiSun } from "react-icons/fi";
import { useRouter } from "next/router";
import { CgMenuGridO } from "react-icons/cg";
import { useTheme } from "next-themes";
import { useCallback, useContext, useEffect, useState } from "react";
import { ModalContext } from "@/contexts/modalContext";
import { AuthContext } from "@/contexts/authContext";
import logo from "../../public/logo.png";
import Image from "next/image";

export const Nav = () => {
	const { user, isLoading, logoutUser } = useContext(AuthContext);
	const { setMenuMobile } = useContext(ModalContext);
	const router = useRouter();
	const { theme, setTheme } = useTheme();
	const [color, setColor] = useState(false);

	const handleLogout = () => {
		logoutUser();
		router.push("/");
	};
	useEffect(() => {
		if (color) {
			setTheme("light");
		} else {
			setTheme("dark");
		}
	}, [color]);

	return (
		<div className="p-2 md:p-4 flex items-center justify-center border md:border-0 md:border-b rounded-xl md:rounded-none border-gray-100 bg-gray-100 bg-clip-padding backdrop-filter bg-opacity-50 dark:bg-gray-900 dark:bg-clip-padding dark:backdrop-filter dark:bg-opacity-50 dark:border-gray-400">
			<div className="container max-w-screen-lg flex justify-between items-center">
				<Image src={logo} alt="" className="w-32" />
				<button onClick={() => setMenuMobile(true)} className="text-3xl flex md:hidden">
					<CgMenuGridO />
				</button>

				<div className="md:flex items-center gap-4 hidden">
					<button
						onClick={() => setColor(true)}
						className={`${color ? "hidden" : ""} text-2xl`}
					>
						<FiSun />
					</button>
					<button
						onClick={() => setColor(false)}
						className={`${color ? "" : "hidden"} text-2xl`}
					>
						<FiMoon />
					</button>
					{!isLoading ? (
						<div className="flex items-center gap-2">
							<h2 className="">{user?.name}</h2>
							<div className="h-10 w-10 rounded-full overflow-hidden border border-gray-100 dark:border-gray-400 p-1">
								<img
									className="h-full w-full rounded-full"
									src={user?.avatarUrl}
									alt=""
								/>
							</div>
							<button
								className="py-2 px-4 flex items-center gap-1 rounded-lg bg-gray-100 dark:bg-zinc-800 dark:text-gray-100 dark:border-gray-400 text-gray-700 shadow-md hover:shadow-xl border border-gray-100 transition duration-200"
								onClick={handleLogout}
							>
								Logout
							</button>
						</div>
					) : (
						<h1>Loading</h1>
					)}
				</div>
			</div>
		</div>
	);
};
