import pkg from "~/app/package.json";

const Footer = () => {
	const pkgs = [
		`Next.js v${pkg.dependencies.next}`,
		`Typescript v${pkg.devDependencies.typescript}`,
		`Tailwindcss v${pkg.devDependencies.tailwindcss}`,
		`Directus v${pkg.dependencies["@directus/sdk"]}`,
	];

	return (
		<footer className="text-xs mt-8 text-right text-[--ghost]">
			<p>Copyright &copy; {new Date().getFullYear()} | All rights reserved.</p>
			<p>Built with: {pkgs.join(", ")}</p>
		</footer>
	);
};

export default Footer;
