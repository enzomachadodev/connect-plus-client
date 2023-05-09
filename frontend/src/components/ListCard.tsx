interface ListCardProps {
	handleClick: () => void;
	avatarUrl: string;
	name: string;
}

const ListCard = ({ handleClick, avatarUrl, name }: ListCardProps) => {
	return (
		<li
			onClick={handleClick}
			className="flex p-4 items-center gap-4 rounded-xl cursor-pointer overflow-y-auto bg-gray-400 bg-clip-padding backdrop-filter bg-opacity-0 backdrop-blur-md hover:bg-opacity-10 duration-200"
		>
			<img className="w-8 h-8 rounded-full object-cover" src={avatarUrl} alt="" />
			<h2>{name}</h2>
		</li>
	);
};

export default ListCard;
