import { FiEdit, FiTrash2, FiPlus, FiPhone, FiMail, FiUser, FiCalendar } from "react-icons/fi";
import { ICustomerRetrieve } from "@/types/customers";
import { useContext } from "react";
import { ModalContext } from "@/contexts/modalContext";

export const SelectedCustomer = ({
	avatarUrl,
	createdAt,
	email,
	name,
	phone,
	contacts,
}: ICustomerRetrieve) => {
	const { setAddContact, setEditCustomer } = useContext(ModalContext);

	const formatData = (createdAt: Date) => {
		const date = new Date(createdAt);
		const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;

		return `Added in ${formattedDate}`;
	};

	return (
		<>
			<div className="w-full gap-4  rounded-xl flex items-center p-2 md:p-4 shadow-md border border-gray-100 bg-clip-padding backdrop-filter bg-opacity-50 dark:bg-gray-900 dark:bg-clip-padding dark:backdrop-filter dark:bg-opacity-50 dark:border-gray-400">
				<img
					src={avatarUrl}
					alt=""
					className="border border-gray-100 h-28 w-28 rounded-full p-1"
				/>
				<ul>
					<li className="flex flex-row items-center gap-2 flex-nowrap overflow-hidden text-ellipsis">
						<span>
							<FiCalendar />
						</span>
						<h3>{formatData(createdAt)}</h3>
					</li>
					<li className="flex flex-row items-center gap-2 flex-nowrap overflow-hidden text-ellipsis">
						<span>
							<FiUser />
						</span>
						<h3>{name}</h3>
					</li>
					<li className="flex flex-row items-center gap-2 flex-nowrap overflow-hidden text-ellipsis">
						<span>
							<FiPhone />
						</span>
						{phone}
					</li>
					<li className="flex flex-row items-center gap-2 flex-nowrap overflow-hidden text-ellipsis">
						<span>
							<FiMail />
						</span>
						{email}
					</li>
				</ul>
			</div>
			<div className="w-full flex gap-2 md:gap-4 items-center justify-between">
				<button className="flex items-center gap-1 md:gap-2 py-1 px-2 md:py-2 md:px-4 rounded-lg shadow-md border border-gray-100 dark:border-gray-400 bg-clip-padding backdrop-filter bg-opacity-50 hover:shadow-xl transition duration-200">
					<FiTrash2 /> Delete
				</button>
				<button
					onClick={() => setEditCustomer(true)}
					className="flex items-center gap-1 md:gap-2 py-1 px-2 md:py-2 md:px-4 rounded-lg shadow-md border border-gray-100 dark:border-gray-400 bg-clip-padding backdrop-filter bg-opacity-50 hover:shadow-xl transition duration-200"
				>
					<FiEdit /> Edit
				</button>
				<button
					onClick={() => setAddContact(true)}
					className="py-1 px-2 md:py-2 md:px-4 flex items-center gap-1 md:gap-2 rounded-lg bg-gray-100 dark:bg-zinc-800 dark:text-gray-100 dark:border-gray-400 text-gray-700 shadow-md hover:shadow-xl border border-gray-100 transition duration-200"
				>
					<span className="text-xl">
						<FiPlus />
					</span>
					Add contact
				</button>
			</div>

			<ul className="h-2/3  p-2 md:p-4 rounded-xl w-full overflow-y-auto overflow-x-hidden flex flex-col flex-nowrap gap-2 md:gap-4 shadow-md border border-gray-100 bg-clip-padding backdrop-filter bg-opacity-50 dark:bg-gray-900 dark:bg-clip-padding dark:backdrop-filter dark:bg-opacity-50 dark:border-gray-400">
				{contacts?.length ? (
					contacts.map((c) => (
						<li
							key={c.id}
							className="w-full border border-gray-100 dark:border-gray-400 rounded-xl p-2 md:p-4 gap-2 md:gap-4 flex items-center"
						>
							<div className="flex flex-col items-center">
								<div className="h-16 w-16">
									<img
										src={c.avatarUrl}
										alt=""
										className="h-full rounded-full w-full"
									/>
								</div>
								<div className="flex gap-2 mt-2">
									<button className="border border-gray-100 rounded-lg p-1 flex items-center justify-center">
										<FiTrash2 />
									</button>
									<button className="border border-gray-100 rounded-lg p-1 flex items-center justify-center">
										<FiEdit />
									</button>
								</div>
							</div>

							<ul className="w-full flex flex-col items-start justify-center">
								<li className="flex flex-row flex-nowrap items-center gap-2 overflow-hidden text-ellipsis">
									<span>
										<FiCalendar />
									</span>
									<h3>{formatData(c.createdAt)}</h3>
								</li>
								<li className="flex flex-row flex-nowrap items-center gap-2 overflow-hidden text-ellipsis">
									<span>
										<FiUser />
									</span>
									<h3>{c.name}</h3>
								</li>
								<li className="flex flex-row flex-nowrap items-center gap-2 overflow-hidden text-ellipsis">
									<span>
										<FiPhone />
									</span>
									{c.phone}
								</li>
								<li className="flex flex-row flex-nowrap items-center gap-2 overflow-hidden text-ellipsis">
									<span>
										<FiMail />
									</span>
									{c.email}
								</li>
							</ul>
						</li>
					))
				) : (
					<div>
						<h2 className="text-2xl font-semibold">
							This customer does not yet have any contact associated.
						</h2>
					</div>
				)}
			</ul>
		</>
	);
};
