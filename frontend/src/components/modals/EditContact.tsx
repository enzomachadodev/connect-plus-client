import { ModalContext } from "@/contexts/modalContext";
import { useContext, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import ModalContainer from "./ModalContainer";
import DefaultInput from "../inputs/DefaultInput";
import SolidButton from "../buttons/SolidButton";
import { ContactContext } from "@/contexts/contactContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { CustomerContext } from "@/contexts/customerContext";

const updateContactFormSchema = z.object({
	name: z.string().nonempty("Nome é obrigatório"),
	email: z.string().email("Digite um email válido").nonempty("Email é obrigatório"),
	phone: z.string().nonempty("Número é obrigatório"),
	avatarUrl: z.string().nonempty("Adicione uma URL de imagem"),
});

export type UpdateContactFormData = z.infer<typeof updateContactFormSchema>;

export const EditContact = () => {
	const { editContact, setEditContact } = useContext(ModalContext);
	const { currentCustomer } = useContext(CustomerContext);
	const { updateContact, isLoading } = useContext(ContactContext);

	const {
		reset,
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<UpdateContactFormData>({
		resolver: zodResolver(updateContactFormSchema),
		defaultValues: {
			...editContact,
		},
	});

	const handleClose = () => {
		reset();
		setEditContact(null);
	};

	const onSubmit: SubmitHandler<UpdateContactFormData> = async (data) => {
		if (editContact) {
			//console.log({ ...data, customerId: currentCustomer });
			updateContact({ ...data, customerId: currentCustomer }, editContact.id, handleClose);
		} else {
			toast.error("Ops! Algo deu errado");
		}
	};

	return (
		<ModalContainer isOpen={!!editContact} onClose={handleClose}>
			<h2 className="text-4xl font-bold">Editar dados do Contato!</h2>
			<form onSubmit={handleSubmit(onSubmit)}>
				<DefaultInput
					id="name"
					label="Nome do Contato"
					type="text"
					register={register}
					errors={!!errors.name}
					errorMessage={errors.name && errors.name.message}
				/>
				<DefaultInput
					id="avatarUrl"
					label="URL da foto"
					type="text"
					register={register}
					errors={!!errors.avatarUrl}
					errorMessage={errors.avatarUrl && errors.avatarUrl.message}
				/>
				<DefaultInput
					id="email"
					label="Email do Contato"
					type="email"
					register={register}
					errors={!!errors.email}
					errorMessage={errors.email && errors.email.message}
				/>
				<DefaultInput
					id="phone"
					label="Número do Contato"
					type="text"
					register={register}
					errors={!!errors.phone}
					errorMessage={errors.phone && errors.phone.message}
				/>
				<SolidButton
					disabled={isLoading}
					label="Salvar"
					type="submit"
					classname="mt-9 w-full"
				/>
			</form>
		</ModalContainer>
	);
};
