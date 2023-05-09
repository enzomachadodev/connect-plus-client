import { FiEdit, FiTrash2, FiPlus } from "react-icons/fi";

import { useContext } from "react";

import { ModalContext } from "@/contexts/modalContext";
import { CustomerContext } from "@/contexts/customerContext";
import { Customer } from "@/types/customers";
import ContactCard from "./ContactCard";
import OutlineButton from "./buttons/OutlineButton";
import SolidButton from "./buttons/SolidButton";
import CustomerCard from "./CustomerCard";

export const SelectedCustomer = ({
	id,
	avatarUrl,
	createdAt,
	email,
	name,
	phone,
	contacts,
}: Customer) => {
	const { setAddContact, setEditCustomer, setEditContact, setDeleteContact, setDeleteCustomer } =
		useContext(ModalContext);

	const formatData = (createdAt: Date) => {
		const date = new Date(createdAt);
		const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
		return `Added in ${formattedDate}`;
	};

	return (
		<>
			<CustomerCard
				avatarUrl={avatarUrl}
				createdAt={formatData(createdAt)}
				email={email}
				name={name}
				phone={phone}
			/>
			<div className="w-full flex gap-2 md:gap-4 items-center justify-between">
				<OutlineButton
					classname="!py-2 !px-4 text-base"
					label="Excluir"
					Icon={FiTrash2}
					onClick={() => setDeleteCustomer(id)}
					iconSize={20}
				/>

				<OutlineButton
					classname="!py-2 !px-4 text-base"
					label="Editar"
					Icon={FiEdit}
					onClick={() =>
						setEditCustomer({ id, avatarUrl, createdAt, email, name, phone })
					}
					iconSize={20}
				/>

				<SolidButton
					classname="!h-[42px] !px-4 text-base"
					label="Contato"
					Icon={FiPlus}
					onClick={() => setAddContact(true)}
					iconSize={20}
				/>
			</div>

			<hr className="border-white" />

			<ul className="h-2/3 w-full overflow-y-auto overflow-x-hidden flex flex-col flex-nowrap gap-4">
				{contacts?.length ? (
					contacts.map((c) => (
						<ContactCard
							key={c.id}
							avatarUrl={c.avatarUrl}
							name={c.name}
							email={c.email}
							phone={c.phone}
							createdAt={formatData(c.createdAt)}
							onDelete={() => setDeleteContact(c.id)}
							onEdit={() => setEditContact(c)}
						/>
					))
				) : (
					<div>
						<h2 className="text-2xl font-semibold">
							Este cliente ainda não possui nenhum contato associado.
						</h2>
					</div>
				)}
			</ul>
		</>
	);
};
