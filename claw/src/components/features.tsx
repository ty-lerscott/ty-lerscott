import { FileText, BarChart2, Sparkles } from "lucide-react";

const Features = () => {
	return (
		<section id="features" className="py-16 bg-slate-50 dark:bg-slate-900">
			<div className="container px-4 md:px-6">
				<div className="flex flex-col items-center justify-center space-y-4 text-center">
					<div className="space-y-2">
						<div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
							Features
						</div>
						<h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
							Everything You Need for Your Job Search
						</h2>
						<p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
							Streamline your job application process with our powerful tools
						</p>
					</div>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
					<div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
						<div className="rounded-full bg-primary/10 p-3">
							<FileText className="h-6 w-6 text-primary" />
						</div>
						<h3 className="text-xl font-bold">AI Cover Letter Generator</h3>
						<p className="text-center text-muted-foreground">
							Create personalized cover letters tailored to each job description
							in seconds using advanced AI.
						</p>
					</div>
					<div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
						<div className="rounded-full bg-primary/10 p-3">
							<BarChart2 className="h-6 w-6 text-primary" />
						</div>
						<h3 className="text-xl font-bold">Application Tracker</h3>
						<p className="text-center text-muted-foreground">
							Keep track of all your job applications, statuses, and follow-ups
							in one organized dashboard.
						</p>
					</div>
					<div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
						<div className="rounded-full bg-primary/10 p-3">
							<Sparkles className="h-6 w-6 text-primary" />
						</div>
						<h3 className="text-xl font-bold">Resume Analyzer</h3>
						<p className="text-center text-muted-foreground">
							Get instant feedback on your resume and suggestions to improve it
							for specific job postings.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Features;
