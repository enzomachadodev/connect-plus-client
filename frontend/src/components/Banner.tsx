import Image from "next/image";
import React from "react";

const Banner = () => {
	return (
		<div className="w-full max-w-2xl">
			<Image
				src={"/images/logo.png"}
				width={1000}
				height={1000}
				alt=""
				className="w-full object-cover"
				priority
			/>
			<h3 className="text-xl font-bold text-white">
				Simplifique e otimize seu gerenciamento de contatos com ConnecPlus: a escolha
				inteligente para o seu negócio.
			</h3>
		</div>
	);
};

export default Banner;
