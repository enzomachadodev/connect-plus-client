export const Loader = () => {
	return (
		<>
			<div className="w-full gap-4  rounded-xl flex items-center p-4 bg-gray-100 bg-clip-padding backdrop-filter bg-opacity-0 backdrop-blur-md">
				<div className="flex animate-pulse space-x-4 w-full overflow-hidden">
					<div className="h-20 md:h-28 md:min-w-[110px] min-w-[80px] rounded-full bg-white opacity-10"></div>

					<ul className="flex flex-col justify-between w-full">
						<li className="flex gap-2 items-center">
							<div className="h-4 w-4 bg-white opacity-10 rounded-full"></div>
							<div className="h-2 w-2/4 bg-white opacity-10 rounded-xl"></div>
						</li>
						<li className="flex gap-2 items-center">
							<div className="h-4 w-4 bg-white opacity-10 rounded-full"></div>
							<div className="h-2 w-2/4 bg-white opacity-10 rounded-xl"></div>
						</li>
						<li className="flex gap-2 items-center">
							<div className="h-4 w-4 bg-white opacity-10 rounded-full"></div>
							<div className="h-2 w-2/4 bg-white opacity-10 rounded-xl"></div>
						</li>
						<li className="flex gap-2 items-center">
							<div className="h-4 w-4 bg-white opacity-10 rounded-full"></div>
							<div className="h-2 w-2/4 bg-white opacity-10 rounded-xl"></div>
						</li>
					</ul>
				</div>
			</div>
			<div className="w-full flex gap-2 md:gap-4 items-center justify-between animate-pulse">
				<div className="h-8 w-1/4 rounded-lg bg-white opacity-10"></div>
				<div className="h-8 w-1/4 rounded-lg bg-white opacity-10"></div>
				<div className="h-8 w-1/4 rounded-lg bg-white opacity-10"></div>
			</div>

			<div className="w-full gap-4  rounded-xl flex items-center p-4 bg-gray-100 bg-clip-padding backdrop-filter bg-opacity-0 backdrop-blur-md">
				<div className="flex animate-pulse space-x-4 w-full overflow-hidden">
					<div className="flex flex-col items-center gap-2">
						<div className="h-16 md:h-20 md:min-w-[80px] min-w-[64px] rounded-full bg-white opacity-10"></div>
						<div className="flex gap-3">
							<div className="h-4 w-4 bg-white opacity-10 rounded-full"></div>
							<div className="h-4 w-4 bg-white opacity-10 rounded-full"></div>
						</div>
					</div>

					<ul className="flex flex-col justify-between w-full">
						<li className="flex gap-2 items-center">
							<div className="h-4 w-4 bg-white opacity-10 rounded-full"></div>
							<div className="h-2 w-2/4 bg-white opacity-10 rounded-xl"></div>
						</li>
						<li className="flex gap-2 items-center">
							<div className="h-4 w-4 bg-white opacity-10 rounded-full"></div>
							<div className="h-2 w-2/4 bg-white opacity-10 rounded-xl"></div>
						</li>
						<li className="flex gap-2 items-center">
							<div className="h-4 w-4 bg-white opacity-10 rounded-full"></div>
							<div className="h-2 w-2/4 bg-white opacity-10 rounded-xl"></div>
						</li>
						<li className="flex gap-2 items-center">
							<div className="h-4 w-4 bg-white opacity-10 rounded-full"></div>
							<div className="h-2 w-2/4 bg-white opacity-10 rounded-xl"></div>
						</li>
					</ul>
				</div>
			</div>
		</>
	);
};
