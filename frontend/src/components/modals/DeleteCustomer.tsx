import React, { useContext } from "react";
import ModalContainer from "./ModalContainer";
import { CustomerContext } from "@/contexts/customerContext";
import { ModalContext } from "@/contexts/modalContext";
import SolidButton from "../buttons/SolidButton";

export const DeleteCustomer = () => {
	const { deleteCustomer, setDeleteCustomer } = useContext(ModalContext);
	const { excludeCustomer, isLoading } = useContext(CustomerContext);

	const handleClose = () => {
		setDeleteCustomer("");
	};

	const handleClick = async () => {
		await excludeCustomer(deleteCustomer, handleClose);
	};

	return (
		<ModalContainer onClose={() => setDeleteCustomer("")} isOpen={!!deleteCustomer}>
			<h2 className="text-4xl font-bold">Tem certeza que deseja continuar?</h2>
			<p>
				Essa é uma ação permanente e ira apagar os dados do cliente e seus contatos
				associados.
			</p>
			<SolidButton
				disabled={isLoading}
				label="Apagar"
				onClick={handleClick}
				classname="!bg-red-500"
			/>
		</ModalContainer>
	);
};
