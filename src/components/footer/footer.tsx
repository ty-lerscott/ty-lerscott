import Separator from "@/components/ui/separator";

import styles from "./styles.module.css";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <div className="w-full mt-8" data-testid="Footer">
      <Separator />
      <footer className={styles.Footer}>
        <span className="text-xs text-[--color-dark]">
          Copyright &copy; {year} | All rights reserved.
        </span>
      </footer>
    </div>
  );
};

export default Footer;
