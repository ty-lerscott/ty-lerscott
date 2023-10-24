import Link from "next/link";
import Image from "next/image";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/DropdownMenu";

const Navigation = ({ theme, setTheme }) => {
  return (
    <nav
      className={`flex w-screen py-2 px-4 justify-between border-b border-b-primary ${theme}`}
    >
      <h1 className="text-lg">
        <Link href="/">Tyler Scott</Link>
      </h1>
      <ul className="flex flex-wrap content-center">
        <li>
          <Link href="https://github.com/ty-lerscott/" target="_blank">
            GitHub
          </Link>
        </li>
        <li className="ml-4">
          <Link
            href="https://www.linkedin.com/in/tylerscottwilliams/"
            target="_blank"
          >
            Linkedin
          </Link>
        </li>
        <li className="ml-4 flex flex-wrap content-center">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Image
                src="/color.svg"
                alt="Color Toggle"
                width="20"
                height="20"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-background">
              <DropdownMenuLabel>Color Theme</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
                <DropdownMenuRadioItem value="default">
                  Default
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="dark">Dark</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
