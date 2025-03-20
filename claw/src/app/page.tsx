import Link from "next/link";
import { ArrowRight, Sparkles, CheckCircle } from "lucide-react";

import Hero from "@/components/hero";
import Footer from "@/components/footer";
import Pricing from "@/components/pricing";
import Button from "@/components/ui/button";
import Features from "@/components/features";
import Navigation from "@/components/navigation";
import HowItWorks from "@/components/how-it-works";

export default function Home() {
	return (
		<main className="flex flex-col min-h-screen">
			<Navigation />
			<Hero />
			<Features />
			<HowItWorks />
			<Pricing />
			<Footer />
		</main>
	);
}
