import { ModalProvider } from "@/contexts/modalContext";
import { CustomerProvider } from "@/contexts/customerContext";
import { AuthProvider } from "@/contexts/authContext";
import { ContactProvider } from "@/contexts/contactContext";

interface ProvidersProps {
	children: React.ReactNode;
}

export const Providers = ({ children }: ProvidersProps) => {
	return (
		<ModalProvider>
			<CustomerProvider>
				<ContactProvider>
					<AuthProvider>{children}</AuthProvider>
				</ContactProvider>
			</CustomerProvider>
		</ModalProvider>
	);
};
