import { ModalContext } from "@/contexts/modalContext";
import { useContext } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import ModalContainer from "./ModalContainer";
import DefaultInput from "../inputs/DefaultInput";
import SolidButton from "../buttons/SolidButton";
import { ContactContext } from "@/contexts/contactContext";
import { CustomerContext } from "@/contexts/customerContext";

const createContactFormSchema = z.object({
	name: z.string().nonempty("Nome é obrigatório"),
	email: z.string().email("Digite um email válido").nonempty("Email é obrigatório"),
	phone: z.string().nonempty("Número é obrigatório"),
	avatarUrl: z.string().optional(),
});

export type CreateContactFormData = z.infer<typeof createContactFormSchema>;

export const AddContact = () => {
	const { addContact, setAddContact } = useContext(ModalContext);
	const { createContact, isLoading } = useContext(ContactContext);
	const { currentCustomer } = useContext(CustomerContext);

	const {
		reset,
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<CreateContactFormData>({
		resolver: zodResolver(createContactFormSchema),
	});

	const handleClose = () => {
		reset();
		setAddContact(false);
	};

	const onSubmit: SubmitHandler<CreateContactFormData> = async (data) => {
		createContact({ ...data, customerId: currentCustomer }, handleClose);
	};

	return (
		<ModalContainer isOpen={addContact} onClose={() => setAddContact(false)}>
			<h2 className="text-4xl font-bold">Adicione um Novo Contato!</h2>
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
					label="URL da foto (opcional)"
					type="text"
					register={register}
					errors={!!errors.avatarUrl}
					errorMessage={errors.avatarUrl && errors.avatarUrl.message}
				/>
				<DefaultInput
					id="email"
					label="Email do Contato"
					type="text"
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
					label="Adicionar"
					type="submit"
					classname="w-full"
				/>
			</form>
		</ModalContainer>
	);
};
