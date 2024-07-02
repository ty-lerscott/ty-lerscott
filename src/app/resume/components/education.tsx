import type { Header } from "@/types/generics.types";
import SectionHeader from "@/app/resume/components/section-header";

import styles from "./styles/education.module.css";

const EducationItem = ({ header, subheader }: Header) => {
  return (
    <div className={styles.Education}>
      <p className={styles.EducationHeader}>{header}</p>
      <p className={styles.EducationSubheader}>{subheader}</p>
    </div>
  );
};

const Education = ({ education }: { education: Header[] }) => {
  return (
    <>
      <SectionHeader header="Education" />
      <div className={styles.EducationList}>
        {education.map((props) => {
          return <EducationItem {...props} key={props.header as string} />;
        })}
      </div>
    </>
  );
};

export default Education;
