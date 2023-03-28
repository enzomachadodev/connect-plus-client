"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Link from "next/link";
import { useContext, useState } from "react";
import { IUserLoginForm } from "@/types/users";
import { toast } from "react-toastify";
import { AuthContext } from "@/contexts/AuthContext";

const schema = yup
	.object({
		email: yup.string().email().required(),
		password: yup.string().required(),
	})
	.required();

export const Login = () => {
	const [isDisabled, setIsDisabled] = useState(false);
	const { signIn } = useContext(AuthContext);

	const {
		reset,
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IUserLoginForm>({
		resolver: yupResolver(schema),
	});

	const onSubmit: SubmitHandler<IUserLoginForm> = async (data) => {
		toast.loading("Checking credentials...");
		signIn(data);
	};
	return (
		<div className="rounded-xl border border-white w-5/6 py-4 px-4 shadow-lg bg-white dark:bg-gray-900">
			<h3 className="font-bold text-4xl my-4">Hello Again!</h3>
			<span className="text-zinc-300">Make login to access your account</span>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="my-4">
					<label htmlFor="" className="text-start">
						Email:{" "}
					</label>
					<input
						type="email"
						className="pl-2 w-full h-12 rounded-md border border-gray-200"
						{...register("email")}
						placeholder="example@email.com"
					/>
					<p className="text-red-500 h-4">{errors.email?.message}</p>
				</div>
				<div className="my-4">
					<label htmlFor="">Password:</label>
					<input
						type="password"
						className="pl-2 w-full h-12 rounded-md"
						{...register("password")}
						placeholder="*****************"
					/>
					<p className="text-red-500 h-4">{errors.password?.message}</p>
				</div>
				<button
					type="submit"
					className="w-full h-12 rounded-md bg-black text-white shadow-md hover:shadow-xl border dark:border-white"
				>
					Sign in
				</button>
			</form>
			<hr className="mt-6 mb-4" />
			<h3 className="text-center">Don't have an account yet?</h3>
			<Link href={"/register"}>
				<button className="my-4 w-full h-12 rounded-md bg-white dark:bg-black dark:text-white border border-gray-200 shadow-md hover:shadow-xl ">
					Create new account
				</button>
			</Link>
		</div>
	);
};
