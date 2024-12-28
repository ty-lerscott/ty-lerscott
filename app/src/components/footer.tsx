import pkg from "~/app/package.json";

const Footer = () => {
	const year = new Date().getFullYear();
	const pkgs = [
		`Next.js v${pkg.dependencies.next}`,
		`Typescript v${pkg.devDependencies.typescript}`,
		`Tailwindcss v${pkg.devDependencies.tailwindcss}`,
		`Directus v${pkg.dependencies["@directus/sdk"]}`,
	];

	return (
		<footer className="text-xs text-right text-[--subtle]">
			<p>Copyright &copy; {year} | All rights reserved.</p>
			<p>Built with: {pkgs.join(", ")}</p>
		</footer>
	);
};

export default Footer;