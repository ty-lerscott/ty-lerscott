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
import { Switch } from "@/components/ui/switch";
import Breadcrumbs, { type Breadcrumb } from "@/components/breadcrumbs";
import type {
  Resume,
  ResumeSkill as ResumeSkillType,
} from "@/types/generics.types";

import {
  Select,
  SelectItem,
  SelectValue,
  SelectTrigger,
  SelectContent,
} from "@/components/ui/select";

import styles from "../styles.module.css";

type SortBy = "name" | "comfortLevel" | "years" | "favorite";

type ModifiedSkill = ResumeSkillType & { years: string };

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
}: Omit<Resume, "body"> & {
  roles: string[];
  resumeSkills: ModifiedSkill[];
}) => {
  const [sortBy, setSortBy] = useState<SortBy>("favorite");
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [skills, setSkills] = useState<ModifiedSkill[]>(
    sort(resumeSkills).desc([(s) => s.favorite]),
  );

  const matches = resumeBio.match(/{{(.*?)}}/);
  const professionalExperience = Array.isArray(matches)
    ? yearsOfExperience(matches[1].split(":")[1])
    : "";

  const handleSort = (value: SortBy) => {
    setSortBy(value);
    setIsChecked(false);

    setSkills(() => {
      return sort(resumeSkills).asc([
        (i) =>
          ["boolean", "number"].includes(typeof i[value])
            ? i[value]
            : (i[value] as string).toLowerCase(),
      ]);
    });
  };

  const toggleOrder = (value: boolean) => {
    setIsChecked(value);

    setSkills((current) => {
      const sortFunc = (i: ModifiedSkill) => i[sortBy];

      return value
        ? sort(current).asc([sortFunc])
        : sort(current).desc([sortFunc]);
    });
  };

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
            <div className={styles.SelectWrapper}>
              <Select onValueChange={handleSort}>
                <SelectTrigger className="border-t-0 border-b-0 border-l-0 border-r-2 border-r-[--color-dark]">
                  <SelectValue placeholder="Preferred" className="text-sm" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="favorite">Preferred</SelectItem>
                  <SelectItem value="years">Years of Experience</SelectItem>
                  <SelectItem value="name">Alphabetical</SelectItem>
                  <SelectItem value="comfortLevel">Comfort Level</SelectItem>
                </SelectContent>
                <div className="flex justify-between items-center p-2">
                  <span className="text-2xs font-semibold text-[--color-medium-light]">
                    asc
                  </span>
                  <Switch checked={isChecked} onCheckedChange={toggleOrder} />
                  <span className="text-2xs font-semibold text-[--color-medium-light]">
                    desc
                  </span>
                </div>
              </Select>
            </div>
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
