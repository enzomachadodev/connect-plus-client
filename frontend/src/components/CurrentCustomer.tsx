import { SelectedCustomer } from "./SelectedCustomer";
import { useContext } from "react";
import { CustomerContext } from "@/contexts/customerContext";
import { ModalContext } from "@/contexts/modalContext";
import { FiDownload, FiPlus } from "react-icons/fi";
import SolidButton from "./buttons/SolidButton";
import OutlineButton from "./buttons/OutlineButton";
import { Loader } from "./Loader";
import { downloadReport } from "@/utils/downloadReport";
import { toast } from "react-toastify";

export const CurrentCustomer = () => {
	const { retrieveCustomer, customerLoading } = useContext(CustomerContext);
	const { setAddCustomer } = useContext(ModalContext);

	const handleDownload = async () => {
		if (retrieveCustomer) {
			await downloadReport(retrieveCustomer).then((res) => {
				toast.success("Relatorio Pronto");
			});
		} else {
			toast.error("Por favor, selecione um cliente.");
		}
	};

	return (
		<div className="h-[80vh] w-full md:w-3/5 flex flex-col gap-4 p-4 rounded-2xl overflow-y-auto shadow-md bg-gray-400 bg-clip-padding backdrop-filter bg-opacity-20 backdrop-blur-md">
			<div className="w-full flex items-center justify-between">
				<OutlineButton label="Relatório" Icon={FiDownload} onClick={handleDownload} />
				<SolidButton onClick={() => setAddCustomer(true)} label="Cliente" Icon={FiPlus} />
			</div>
			<hr className="border-white" />

			{customerLoading ? (
				<Loader />
			) : retrieveCustomer ? (
				<SelectedCustomer
					id={retrieveCustomer.id}
					avatarUrl={retrieveCustomer.avatarUrl}
					createdAt={retrieveCustomer.createdAt}
					email={retrieveCustomer.email}
					name={retrieveCustomer.name}
					phone={retrieveCustomer.phone}
					contacts={retrieveCustomer.contacts}
				/>
			) : (
				<div className="w-full h-full flex flex-col gap-4 items-start">
					<h1 className="text-4xl font-semibold">
						Bem-vindo ao Contact Plus! Estamos entusiasmados por tê-lo a bordo.
					</h1>
					<h2 className="text-2xl">Selecione um cliente para começar.</h2>
				</div>
			)}
		</div>
	);
};
