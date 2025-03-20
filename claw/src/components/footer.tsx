import Link from "next/link";
import { Sparkles } from "lucide-react";

const Footer = () => {
	return (
		<footer className="border-t py-12">
			<div className="container px-4 md:px-6">
				<div className="grid grid-cols-2 md:grid-cols-4 gap-8">
					<div className="space-y-4">
						<div className="flex items-center gap-2 font-bold text-xl">
							<Sparkles className="h-5 w-5 text-primary" />
							<span>CoverGenius</span>
						</div>
						<p className="text-sm text-muted-foreground">
							AI-powered cover letters and job application tracking
						</p>
					</div>
					<div className="space-y-4">
						<h4 className="font-medium">Product</h4>
						<ul className="space-y-2 text-sm text-muted-foreground">
							<li>
								<Link href="#" className="hover:text-primary">
									Features
								</Link>
							</li>
							<li>
								<Link href="#" className="hover:text-primary">
									Pricing
								</Link>
							</li>
							<li>
								<Link href="#" className="hover:text-primary">
									Testimonials
								</Link>
							</li>
							<li>
								<Link href="#" className="hover:text-primary">
									FAQ
								</Link>
							</li>
						</ul>
					</div>
					<div className="space-y-4">
						<h4 className="font-medium">Legal</h4>
						<ul className="space-y-2 text-sm text-muted-foreground">
							<li>
								<Link href="#" className="hover:text-primary">
									Privacy Policy
								</Link>
							</li>
							<li>
								<Link href="#" className="hover:text-primary">
									Terms of Service
								</Link>
							</li>
							<li>
								<Link href="#" className="hover:text-primary">
									Cookie Policy
								</Link>
							</li>
						</ul>
					</div>
				</div>
				<div className="mt-8 border-t pt-8 flex flex-col md:flex-row justify-between items-center">
					<p className="text-sm text-muted-foreground">
						© 2025 CoverGenius. All rights reserved.
					</p>
					<div className="flex space-x-4 mt-4 md:mt-0">
						<Link href="#" className="text-muted-foreground hover:text-primary">
							<span className="sr-only">Twitter</span>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
								className="h-5 w-5"
							>
								<title>Twitter</title>
								<path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
							</svg>
						</Link>
						<Link href="#" className="text-muted-foreground hover:text-primary">
							<span className="sr-only">LinkedIn</span>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
								className="h-5 w-5"
							>
								<title>LinkedIn</title>
								<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
								<rect width="4" height="12" x="2" y="9" />
								<circle cx="4" cy="4" r="2" />
							</svg>
						</Link>
						<Link href="#" className="text-muted-foreground hover:text-primary">
							<span className="sr-only">Facebook</span>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
								className="h-5 w-5"
							>
								<title>Facebook</title>
								<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
							</svg>
						</Link>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
