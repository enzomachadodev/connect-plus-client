"use client";

import { QueryClient, QueryClientProvider } from "react-query";
import { ThemeProvider } from "next-themes";

const queryClient = new QueryClient();

interface ProvidersProps {
	children: React.ReactNode;
}

const Providers = ({ children }: ProvidersProps) => {
	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
				{children}
			</ThemeProvider>
		</QueryClientProvider>
	);
};

export default Providers;
