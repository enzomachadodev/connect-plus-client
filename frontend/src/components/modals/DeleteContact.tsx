import React, { useContext } from "react";
import ModalContainer from "./ModalContainer";
import { ModalContext } from "@/contexts/modalContext";
import SolidButton from "../buttons/SolidButton";
import { ContactContext } from "@/contexts/contactContext";

export const DeleteContact = () => {
	const { deleteContact, setDeleteContact } = useContext(ModalContext);
	const { excludeContact, isLoading } = useContext(ContactContext);

	const handleClose = () => {
		setDeleteContact("");
	};

	const handleClick = async () => {
		await excludeContact(deleteContact, handleClose);
	};

	return (
		<ModalContainer onClose={() => setDeleteContact("")} isOpen={!!deleteContact}>
			<h2 className="text-4xl font-bold">Tem certeza que deseja continuar?</h2>
			<p>Essa é uma ação permanente e ira apagar os dados do contato</p>
			<SolidButton
				disabled={isLoading}
				label="Apagar"
				onClick={handleClick}
				classname="!bg-red-500"
			/>
		</ModalContainer>
	);
};
