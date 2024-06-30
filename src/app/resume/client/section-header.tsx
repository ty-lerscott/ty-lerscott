import type { ReactNode } from "react";
import Header from "@/components/component-map/header";

import styles from "../styles.module.css";

const SectionHeader = ({
  header,
  subheader,
}: {
  header: string;
  subheader?: string | ReactNode | null;
}) => {
  return (
    <Header
      header={header}
      className={styles.SectionHeader}
      {...(subheader && {
        subheader: (
          <small className={styles.SectionSubheader}>{subheader}</small>
        ),
      })}
    />
  );
};

export default SectionHeader;
