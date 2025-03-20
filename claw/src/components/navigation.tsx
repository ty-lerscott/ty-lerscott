import Link from "next/link";
import { Sparkles } from "lucide-react";

import Button from "@/components/ui/button";

const Navigation = () => {
	return (
		<header className="border-b">
			<div className="container flex h-16 items-center justify-between">
				<div className="flex items-center gap-2 font-bold text-xl">
					<Sparkles className="h-5 w-5 text-primary" />
					<span>CoverGenius</span>
				</div>
				<nav className="hidden md:flex gap-6">
					<Link
						href="#features"
						className="text-sm font-medium hover:text-primary"
					>
						Features
					</Link>
					<Link
						href="#how-it-works"
						className="text-sm font-medium hover:text-primary"
					>
						How It Works
					</Link>
					<Link
						href="#pricing"
						className="text-sm font-medium hover:text-primary"
					>
						Pricing
					</Link>
				</nav>
				<div className="flex items-center gap-4">
					<Button variant="outline" size="sm">
						Log in
					</Button>
					<Button size="sm">Sign up</Button>
				</div>
			</div>
		</header>
	);
};

export default Navigation;
