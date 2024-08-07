import { Fragment } from "react";
import Separator from "@/components/ui/separator";
import Header from "@/components/component-map/header";
import type { Header as HeaderProps } from "@/types/generics.types";
import SectionHeader from "@/app/(root)/resume/components/section-header";

import styles from "./styles/education.module.css";

const EducationItem = ({ header, subheader }: HeaderProps) => {
  return (
    <div className={styles.EducationItem}>
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
        {education.map((props, index) => {
          return (
            <Fragment key={props.header as string}>
              {index > 0 ? <Separator orientation="vertical" /> : null}
              <EducationItem {...props} />
            </Fragment>
          );
        })}
      </div>
    </>
  );
};

export default Education;
