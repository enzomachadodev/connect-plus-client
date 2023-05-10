import { ModalContext } from "@/contexts/modalContext";
import { useContext, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import ModalContainer from "./ModalContainer";
import DefaultInput from "../inputs/DefaultInput";
import SolidButton from "../buttons/SolidButton";
import { CustomerContext } from "@/contexts/customerContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { Customer } from "@/types/customers";

const updateCustomerFormSchema = z.object({
	name: z.string().nonempty("Nome é obrigatório"),
	email: z.string().email("Digite um email válido").nonempty("Email é obrigatório"),
	phone: z.string().nonempty("Número é obrigatório"),
	avatarUrl: z.string().nonempty("Adicione uma URL de imagem"),
});

export type UpdateCustomerFormData = z.infer<typeof updateCustomerFormSchema>;

export const EditCustomer = () => {
	const { editCustomer, setEditCustomer } = useContext(ModalContext);
	const { updateCustomer, isLoading } = useContext(CustomerContext);

	const {
		reset,
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<UpdateCustomerFormData>({
		resolver: zodResolver(updateCustomerFormSchema),
		defaultValues: {
			...editCustomer,
		},
	});

	const handleClose = () => {
		reset();
		setEditCustomer(null);
	};

	const onSubmit: SubmitHandler<UpdateCustomerFormData> = async (data) => {
		if (editCustomer) {
			updateCustomer(data, editCustomer.id, handleClose);
		} else {
			toast.error("Ops! Algo deu errado");
		}
	};

	return (
		<ModalContainer isOpen={!!editCustomer} onClose={handleClose}>
			<h2 className="text-4xl font-bold">Editar dados do Cliente!</h2>
			<form onSubmit={handleSubmit(onSubmit)}>
				<DefaultInput
					id="name"
					label="Nome do Cliente"
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
					label="Email do Cliente"
					type="email"
					register={register}
					errors={!!errors.email}
					errorMessage={errors.email && errors.email.message}
				/>
				<DefaultInput
					id="phone"
					label="Número do Cliente"
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
