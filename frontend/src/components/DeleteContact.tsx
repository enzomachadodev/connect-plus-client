import { CustomerContext } from "@/contexts/customerContext";
import { ModalContext } from "@/contexts/modalContext";
import { api } from "@/services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useContext } from "react";
import { FiX } from "react-icons/fi";
import { toast } from "react-toastify";

export const DeleteContact = () => {
	const queryClient = useQueryClient();
	const { deleteContact, setDeleteContact } = useContext(ModalContext);
	const { selectedContact, setCurrentCustomer } = useContext(CustomerContext);

	const { mutate } = useMutation(
		async (customerId: string) => await api.delete(`/contacts/${customerId}`),
		{
			onError: (error) => {
				if (error instanceof AxiosError) {
					toast.dismiss();
					if (Array.isArray(error?.response?.data)) {
						setCurrentCustomer("");
						toast.error(error?.response?.data[0].message);
						setDeleteContact(false);
					} else {
						setCurrentCustomer("");
						toast.error(error?.response?.data.message);
						setDeleteContact(false);
					}
				}
			},
			onSuccess: (data) => {
				queryClient.invalidateQueries(["customer"]);
				setCurrentCustomer("");
				toast.dismiss();
				toast.success("Customer successfully deleted");
				setDeleteContact(false);
			},
		}
	);

	const deleteContactFn = () => {
		toast.loading("Deleting yout post");
		mutate(selectedContact!.id);
	};

	return (
		<div
			onClick={(e) => {
				const target = e.target as HTMLElement;
				if (target.id === "overlay") {
					setDeleteContact(false);
				}
			}}
			id="overlay"
			className={`${
				deleteContact ? "" : "hidden"
			} fixed bg-black/50 w-full h-full z-20 left-0 top-0`}
		>
			<div className="absolute w-2/3 md:w-auto top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-8 rounded-xl flex flex-col gap-6 border border-white shadow-lg bg-gray-200 bg-clip-padding backdrop-filter bg-opacity-80 dark:bg-zinc-800 dark:bg-clip-padding dark:backdrop-filter dark:bg-opacity-90 dark:border-gray-400">
				<div className="flex items-center justify-between w-full">
					<button onClick={() => setDeleteContact(false)} className="text-3xl">
						<FiX />
					</button>
				</div>
				<h2 className="text-xl">Are you sure you want to delete this customer?</h2>
				<h3 className="text-red-600" text-sm>
					Pression the delete button will permanantly delete your customer.
				</h3>
				<button
					onClick={deleteContactFn}
					className="bg-red-600 text-sm text-white py-2 px-4 rounded-md"
				>
					Delete Post
				</button>
			</div>
		</div>
	);
};
