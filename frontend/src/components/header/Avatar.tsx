import React from "react";
import SolidButton from "../buttons/SolidButton";

interface AvatarProps {
	name: string;
	avatarUrl: string;
	handleLogout: () => void;
}

const Avatar = ({ name, avatarUrl, handleLogout }: AvatarProps) => {
	return (
		<div className="flex items-center gap-2">
			<h2 className="">{name}</h2>
			<div className="aspect-square h-[56px] rounded-full overflow-hidden border border-white p-1">
				<img className="object-cover h-full w-full rounded-full" src={avatarUrl} alt="" />
			</div>
			<SolidButton label="Sair" classname="" onClick={handleLogout} />
		</div>
	);
};

export default Avatar;
