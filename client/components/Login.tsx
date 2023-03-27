"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Link from "next/link";

interface ILoginForm {
	email: string;
	password: string;
}

const schema = yup
	.object({
		email: yup.string().email().required(),
		password: yup.string().required(),
	})
	.required();

const Login = () => {
	const {
		reset,
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ILoginForm>({
		resolver: yupResolver(schema),
	});

	const onSubmit: SubmitHandler<ILoginForm> = (data) => {
		reset();
	};
	return (
		<div className="rounded-xl border border-red-50 w-5/6 py-4 px-4 shadow-lg">
			<h3 className="font-bold text-4xl my-4">Hello Again!</h3>
			<span className="text-zinc-300">Make login to access your account</span>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="my-4">
					<label htmlFor="" className="text-start">
						Email:{" "}
					</label>
					<input
						type="email"
						className="pl-2 w-full h-12 rounded-md"
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
					className="w-full h-12 rounded-md bg-slate-900 border border-slate-500 hover:bg-slate-800"
				>
					Sign in
				</button>
			</form>
			<hr className="mt-6 mb-4" />
			<h3 className="text-center">Don't have an account yet?</h3>
			<Link href={"/register"}>
				<button className="my-4 w-full h-12 rounded-md bg-slate-300 dark:bg-slate-700 border border-slate-500 shadow-sm  hover:bg-slate-600">
					Create new account
				</button>
			</Link>
		</div>
	);
};

export default Login;
