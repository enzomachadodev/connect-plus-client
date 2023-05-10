import { LoginForm } from "@/components/forms/LoginForm";
import Banner from "@/components/Banner";

export default function Home() {
	return (
		<div className="h-full grid grid-cols-1 md:grid-cols-3 md:gap-8 md:px-8">
			<div className=" hidden md:flex col-span-2 items-center justify-center">
				<Banner />
			</div>
			<div className="flex items-center justify-center col-span-1 p-4 md:p-0">
				<LoginForm />
			</div>
		</div>
	);
}
