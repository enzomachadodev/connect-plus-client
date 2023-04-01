import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import { IUserRegisterForm } from "@/types/users";
import { useRouter } from "next/router";
import { useContext } from "react";
import { AuthContext } from "@/contexts/authContext";

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

export const RegisterForm = () => {
	const { registerUser } = useContext(AuthContext);
	const { isLoading, error, isError, isSuccess, mutateAsync, data } = useMutation(
		["register"],
		registerUser
	);

	const router = useRouter();

	if (isSuccess) {
		toast.dismiss();
		router.push("/");
	}

	const {
		reset,
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IUserRegisterForm>({
		resolver: yupResolver(schema),
	});

	const onSubmit: SubmitHandler<IUserRegisterForm> = async ({
		name,
		email,
		password,
		avatarUrl,
	}) => {
		toast.loading("Creating your account...");
		await mutateAsync({ name, email, password, avatarUrl });
	};

	return (
		<div className="rounded-xl border border-white w-5/6 py-4 px-4 shadow-lg bg-gray-100 bg-clip-padding backdrop-filter bg-opacity-50 dark:bg-gray-900 dark:bg-clip-padding dark:backdrop-filter dark:bg-opacity-50 dark:border-gray-400">
			<h3 className="font-bold text-4xl my-4">Register now!</h3>
			<span className="text-gray-400">Be part of our community</span>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="mt-4">
					<label htmlFor="" className="text-start">
						Name:
					</label>
					<input
						type="text"
						className="pl-2 w-full h-10 rounded-lg border border-gray-100 dark:border-gray-400"
						{...register("name")}
					/>
					<p className="text-red-500 h-5">{errors.name?.message}</p>
				</div>
				<div>
					<label htmlFor="" className="text-start">
						Profile picture:
					</label>
					<input
						type="text"
						className="pl-2 w-full h-10 rounded-lg border border-gray-100 dark:border-gray-400"
						{...register("avatarUrl")}
					/>
					<p className="text-red-500 h-5">{errors.avatarUrl?.message}</p>
				</div>
				<div>
					<label htmlFor="" className="text-start">
						Email:
					</label>
					<input
						type="email"
						className="pl-2 w-full h-10 rounded-lg border border-gray-100 dark:border-gray-400"
						{...register("email")}
					/>
					<p className="text-red-500 h-5">{errors.email?.message}</p>
				</div>
				<div>
					<label htmlFor="">Password:</label>
					<input
						type="password"
						className="pl-2 w-full h-10 rounded-lg border border-gray-100 dark:border-gray-400"
						{...register("password")}
					/>
					<p className="text-red-500 h-5">{errors.password?.message}</p>
				</div>
				<div>
					<label htmlFor="" className="">
						Confirm password:
					</label>
					<input
						type="password"
						className="pl-2 w-full h-10 rounded-lg border border-gray-100 dark:border-gray-400"
						{...register("confirmPassword")}
					/>
					<p className="text-red-500 h-6">{errors.confirmPassword?.message}</p>
				</div>
				<button
					type="submit"
					className="w-full h-12 rounded-lg bg-gray-100 shadow-md hover:shadow-xl border border-gray-100 transition duration-200 dark:bg-zinc-800 dark:border-gray-400"
					disabled={isLoading}
				>
					Sign up
				</button>
			</form>
			<hr className="mt-6 mb-4" />
			<h3 className="text-center">Already have a registration?</h3>
			<Link href={"/"}>
				<button className="my-4 w-full h-12 rounded-lg shadow-md hover:shadow-xl transition duration-200 border dark:border-gray-400 border-white bg-clip-padding backdrop-filter bg-opacity-50">
					Make login
				</button>
			</Link>
		</div>
	);
};
