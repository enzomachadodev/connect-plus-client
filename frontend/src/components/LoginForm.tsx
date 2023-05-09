import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { useContext } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/contexts/authContext";
import DefaultInput from "./inputs/DefaultInput";
import OutlineButton from "./buttons/OutlineButton";
import SolidButton from "./buttons/SolidButton";

const loginUserFormSchema = z.object({
	email: z.string().nonempty("Email is required").email("Enter a valid email"),
	password: z.string().nonempty("Password is required"),
});

export type LoginUserFormData = z.infer<typeof loginUserFormSchema>;

export const LoginForm = () => {
	const { authLoading, loginUser } = useContext(AuthContext);
	const router = useRouter();

	const {
		reset,
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginUserFormData>({
		resolver: zodResolver(loginUserFormSchema),
	});

	const onSubmit: SubmitHandler<LoginUserFormData> = async (data) => {
		await loginUser(data, reset);
	};

	return (
		<div className="w-11/12 p-8 rounded-2xl overflow-y-auto shadow-md bg-gray-400 bg-clip-padding backdrop-filter bg-opacity-20 backdrop-blur-md">
			<h3 className="font-bold text-4xl my-4">Bem Vindo de Volta!</h3>
			<span className="text-gray-400">Faça login para acessar a sua conta</span>
			<form onSubmit={handleSubmit(onSubmit)}>
				<DefaultInput
					id={"email"}
					label={"Seu Email"}
					type="text"
					register={register}
					errors={!!errors.email}
					errorMessage={errors.email && errors.email.message}
				/>
				<DefaultInput
					id={"password"}
					label={"Sua Senha"}
					type="password"
					register={register}
					errors={!!errors.password}
					errorMessage={errors.password && errors.password.message}
				/>
				<SolidButton label="Entrar" type="submit" classname="w-full" />
			</form>
			<hr className="mt-6 mb-4" />
			<h3 className="text-center">Ainda não possui uma conta?</h3>

			<OutlineButton
				classname="my-4 w-full"
				onClick={() => router.replace("/")}
				label="Criar uma conta"
			/>
		</div>
	);
};
