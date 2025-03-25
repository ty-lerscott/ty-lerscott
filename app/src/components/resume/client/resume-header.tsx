"use client";

import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";

const Header = ({ roles }: { roles: string[] }) => {
	const [position, setPosition] = useState<number>(0);
	const controls = useAnimation();

	useEffect(() => {
		if (Array.isArray(roles) && roles.length > 0) {
			const timer = setInterval(async () => {
				await controls.start({ top: "0.5rem", opacity: 0 }, { duration: 0.25 });

				setPosition((state) => (state === roles.length - 1 ? 0 : state + 1));
			}, 3000);

			return () => clearInterval(timer);
		}
	}, [roles, controls]);

	return Array.isArray(roles) && roles.length > 0 ? (
		<div data-testid="ResumeHeader" className="text-center">
			<div className="relative flex flex-col items-center p-8">
				<h1 className="uppercase w-max border-2 border-[--ghost] rounded text-3xl md:text-5xl px-10 py-8">
					Tyler Scott Williams
				</h1>
				<div className="absolute bg-[--background] bottom-5" key={position}>
					<p className="text-transparent absolute">{roles[position]}</p>
					<motion.p
						animate={controls}
						className="bottom-0 bg-[--background] text-[--ghost] font-semibold px-8 tracking-widest relative text-xl"
						transition={{
							duration: 0.2,
						}}
					>
						{roles[position]}
					</motion.p>
				</div>
			</div>
		</div>
	) : null;
};

export default Header;
