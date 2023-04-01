import { FiMoon, FiSearch, FiSun, FiX } from "react-icons/fi";
import { AuthContext } from "@/contexts/authContext";
import { CustomerContext } from "@/contexts/customerContext";
import { ModalContext } from "@/contexts/modalContext";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { Loader } from "./Loader";

export const MenuMobile = () => {
	const { menuMobile, setMenuMobile } = useContext(ModalContext);
	const {
		setCurrentCustomer,
		customersList,
		defaultCustomerList,
		setCustomersList,
		listLoading,
	} = useContext(CustomerContext);
	const { user, logoutUser } = useContext(AuthContext);
	const router = useRouter();
	const { setTheme, theme } = useTheme();
	const [search, setSearch] = useState<string>("");

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value);

		if (search === "") {
			console.log(defaultCustomerList);
			setCustomersList(defaultCustomerList!.reverse());
		} else {
			setCustomersList(
				defaultCustomerList!.filter((e) =>
					e.name.toLowerCase().includes(search.toLowerCase())
				)
			);
		}
	};

	const handleLogout = () => {
		logoutUser();
		router.push("/");
	};
	return (
		<div
			className={`${
				menuMobile ? "" : "hidden"
			} fixed w-full h-full z-20 left-0 top-0 bg-gray-300 bg-clip-padding backdrop-filter backdrop-blur-2xl bg-opacity-80 p-4 md:p-2 flex flex-col items-end dark:bg-zinc-900 dark:bg-clip-padding dark:backdrop-filter dark:backdrop-blur-2xl dark:bg-opacity-80`}
		>
			<button onClick={() => setMenuMobile(false)} className="text-3xl right-0 top-0">
				<FiX />
			</button>
			<div className="flex flex-col w-full max-h-11/12 overflow-x-hidden">
				<div className="w-full h-1/3 flex flex-col items-start gap-4 p-4">
					<div className="flex items-center gap-4">
						<div className="h-10 w-10 rounded-full overflow-hidden border border-gray-100 dark:border-gray-400 p-1">
							<img
								className="h-full w-full rounded-full"
								src={user?.avatarUrl}
								alt=""
							/>
						</div>
						<h2 className="">{user?.name}</h2>
					</div>
					<div className="flex items-center gap-4">
						<button
							onClick={() => setTheme("light")}
							className={`${theme === "light" ? "hidden" : ""} text-2xl`}
						>
							<FiSun />
						</button>
						<button
							onClick={() => setTheme("dark")}
							className={`${theme === "dark" ? "hidden" : ""} text-2xl`}
						>
							<FiMoon />
						</button>
						<button
							className="py-2 px-4 flex items-center gap-1 rounded-lg bg-gray-100 dark:bg-zinc-800 dark:text-gray-100 dark:border-gray-400 text-gray-700 shadow-md hover:shadow-xl border border-gray-100 transition duration-200"
							onClick={handleLogout}
						>
							Logout
						</button>
					</div>
				</div>
				<div className="rounded-xl p-4 flex items-center gap-4 border border-gray-100 shadow-md bg-gray-100 bg-clip-padding backdrop-filter bg-opacity-50">
					<span className="text-xl">
						<FiSearch />
					</span>

					<input
						type="text"
						onChange={handleInputChange}
						value={search}
						className="border border-gray-200 h-10 pl-2 w-full rounded-lg"
						placeholder="Search customer..."
					/>
				</div>
				<ul className="w-full h-full rounded-xl overflow-y-auto p-4 flex flex-col gap-4 ">
					{listLoading ? (
						<Loader />
					) : (
						customersList?.map((c) => (
							<li
								onClick={() => {
									setCurrentCustomer(c.id);
									setMenuMobile(false);
								}}
								key={c.id}
								className="flex p-4 items-center gap-4 rounded-xl hover:shadow-lg active:shadow-sm border border-gray-100 shadow-md bg-gray-100 bg-clip-padding backdrop-filter bg-opacity-50"
							>
								<img
									className="border border-gray-200 w-8 h-8 rounded-full "
									src={c.avatarUrl}
									alt=""
								/>
								<h2>{c.name}</h2>
							</li>
						))
					)}
				</ul>
			</div>
		</div>
	);
};
