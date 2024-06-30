import type { Header } from "@/types/generics.types";

import styles from "../styles.module.css";

const Education = ({ header, subheader }: Header) => {
  return (
    <div>
      <p className={styles.EducationHeader}>{header}</p>
      <p className={styles.EducationSubheader}>{subheader}</p>
    </div>
  );
};

export default Education;
