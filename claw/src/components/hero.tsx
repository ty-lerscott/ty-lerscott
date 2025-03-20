import { ArrowRight, CheckCircle } from "lucide-react";

import Button from "@/components/ui/button";

const Hero = () => {
	return (
		<section className="py-20 md:py-28">
			<div className="container px-4 md:px-6">
				<div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
					<div className="flex flex-col justify-center space-y-4">
						<div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
							Job Search Simplified
						</div>
						<h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
							AI-Powered Cover Letters & Application Tracking
						</h1>
						<p className="text-muted-foreground md:text-xl">
							Create tailored cover letters in seconds and keep track of all
							your job applications in one place.
						</p>
						<div className="flex flex-col sm:flex-row gap-3">
							<Button size="lg" className="gap-1">
								Get Started <ArrowRight className="h-4 w-4" />
							</Button>
							<Button variant="outline" size="lg">
								See Demo
							</Button>
						</div>
						<div className="flex items-center gap-2 text-sm text-muted-foreground">
							<CheckCircle className="h-4 w-4 text-primary" />
							<span>No credit card required</span>
						</div>
					</div>
					<div className="flex justify-center lg:justify-end">
						<div className="relative w-full max-w-[500px] aspect-video rounded-xl overflow-hidden border shadow-xl">
							<img
								src="/placeholder.svg?height=400&width=600"
								alt="Dashboard preview"
								className="object-cover"
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Hero;
