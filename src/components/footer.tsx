import { Separator } from "@/components/ui/separator";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <div className="w-full">
      <Separator />
      <div className="container max-w-screen-md flex items-center justify-between px-4 py-4">
        <footer>
          <span className="text-sm">
            Copyright &copy; {year} | All rights reserved.
          </span>
        </footer>
      </div>
    </div>
  );
};

export default Footer;
