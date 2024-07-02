import Link from "next/link";
import pkg from "~/package.json";
import dynamic from "next/dynamic";
import { getMenu } from "@/lib/contentful";
import Separator from "@/components/ui/separator";
import type { SocialLink } from "@/types/generics.types";

import styles from "./styles.module.css";

const SOCIALS = {
  github: dynamic(() =>
    import("react-icons/ai").then((module) => module.AiFillGithub),
  ),
  linkedin: dynamic(() =>
    import("react-icons/ai").then((module) => module.AiFillLinkedin),
  ),
  instagram: dynamic(() =>
    import("react-icons/ai").then((module) => module.AiFillInstagram),
  ),
  twitter: dynamic(() =>
    import("react-icons/ai").then((module) => module.AiFillTwitterSquare),
  ),
};

const Footer = async () => {
  const menuItems = await getMenu<SocialLink>("Footer");
  const year = new Date().getFullYear();
  const pkgs = [
    `Next.js v${pkg.dependencies.next}`,
    `Typescript v${pkg.devDependencies.typescript}`,
    `Tailwindcss v${pkg.devDependencies.tailwindcss}`,
    `${pkg.cms} CMS`,
  ];

  return (
    <div className="w-full" data-testid="Footer">
      <Separator />
      <footer className={styles.Footer}>
        <div className="leading-none">
          <span className="text-xs">
            Copyright &copy; {year} | All rights reserved.
          </span>

          <p className={styles.BuiltWith}>Built with: {pkgs.join(", ")}</p>
        </div>

        <ul className={styles.List}>
          {(menuItems || []).map((item) => {
            const Icon =
              SOCIALS[item.brand.toLowerCase() as keyof typeof SOCIALS];

            return (
              <li key={item.brand}>
                <Link
                  className="block p-1 last:pr-0"
                  target="_blank"
                  href={item.href}
                  rel="noopener noreferrer"
                >
                  <Icon className="size-5" />
                </Link>
              </li>
            );
          })}
        </ul>
      </footer>
    </div>
  );
};

export default Footer;
