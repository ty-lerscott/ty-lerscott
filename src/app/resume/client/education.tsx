import type { Header } from "@/types/generics.types";

import styles from "./styles/education.module.css";

const Education = ({ header, subheader }: Header) => {
  return (
    <div className={styles.Education}>
      <p className={styles.EducationHeader}>{header}</p>
      <p className={styles.EducationSubheader}>{subheader}</p>
    </div>
  );
};

export default Education;
