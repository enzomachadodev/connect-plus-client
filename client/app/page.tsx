"use client";

import { Login } from "@/components/Login";
import { Register } from "@/components/Register";
import { AuthContext } from "@/contexts/AuthContext";
import { redirect, usePathname } from "next/navigation";
import { Router } from "next/router";
import { useContext, useEffect } from "react";

export default function Home() {
	const pathname = usePathname();
	const { isAuthenticated } = useContext(AuthContext);

	useEffect(() => {
		if (isAuthenticated) {
			redirect("/dashboard");
		}
	});

	return (
		<main className="w-full h-full flex items-center justify-center">
			<div className="hidden md:flex md:w-1/2 h-full border-red-500 border-2"></div>
			<div className="w-full h-full py-8 md:w-1/2 flex flex-col justify-start md:justify-center items-center overflow-auto">
				{pathname === "/register" ? <Register /> : <Login />}
			</div>
		</main>
	);
}
