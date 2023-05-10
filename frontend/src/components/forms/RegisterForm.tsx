import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { useContext } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/contexts/authContext";
import DefaultInput from "../inputs/DefaultInput";
import OutlineButton from "../buttons/OutlineButton";
import SolidButton from "../buttons/SolidButton";
import { toast } from "react-toastify";

const registerUserFormSchema = z.object({
	name: z.string().nonempty("Digite um nome"),
	email: z.string().nonempty("Digite um email").email("Utilize um email válido"),
	password: z.string().nonempty("Digite uma senha"),
	avatarUrl: z.string().optional(),
});

export type RegisterUserFormData = z.infer<typeof registerUserFormSchema>;

export const RegisterForm = () => {
	const { authLoading, registerUser } = useContext(AuthContext);

	const router = useRouter();

	const {
		reset,
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<RegisterUserFormData>({
		resolver: zodResolver(registerUserFormSchema),
	});

	const onSubmit: SubmitHandler<RegisterUserFormData> = async (data) => {
		await registerUser(data, reset);
	};

	return (
		<div className="w-full max-w-lg p-8 rounded-2xl overflow-y-auto shadow-md bg-gray-400 bg-clip-padding backdrop-filter bg-opacity-20 backdrop-blur-md">
			<h3 className="font-bold text-4xl my-4">Crie sua conta!</h3>
			<span className="text-gray-400">Venha fazer parte da nossa comunidade!</span>
			<form onSubmit={handleSubmit(onSubmit)}>
				<DefaultInput
					id={"name"}
					label={"Seu Nome"}
					type="text"
					register={register}
					errors={!!errors.name}
					errorMessage={errors.name && errors.name.message}
				/>
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

				<DefaultInput
					id={"avatarUrl"}
					label={"URL da foto (opicional)"}
					type="avatarUrl"
					register={register}
					errors={!!errors.avatarUrl}
					errorMessage={errors.avatarUrl && errors.avatarUrl.message}
				/>
				<SolidButton
					disabled={authLoading}
					label="Registrar"
					type="submit"
					classname="w-full"
				/>
			</form>
			<hr className="mt-6 mb-4" />
			<h3 className="text-center">Já possui uma conta?</h3>

			<OutlineButton
				classname="my-4 w-full"
				onClick={() => router.replace("/")}
				label="Fazer Login"
			/>
		</div>
	);
};
