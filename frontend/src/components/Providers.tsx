"use client";

import { ModalProvider } from "@/contexts/modalContext";
import { CustomerProvider } from "@/contexts/customerContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider, useTheme } from "next-themes";
import { AuthProvider } from "@/contexts/authContext";

const queryClient = new QueryClient();

interface ProvidersProps {
	children: React.ReactNode;
}

export const Providers = ({ children }: ProvidersProps) => {
	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
				<AuthProvider>
					<CustomerProvider>
						<ModalProvider>{children}</ModalProvider>
					</CustomerProvider>
				</AuthProvider>
			</ThemeProvider>
		</QueryClientProvider>
	);
};
