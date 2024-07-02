import SectionHeader from "./section-header";
import type { Resume } from "@/types/generics.types";
import { yearsOfExperience } from "@/app/resume/utils";

import styles from "./styles/about.module.css";

const About = ({ about }: { about: Resume["resumeBio"] }) => {
  const matches = about.match(/{{(.*?)}}/);
  const professionalExperience = Array.isArray(matches)
    ? yearsOfExperience(matches[1].split(":")[1])
    : 0;

  return (
    <>
      <SectionHeader header="About" />
      <p className={styles.About}>
        {about.replace(/{{(.*?)}}/, String(professionalExperience))}
      </p>
    </>
  );
};

export default About;
