import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Link from "next/link";
import { useState } from "react";
import { IUserLogin, IUserLoginForm } from "@/types/users";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { api } from "@/services/api";
import { AxiosError } from "axios";
import { setCookie } from "nookies";

const schema = yup
	.object({
		email: yup.string().email().required(),
		password: yup.string().required(),
	})
	.required();

interface ILoginReponse {
	data: string;
}

export const LoginForm = () => {
	const [isDisabled, setIsDisabled] = useState(false);
	const queryClient = useQueryClient();
	const router = useRouter();

	const {
		reset,
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IUserLoginForm>({
		resolver: yupResolver(schema),
	});

	const { mutate } = useMutation(
		async ({ email, password }: IUserLogin): Promise<ILoginReponse> =>
			await api.post("/login", {
				email,
				password,
			}),
		{
			onError: (error) => {
				if (error instanceof AxiosError) {
					toast.dismiss();
					toast.error(error?.response?.data.message);
				}
			},
			onSuccess: (data) => {
				toast.dismiss();
				toast.success("Successful Login 🔥");

				api.defaults.headers.authorization = `Bearer ${data.data}`;
				queryClient.invalidateQueries({ queryKey: ["user"] });
				reset();

				setCookie(null, "token", data.data, {
					maxAge: 60 * 60,
					path: "/",
				});

				router.push("/dashboard");
			},
		}
	);

	const onSubmit: SubmitHandler<IUserLoginForm> = async ({ email, password }) => {
		toast.loading("Checking credentials...");
		mutate({
			email,
			password,
		});
	};

	return (
		<div className="rounded-xl border border-white w-5/6 py-4 px-4 shadow-lg bg-gray-100 bg-clip-padding backdrop-filter bg-opacity-50 dark:bg-gray-900 dark:bg-clip-padding dark:backdrop-filter dark:bg-opacity-50 dark:border-gray-400">
			<h3 className="font-bold text-4xl my-4">Hello Again!</h3>
			<span className="text-gray-400">Make login to access your account</span>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="my-4">
					<label htmlFor="" className="text-start">
						Email:{" "}
					</label>
					<input
						type="email"
						className="pl-2 w-full h-10 rounded-lg border border-gray-100 dark:border-gray-400"
						{...register("email")}
						placeholder="example@email.com"
					/>
					<p className="text-red-500 h-4">{errors.email?.message}</p>
				</div>
				<div className="my-4">
					<label htmlFor="">Password:</label>
					<input
						type="password"
						className="pl-2 w-full h-10 rounded-lg border border-gray-100 dark:border-gray-400"
						{...register("password")}
						placeholder="*****************"
					/>
					<p className="text-red-500 h-4">{errors.password?.message}</p>
				</div>
				<button
					type="submit"
					className="w-full h-12 rounded-lg bg-gray-100 shadow-md hover:shadow-xl border border-gray-100 transition duration-200 dark:bg-zinc-800 dark:border-gray-400"
					disabled={false}
				>
					Sign in
				</button>
			</form>
			<hr className="mt-6 mb-4" />
			<h3 className="text-center">Don't have an account yet?</h3>
			<Link href={"/register"}>
				<button className="my-4 w-full h-12 rounded-lg shadow-md hover:shadow-xl transition duration-200 border dark:border-gray-400 border-white bg-clip-padding backdrop-filter bg-opacity-50">
					Create new account
				</button>
			</Link>
		</div>
	);
};
