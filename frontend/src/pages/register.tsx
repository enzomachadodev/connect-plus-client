import { RegisterForm } from "@/components/RegisterForm";
import Image from "next/image";
import logo from "../../public/logo.png";

export default function Register() {
	return (
		<div className="w-full h-full flex items-center justify-start bg-clip-padding backdrop-filter backdrop-blur-3xl bg-opacity-0">
			<div className="w-full h-full py-8 md:w-2/3 max-w-xl flex flex-col justify-start md:justify-center items-center overflow-auto bg-gray-100 bg-clip-padding backdrop-filter bg-opacity-50 dark:bg-gray-900 dark:bg-clip-padding dark:backdrop-filter dark:bg-opacity-50">
				<RegisterForm />
			</div>
			<div className="hidden md:flex md:w-full h-full flex-col items-center justify-center">
				<div className="max-w-lg">
					<Image src={logo} alt="" className="max-w-lg w-full" />
					<h3 className="text-xl font-semibold text-gray-100">
						"Streamline your contacts and never miss a beat with Connect Plus."
					</h3>
				</div>
			</div>
		</div>
	);
}
