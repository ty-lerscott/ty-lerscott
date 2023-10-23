import Link from "next/link";

const Navigation = () => {
  return (
    <nav className="flex w-screen py-2 px-4 justify-between border-b">
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
      </ul>
    </nav>
  );
};

export default Navigation;
