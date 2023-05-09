import { FiCalendar, FiEdit, FiMail, FiPhone, FiTrash2, FiUser } from "react-icons/fi";

interface ContactCardProps {
	onDelete: () => void;
	onEdit: () => void;
	avatarUrl: string;
	name: string;
	email: string;
	phone: string;
	createdAt: string;
}

const ContactCard = ({
	avatarUrl,
	name,
	email,
	phone,
	createdAt,
	onDelete,
	onEdit,
}: ContactCardProps) => {
	return (
		<li className="w-full border border-gray-100 dark:border-gray-400 rounded-xl p-2 md:p-4 gap-2 md:gap-4 flex items-center">
			<div className="flex flex-col items-center">
				<div className="h-16 w-16">
					<img src={avatarUrl} alt="" className="h-full rounded-full w-full" />
				</div>
				<div className="flex gap-2 mt-2">
					<button
						onClick={onDelete}
						className="border border-gray-100 rounded-lg p-1 flex items-center justify-center"
					>
						<FiTrash2 />
					</button>
					<button
						onClick={onEdit}
						className="border border-gray-100 rounded-lg p-1 flex items-center justify-center"
					>
						<FiEdit />
					</button>
				</div>
			</div>

			<ul className="w-full flex flex-col items-start justify-center">
				<li className="flex flex-row flex-nowrap items-center gap-2 overflow-hidden text-ellipsis">
					<span>
						<FiCalendar />
					</span>
					<h3>{createdAt}</h3>
				</li>
				<li className="flex flex-row flex-nowrap items-center gap-2 overflow-hidden text-ellipsis">
					<span>
						<FiUser />
					</span>
					<h3>{name}</h3>
				</li>
				<li className="flex flex-row flex-nowrap items-center gap-2 overflow-hidden text-ellipsis">
					<span>
						<FiMail />
					</span>
					{email}
				</li>
				<li className="flex flex-row flex-nowrap items-center gap-2 overflow-hidden text-ellipsis">
					<span>
						<FiPhone />
					</span>
					{phone}
				</li>
			</ul>
		</li>
	);
};

export default ContactCard;
