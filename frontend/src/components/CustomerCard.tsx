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
		<div className="w-full gap-4  rounded-xl flex items-center p-4 bg-gray-400 bg-clip-padding backdrop-filter bg-opacity-0 backdrop-blur-md hover:bg-opacity-10 duration-200">
			<img
				src={avatarUrl}
				alt=""
				className="border border-gray-100 h-28 w-28 object-cover rounded-full p-1"
			/>
			<ul>
				<li className="flex flex-row items-center gap-2 flex-nowrap overflow-hidden text-ellipsis">
					<span>
						<FiCalendar />
					</span>
					<h3>{createdAt}</h3>
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
	);
};

export default CustomerCard;
