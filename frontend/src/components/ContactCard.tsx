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
		<li className="w-full rounded-xl p-4 gap-4 flex items-centerflex  items-center bg-gray-400 bg-clip-padding backdrop-filter bg-opacity-0 backdrop-blur-md">
			<div className="flex flex-col items-center w-20">
				<div className="h-14 md:h-16 w-14 md:w-16">
					<img
						src={avatarUrl}
						alt=""
						className="h-full rounded-full w-full object-cover"
					/>
				</div>
				<div className="flex w-full justify-around mt-2">
					<button onClick={onDelete} className=" flex items-center justify-center">
						<FiTrash2 />
					</button>
					<button onClick={onEdit} className="flex items-center justify-center">
						<FiEdit />
					</button>
				</div>
			</div>

			<ul className="w-full flex flex-col items-start justify-center overflow-hidden">
				<li className="flex flex-row flex-nowrap whitespace-nowrap items-center gap-2 overflow-hidden text-ellipsis">
					<span>
						<FiCalendar />
					</span>
					<h3>{createdAt}</h3>
				</li>
				<li className="flex flex-row flex-nowrap whitespace-nowrap items-center gap-2 overflow-hidden text-ellipsis">
					<span>
						<FiUser />
					</span>
					<h3>{name}</h3>
				</li>
				<li className="flex flex-row flex-nowrap whitespace-nowrap items-center gap-2 overflow-hidden text-ellipsis">
					<span>
						<FiMail />
					</span>
					{email}
				</li>
				<li className="flex flex-row flex-nowrap whitespace-nowrap items-center gap-2 overflow-hidden text-ellipsis">
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
