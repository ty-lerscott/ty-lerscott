"use client";

import Skill from "./skill";
import { cn } from "@/lib/utils";
import { sort } from "fast-sort";
import { useState } from "react";
import Education from "./education";
import Experience from "./experience";
import ResumeHeader from "./resume-header";
import { yearsOfExperience } from "./utils";
import SectionHeader from "./section-header";
import Breadcrumbs, { type Breadcrumb } from "@/components/breadcrumbs";
import type {
  Resume,
  ResumeSkill as ResumeSkillType,
} from "@/types/generics.types";

import styles from "../styles.module.css";

const BREADCRUMBS = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Resume",
    href: "/resume",
  },
] as Breadcrumb[];

const ResumeClient = ({
  roles,
  education,
  resumeBio,
  resumeSkills,
  workExperience,
}: Omit<Resume, "body"> & { roles: string[] }) => {
  const [skills, setSkills] = useState<ResumeSkillType[]>(
    sort(resumeSkills).desc([(s) => s.favorite]),
  );

  const matches = resumeBio.match(/{{(.*?)}}/);
  const professionalExperience = Array.isArray(matches)
    ? yearsOfExperience(matches[1].split(":")[1])
    : "";

  return (
    <>
      <Breadcrumbs breadcrumbs={BREADCRUMBS} />
      <ResumeHeader roles={roles} />
      <div data-testid="ResumeBody" className={styles.ResumeBody}>
        <div data-testid="Experiences" className={styles.Experiences}>
          <SectionHeader header="Experience" />
          {workExperience.map((exp) => {
            return <Experience key={exp.name} {...exp} />;
          })}

          <div data-testid="Education" className={styles.EducationWrapper}>
            <SectionHeader header="Education" />
            <div className={styles.EducationList}>
              {education.map((props) => {
                return <Education {...props} key={props.header as string} />;
              })}
            </div>
          </div>
        </div>

        <div data-testid="Sidebar" className={styles.Sidebar}>
          <SectionHeader header="About" />
          <p className={styles.About}>
            {resumeBio.replace(/{{(.*?)}}/, professionalExperience)}
          </p>
          <div data-testid="Contact" className={styles.Contact}>
            <SectionHeader header="Contact" />
            <div className="p-4">
              <p className={styles.ContactRow}>607 882 0531</p>
              <p className={cn(styles.ContactRow, "mt-1")}>ty@lerscott.com</p>
              <p className={cn(styles.ContactRow, "mt-1")}>
                https://ty.lerscott.com
              </p>
            </div>
          </div>
          <div data-testid="Skills" className={styles.SkillsWrapper}>
            <SectionHeader header="Skills" />
            <div className={styles.SkillsList}>
              {skills.map((props) => {
                return <Skill {...props} key={props.name} />;
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResumeClient;
