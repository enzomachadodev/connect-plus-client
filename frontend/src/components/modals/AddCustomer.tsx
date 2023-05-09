import { ModalContext } from "@/contexts/modalContext";
import { useContext, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FiX } from "react-icons/fi";
import { toast } from "react-toastify";
import { z } from "zod";
import ModalContainer from "./ModalContainer";
import DefaultInput from "../inputs/DefaultInput";
import SolidButton from "../buttons/SolidButton";
import OutlineButton from "../buttons/OutlineButton";
import { CustomerContext } from "@/contexts/customerContext";

const createCustomerFormSchema = z.object({
	name: z.string().nonempty("Nome é obrigatório"),
	email: z.string().email("Digite um email válido").nonempty("Email é obrigatório"),
	phone: z.string().min(7, "Digite um número válido").nonempty("Número é obrigatório"),
	avatarUrl: z.string().optional(),
});

export type CreateCustomerFormData = z.infer<typeof createCustomerFormSchema>;

export const AddCustomer = () => {
	const { addCustomer, setAddCustomer } = useContext(ModalContext);
	const { createCustomer } = useContext(CustomerContext);

	const {
		reset,
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<CreateCustomerFormData>({
		resolver: zodResolver(createCustomerFormSchema),
	});

	const handleClose = () => {
		reset();
		setAddCustomer(false);
	};

	const onSubmit: SubmitHandler<CreateCustomerFormData> = async (data) => {
		createCustomer(data, handleClose);
	};

	return (
		<ModalContainer isOpen={addCustomer} onClose={() => setAddCustomer(false)}>
			<h2 className="text-4xl font-bold">Adicione um Novo Cliente!</h2>
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
					label="URL da foto (opcional)"
					type="text"
					register={register}
					errors={!!errors.avatarUrl}
					errorMessage={errors.avatarUrl && errors.avatarUrl.message}
				/>
				<DefaultInput
					id="email"
					label="Email do Cliente"
					type="text"
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
				<SolidButton label="Registrar" type="submit" classname="w-full" />
			</form>
		</ModalContainer>
	);
};
