"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Link from "next/link";
import { useMutation } from "react-query";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import { useState } from "react";
import { IUserRegisterForm } from "@/types/users";

const schema = yup
	.object({
		name: yup.string().required(),
		profilePicture: yup.string(),
		email: yup.string().email().required(),
		password: yup.string().required(),
		confirmPassword: yup
			.string()
			.oneOf([yup.ref("password")], "Passwords must match")
			.required(),
	})
	.required();

export const Register = () => {
	const [isDisabled, setIsDisbled] = useState(false);

	const {
		reset,
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IUserRegisterForm>({
		resolver: yupResolver(schema),
	});

	const { mutate } = useMutation(
		async ({ name, email, password, avatarUrl }: IUserRegisterForm) =>
			await axios.post("http://localhost:3001/users", {
				name,
				email,
				password,
				photoUrl: avatarUrl,
			}),
		{
			onError: (error) => {
				if (error instanceof AxiosError) {
					toast.dismiss();
					toast.error(error.response?.data.message);
					console.log(error);
				}
				setIsDisbled(false);
			},
			onSuccess: (data) => {
				toast.dismiss();
				toast.success("Account created successfully!");
				setIsDisbled(false);
				reset();
			},
		}
	);

	const onSubmit: SubmitHandler<IUserRegisterForm> = (data) => {
		toast.loading("Creating your account...");
		setIsDisbled(true);
		mutate(data);
	};

	return (
		<div className="rounded-xl border border-red-50 w-5/6 py-4 px-4 shadow-lg">
			<h3 className="font-bold text-4xl my-4">Register now!</h3>
			<span className="text-zinc-300">Be part of our community</span>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="mt-4">
					<label htmlFor="" className="text-start">
						Name:
					</label>
					<input
						type="text"
						className="pl-2 w-full h-10 rounded-md"
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
						className="pl-2 w-full h-10 rounded-md"
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
						className="pl-2 w-full h-10 rounded-md"
						{...register("email")}
					/>
					<p className="text-red-500 h-6">{errors.email?.message}</p>
				</div>
				<div>
					<label htmlFor="">Password:</label>
					<input
						type="password"
						className="pl-2 w-full h-10 rounded-md"
						{...register("password")}
					/>
					<p className="text-red-500 h-6">{errors.password?.message}</p>
				</div>
				<div>
					<label htmlFor="" className="">
						Confirm password:
					</label>
					<input
						type="password"
						className="pl-2 w-full h-10 rounded-md"
						{...register("confirmPassword")}
					/>
					<p className="text-red-500 h-6">{errors.confirmPassword?.message}</p>
				</div>
				<button
					type="submit"
					className=" mt-6 w-full h-12 rounded-md bg-slate-900 border border-slate-500 hover:bg-slate-800 disabled:opacity-50"
					disabled={isDisabled}
				>
					Sign up
				</button>
			</form>
			<hr className="mt-6 mb-4" />
			<h3 className="text-center">Already have a registration?</h3>
			<Link href={"/"}>
				<button className="my-4 w-full h-12 rounded-md bg-slate-300 dark:bg-slate-700 border border-slate-500 shadow-sm  hover:bg-slate-600">
					Make login
				</button>
			</Link>
		</div>
	);
};
