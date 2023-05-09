import { ModalProvider } from "@/contexts/modalContext";
import { CustomerProvider } from "@/contexts/customerContext";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/contexts/authContext";

interface ProvidersProps {
	children: React.ReactNode;
}

export const Providers = ({ children }: ProvidersProps) => {
	return (
		<AuthProvider>
			<CustomerProvider>
				<ModalProvider>{children}</ModalProvider>
			</CustomerProvider>
		</AuthProvider>
	);
};
