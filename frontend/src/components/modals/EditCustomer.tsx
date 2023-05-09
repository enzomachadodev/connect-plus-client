import { ModalContext } from "@/contexts/modalContext";
import { useContext, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import ModalContainer from "./ModalContainer";
import DefaultInput from "../inputs/DefaultInput";
import SolidButton from "../buttons/SolidButton";
import { CustomerContext } from "@/contexts/customerContext";
import { zodResolver } from "@hookform/resolvers/zod";

const updateCustomerFormSchema = z.object({
	name: z.string().nonempty("Nome é obrigatório"),
	email: z.string().email("Digite um email válido").nonempty("Email é obrigatório"),
	phone: z.string().min(7, "Digite um número válido").nonempty("Número é obrigatório"),
	avatarUrl: z.string().optional(),
});

export type UpdateCustomerFormData = z.infer<typeof updateCustomerFormSchema>;

export const EditCustomer = () => {
	const { editCustomer, setEditCustomer } = useContext(ModalContext);
	const { getCustomer, retrieveCustomer } = useContext(CustomerContext);

	const [name, setName] = useState("");
	const [avatarUrl, setAvatarUrl] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");

	useEffect(() => {
		if (retrieveCustomer) {
			setName(retrieveCustomer.name);
			setAvatarUrl(retrieveCustomer.avatarUrl);
			setEmail(retrieveCustomer.email);
			setPhone(retrieveCustomer.phone);
		}
	}, [retrieveCustomer]);

	const {
		reset,
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<UpdateCustomerFormData>({
		resolver: zodResolver(updateCustomerFormSchema),
	});

	const handleClose = () => {
		reset();
		setEditCustomer(false);
	};

	const onSubmit: SubmitHandler<UpdateCustomerFormData> = async (data) => {
		//UpdateCustomer(data, handleClose);
	};

	return (
		<ModalContainer isOpen={editCustomer} onClose={() => setEditCustomer(false)}>
			<h2 className="text-4xl font-bold">Adicione um Novo Cliente!</h2>
			<form onSubmit={handleSubmit(onSubmit)}>
				<DefaultInput
					id="name"
					label="Nome do Cliente"
					value={name}
					type="text"
					register={register}
					errors={!!errors.name}
					errorMessage={errors.name && errors.name.message}
				/>
				<DefaultInput
					id="avatarUrl"
					label="URL da foto"
					value={avatarUrl}
					type="text"
					register={register}
					errors={!!errors.avatarUrl}
					errorMessage={errors.avatarUrl && errors.avatarUrl.message}
				/>
				<DefaultInput
					id="email"
					label="Email do Cliente"
					value={email}
					type="text"
					register={register}
					errors={!!errors.email}
					errorMessage={errors.email && errors.email.message}
				/>
				<DefaultInput
					id="phone"
					label="Número do Cliente"
					value={phone}
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
