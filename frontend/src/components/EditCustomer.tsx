import { CustomerContext } from "@/contexts/customerContext";
import { ModalContext } from "@/contexts/modalContext";
import { api } from "@/services/api";
import { ICustomerRequest } from "@/types/customers";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useCallback, useContext, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FiX } from "react-icons/fi";
import { toast } from "react-toastify";
import * as yup from "yup";

const schema = yup
	.object({
		name: yup.string().required(),
		avatarUrl: yup.string().url("must be a valid URL").required("profile picture is required"),
		email: yup.string().email().required(),
		phone: yup.string().required(),
	})
	.required();

export const EditCustomer = () => {
	const queryClient = useQueryClient();
	const { editCustomer, setEditCustomer } = useContext(ModalContext);
	const { customerRetrieve, setCurrentCustomer } = useContext(CustomerContext);
	const [isDisabled, setIsDisabled] = useState(false);

	const {
		reset,
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ICustomerRequest>({
		resolver: yupResolver(schema),
	});

	const { mutate } = useMutation(
		async ({ name, email, phone, avatarUrl }: ICustomerRequest) =>
			await api.patch(`/customers/${customerRetrieve?.id}`, {
				name,
				email,
				phone,
				avatarUrl,
			}),
		{
			onError: (error) => {
				if (error instanceof AxiosError) {
					toast.dismiss();
					if (Array.isArray(error?.response?.data)) {
						toast.error(error?.response?.data[0].message);
					} else {
						toast.error(error?.response?.data.message);
					}
				}
				setIsDisabled(false);
			},
			onSuccess: (data) => {
				queryClient.invalidateQueries(["customer"]);
				setCurrentCustomer("");
				toast.dismiss();
				toast.success("Customer successfully updated");
				reset();
				setIsDisabled(false);
				setEditCustomer(false);
			},
		}
	);

	const onSubmit: SubmitHandler<ICustomerRequest> = async (data) => {
		toast.loading("Saving...");
		mutate(data);
	};

	return (
		<div
			onClick={(e) => {
				const target = e.target as HTMLElement;
				if (target.id === "overlay") {
					setEditCustomer(false);
					reset();
				}
			}}
			id="overlay"
			className={`${
				editCustomer ? "" : "hidden"
			} fixed bg-black/50 w-full h-full z-20 left-0 top-0`}
		>
			<div className="absolute w-2/3 md:w-auto top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-8 rounded-xl flex flex-col gap-6 border border-white shadow-lg bg-gray-200 bg-clip-padding backdrop-filter bg-opacity-80 dark:bg-zinc-800 dark:bg-clip-padding dark:backdrop-filter dark:bg-opacity-90 dark:border-gray-400">
				<div className="flex items-center justify-between w-full">
					<h2 className="font-bold text-2xl">Update your customer!</h2>
					<button
						onClick={() => {
							setEditCustomer(false);
							reset();
						}}
						className="text-3xl"
					>
						<FiX />
					</button>
				</div>

				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="mt-4">
						<label htmlFor="" className="text-start">
							Name:
						</label>
						<input
							type="text"
							defaultValue={customerRetrieve?.name}
							className="pl-2 w-full h-10 rounded-lg border border-gray-200"
							{...register("name")}
						/>
						<p className="text-red-500 h-6">{errors.name?.message}</p>
					</div>
					<div>
						<label htmlFor="" className="text-start">
							Profile picture:
						</label>
						<input
							type="text"
							defaultValue={customerRetrieve?.avatarUrl}
							className="pl-2 w-full h-10 rounded-lg border border-gray-200"
							{...register("avatarUrl")}
						/>
						<p className="text-red-500 h-6 ">{errors.avatarUrl?.message}</p>
					</div>
					<div>
						<label htmlFor="" className="text-start">
							Email:
						</label>
						<input
							type="email"
							defaultValue={customerRetrieve?.email}
							className="pl-2 w-full h-10 rounded-lg border border-gray-200"
							{...register("email")}
						/>
						<p className="text-red-500 h-6">{errors.email?.message}</p>
					</div>
					<div>
						<label htmlFor="">Phone Number:</label>
						<input
							type="text"
							defaultValue={customerRetrieve?.phone}
							className="pl-2 w-full h-10 rounded-lg border border-gray-200"
							{...register("phone")}
						/>
						<p className="text-red-500 h-6">{errors.phone?.message}</p>
					</div>

					<button
						type="submit"
						className="w-full h-12 rounded-lg bg-gray-100 shadow-md hover:shadow-xl border border-gray-100 transition duration-200 dark:bg-zinc-800 dark:border-gray-400"
						disabled={isDisabled}
					>
						Save
					</button>
				</form>
			</div>
		</div>
	);
};
