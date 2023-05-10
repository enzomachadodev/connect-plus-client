import { FiCalendar, FiMail, FiPhone, FiUser } from "react-icons/fi";

interface CustomerCardProps {
	avatarUrl: string;
	createdAt: string;
	name: string;
	email: string;
	phone: string;
}

const CustomerCard = ({ avatarUrl, createdAt, email, name, phone }: CustomerCardProps) => {
	return (
		<div className="w-full gap-4  rounded-xl flex items-center p-4 bg-gray-400 bg-clip-padding backdrop-filter bg-opacity-0 backdrop-blur-md">
			<img
				src={avatarUrl}
				alt=""
				className="border border-white h-20 md:h-28 md:w-28 w-20 object-cover rounded-full p-1"
			/>
			<ul className="overflow-hidden">
				<li className="flex flex-row items-center gap-2 flex-nowrap whitespace-nowrap overflow-hidden text-ellipsis">
					<span>
						<FiCalendar />
					</span>
					<h3>{createdAt}</h3>
				</li>
				<li className="flex flex-row items-center gap-2 flex-nowrap whitespace-nowrap overflow-hidden text-ellipsis">
					<span>
						<FiUser />
					</span>
					<h3>{name}</h3>
				</li>
				<li className="flex flex-row items-center gap-2 flex-nowrap whitespace-nowrap overflow-hidden text-ellipsis">
					<span>
						<FiPhone />
					</span>
					{phone}
				</li>
				<li className="flex flex-row items-center gap-2 flex-nowrap whitespace-nowrap overflow-hidden text-ellipsis">
					<span>
						<FiMail />
					</span>
					{email}
				</li>
			</ul>
		</div>
	);
};

export default CustomerCard;
