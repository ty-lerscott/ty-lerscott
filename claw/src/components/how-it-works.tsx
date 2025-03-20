const HowItWorks = () => {
	return (
		<section id="how-it-works" className="py-16">
			<div className="container px-4 md:px-6">
				<div className="flex flex-col items-center justify-center space-y-4 text-center">
					<div className="space-y-2">
						<div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
							How It Works
						</div>
						<h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
							Simple Process, Powerful Results
						</h2>
						<p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
							Our platform makes it easy to create professional cover letters
							and track your applications
						</p>
					</div>
				</div>
				<div className="grid gap-8 mt-12 md:grid-cols-3">
					<div className="relative flex flex-col items-center space-y-4">
						<div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white text-xl font-bold">
							1
						</div>
						<h3 className="text-xl font-bold">Upload Your Resume</h3>
						<p className="text-center text-muted-foreground">
							Upload your resume and our AI will analyze your skills and
							experience.
						</p>
					</div>
					<div className="relative flex flex-col items-center space-y-4">
						<div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white text-xl font-bold">
							2
						</div>
						<h3 className="text-xl font-bold">Paste Job Description</h3>
						<p className="text-center text-muted-foreground">
							Add the job description and company details for your target
							position.
						</p>
					</div>
					<div className="relative flex flex-col items-center space-y-4">
						<div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white text-xl font-bold">
							3
						</div>
						<h3 className="text-xl font-bold">Generate & Track</h3>
						<p className="text-center text-muted-foreground">
							Get your customized cover letter instantly and log your
							application in the tracker.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
};

export default HowItWorks;
