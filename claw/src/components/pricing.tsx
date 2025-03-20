import { CheckCircle } from "lucide-react";
import Button from "@/components/ui/button";

const Pricing = () => {
	return (
		<section id="pricing" className="py-16">
			<div className="container px-4 md:px-6">
				<div className="flex flex-col items-center justify-center space-y-4 text-center">
					<div className="space-y-2">
						<div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
							Pricing
						</div>
						<h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
							Choose Your Plan
						</h2>
						<p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
							Affordable options for every job seeker
						</p>
					</div>
				</div>
				<div className="grid gap-8 mt-12 md:grid-cols-3">
					<div className="flex flex-col rounded-lg border bg-background p-6 shadow-sm">
						<div className="space-y-2">
							<h3 className="text-2xl font-bold">Free</h3>
							<p className="text-muted-foreground">
								Get started with basic features
							</p>
						</div>
						<div className="mt-4 flex items-baseline">
							<span className="text-4xl font-bold">$0</span>
							<span className="ml-1 text-muted-foreground">/month</span>
						</div>
						<ul className="mt-6 space-y-3">
							<li className="flex items-center">
								<CheckCircle className="mr-2 h-4 w-4 text-primary" />
								<span>3 AI cover letters per month</span>
							</li>
							<li className="flex items-center">
								<CheckCircle className="mr-2 h-4 w-4 text-primary" />
								<span>Basic application tracker</span>
							</li>
							<li className="flex items-center">
								<CheckCircle className="mr-2 h-4 w-4 text-primary" />
								<span>Email support</span>
							</li>
						</ul>
						<Button className="mt-8" variant="outline">
							Get Started
						</Button>
					</div>
					<div className="flex flex-col rounded-lg border bg-primary p-6 shadow-sm text-primary-foreground">
						<div className="space-y-2">
							<h3 className="text-2xl font-bold">Pro</h3>
							<p className="text-primary-foreground/90">
								Perfect for active job seekers
							</p>
						</div>
						<div className="mt-4 flex items-baseline">
							<span className="text-4xl font-bold">$12</span>
							<span className="ml-1 text-primary-foreground/90">/month</span>
						</div>
						<ul className="mt-6 space-y-3">
							<li className="flex items-center">
								<CheckCircle className="mr-2 h-4 w-4" />
								<span>Unlimited AI cover letters</span>
							</li>
							<li className="flex items-center">
								<CheckCircle className="mr-2 h-4 w-4" />
								<span>Advanced application tracker</span>
							</li>
							<li className="flex items-center">
								<CheckCircle className="mr-2 h-4 w-4" />
								<span>Resume analyzer</span>
							</li>
							<li className="flex items-center">
								<CheckCircle className="mr-2 h-4 w-4" />
								<span>Priority support</span>
							</li>
						</ul>
						<Button className="mt-8" variant="secondary">
							Get Started
						</Button>
					</div>
					<div className="flex flex-col rounded-lg border bg-background p-6 shadow-sm">
						<div className="space-y-2">
							<h3 className="text-2xl font-bold">Enterprise</h3>
							<p className="text-muted-foreground">
								For teams and organizations
							</p>
						</div>
						<div className="mt-4 flex items-baseline">
							<span className="text-4xl font-bold">$49</span>
							<span className="ml-1 text-muted-foreground">/month</span>
						</div>
						<ul className="mt-6 space-y-3">
							<li className="flex items-center">
								<CheckCircle className="mr-2 h-4 w-4 text-primary" />
								<span>Everything in Pro</span>
							</li>
							<li className="flex items-center">
								<CheckCircle className="mr-2 h-4 w-4 text-primary" />
								<span>Team management</span>
							</li>
							<li className="flex items-center">
								<CheckCircle className="mr-2 h-4 w-4 text-primary" />
								<span>Custom branding</span>
							</li>
							<li className="flex items-center">
								<CheckCircle className="mr-2 h-4 w-4 text-primary" />
								<span>API access</span>
							</li>
							<li className="flex items-center">
								<CheckCircle className="mr-2 h-4 w-4 text-primary" />
								<span>Dedicated account manager</span>
							</li>
						</ul>
						<Button className="mt-8" variant="outline">
							Contact Sales
						</Button>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Pricing;
