import "@/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { Providers } from "@/components/Providers";
import { useTheme } from "next-themes";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-roboto" });

export default function App({ Component, pageProps }: AppProps) {
	const { theme } = useTheme();

	return (
		<Providers>
			<main
				className={`h-screen ${inter.variable} font-sans text-gray-700 dark:text-gray-100 bg-[url('../../public/bg-light.jpg')] bg-cover dark:bg-[url('../../public/bg-dark.jpg')] transition duration-300 overflow-auto`}
			>
				<Component {...pageProps} />
				<ToastContainer
					theme={theme === "light" ? "light" : "dark"}
					position="bottom-right"
					autoClose={2000}
				/>
			</main>
			{/* <ReactQueryDevtools initialIsOpen={true} /> */}
		</Providers>
	);
}
