import "@/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { Providers } from "@/components/Providers";
import { useTheme } from "next-themes";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
	return (
		<Providers>
			<main
				className={`h-screen font-sans text-white bg-cover bg-[url('../../public//images/bg-teste.jpg')] transition duration-300 overflow-auto`}
			>
				<Component {...pageProps} />
				<ToastContainer theme={"light"} position="top-right" autoClose={3000} />
			</main>
		</Providers>
	);
}
