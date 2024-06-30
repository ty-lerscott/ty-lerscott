import Header from "@/components/component-map/header";

import styles from "../styles.module.css";

const SectionHeader = ({ header }: { header: string }) => {
  return <Header header={header} className={styles.SectionHeader} />;
};

export default SectionHeader;
