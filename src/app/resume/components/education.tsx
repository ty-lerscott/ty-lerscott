import Header from "@/components/component-map/header";
import SectionHeader from "@/app/resume/components/section-header";
import type { Header as HeaderProps } from "@/types/generics.types";

import styles from "./styles/education.module.css";

const EducationItem = ({ header, subheader }: HeaderProps) => {
  return (
    <div className={styles.Education}>
      <Header
        header={header}
        subheader={subheader}
        className={styles.EducationHeader}
        subClassName={styles.EducationSubheader}
      />
    </div>
  );
};

const Education = ({ education }: { education: HeaderProps[] }) => {
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
