"use client";

import { QueryClient, QueryClientProvider } from "react-query";
import { ThemeProvider, useTheme } from "next-themes";
import { AuthProvider } from "@/contexts/AuthContext";

const queryClient = new QueryClient();

interface ProvidersProps {
	children: React.ReactNode;
}

export const Providers = ({ children }: ProvidersProps) => {
	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
				<AuthProvider>{children}</AuthProvider>
			</ThemeProvider>
		</QueryClientProvider>
	);
};
