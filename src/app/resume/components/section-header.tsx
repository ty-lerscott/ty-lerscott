import { cn } from "@/lib/utils";
import Header from "@/components/component-map/header";

import styles from "./styles/section-header.module.css";

const SectionHeader = ({
  header,
  className,
}: {
  header: string;
  className?: string;
}) => {
  return (
    <Header
      header={header}
      tag="h3"
      className={cn(styles.SectionHeader, className)}
    />
  );
};

export default SectionHeader;
