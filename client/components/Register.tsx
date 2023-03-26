"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Link from "next/link";

interface IRegisterForm {
	name: string;
	profilePicture?: string;
	email: string;
	password: string;
	confirmPassword: string;
}

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

const Register = () => {
	const {
		reset,
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IRegisterForm>({
		resolver: yupResolver(schema),
	});

	const onSubmit: SubmitHandler<IRegisterForm> = (data) => {
		reset();
	};

	return (
		<div className="rounded-xl border border-red-50 w-5/6 py-4 px-4 shadow-lg my-8">
			<h3 className="font-bold text-4xl my-4">Register now!</h3>
			<span className="text-zinc-300">Be part of our community</span>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="my-4">
					<label htmlFor="" className="text-start">
						Name:
					</label>
					<input
						type="text"
						className="pl-2 w-full h-12 rounded-md"
						{...register("name")}
					/>
					<p className="text-red-500 h-4">{errors.name?.message}</p>
				</div>
				<div>
					<label htmlFor="" className="text-start">
						Profile picture:
					</label>
					<input
						type="text"
						className="pl-2 w-full h-12 rounded-md"
						{...register("profilePicture")}
					/>
					<p className="text-red-500 h-4">{errors.profilePicture?.message}</p>
				</div>
				<div className="my-4">
					<label htmlFor="" className="text-start">
						Email:
					</label>
					<input
						type="email"
						className="pl-2 w-full h-12 rounded-md"
						{...register("email")}
					/>
					<p className="text-red-500 h-4">{errors.email?.message}</p>
				</div>
				<div className="my-4">
					<label htmlFor="">Password:</label>
					<input
						type="password"
						className="pl-2 w-full h-12 rounded-md"
						{...register("password")}
					/>
					<p className="text-red-500 h-4">{errors.password?.message}</p>
				</div>
				<div className="my-4">
					<label htmlFor="">Confirm password:</label>
					<input
						type="password"
						className="pl-2 w-full h-12 rounded-md"
						{...register("confirmPassword")}
					/>
					<p className="text-red-500 h-4">{errors.confirmPassword?.message}</p>
				</div>
				<button
					type="submit"
					className="w-full h-12 rounded-md bg-slate-900 border border-slate-500 hover:bg-slate-800"
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

export default Register;
