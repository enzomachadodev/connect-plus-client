import { FiEdit, FiTrash2, FiPlus } from "react-icons/fi";

import { useContext } from "react";

import { ModalContext } from "@/contexts/modalContext";
import { Customer } from "@/types/customers";
import ContactCard from "./ContactCard";
import SolidButton from "./buttons/SolidButton";
import CustomerCard from "./CustomerCard";
import { formatDate } from "@/utils/formatDate";

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

	return (
		<>
			<CustomerCard
				avatarUrl={avatarUrl}
				createdAt={formatDate(createdAt)}
				email={email}
				name={name}
				phone={phone}
			/>
			<div className="w-full flex gap-2 md:gap-4 items-center justify-between">
				<button
					className="flex items-center tex-base gap-2 border py-2 px-2 rounded-xl"
					onClick={() => setDeleteCustomer(id)}
				>
					<FiTrash2 size={20} />
					<p className="">Excluir</p>
				</button>
				<button
					className="flex items-center tex-base gap-2 border py-2 px-2 md:px-4 rounded-xl"
					onClick={() =>
						setEditCustomer({ id, avatarUrl, createdAt, email, name, phone })
					}
				>
					<FiEdit size={20} />
					<p className="">Editar</p>
				</button>

				<SolidButton
					classname="!h-[42px] !px-4 text-base"
					label="Contato"
					Icon={FiPlus}
					onClick={() => setAddContact(true)}
					iconSize={20}
				/>
			</div>

			<hr className="border-white" />

			<ul className="h-2/3 w-full overflow-y-scroll overflow-x-hidden flex flex-col flex-nowrap gap-4 pr-2">
				{contacts?.length ? (
					contacts.map((c) => (
						<ContactCard
							key={c.id}
							avatarUrl={c.avatarUrl}
							name={c.name}
							email={c.email}
							phone={c.phone}
							createdAt={formatDate(c.createdAt)}
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
