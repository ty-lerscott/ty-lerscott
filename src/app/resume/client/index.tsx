"use client";

import dayjs from "dayjs";
import { sort } from "fast-sort";
import { useState } from "react";
import ResumeSkill from "./resume-skill";
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
          <div data-testid="WorkExperience" className="p-4">
            <SectionHeader header="Experience" />
            <div className="mt-2">
              {workExperience.map(
                (
                  {
                    title,
                    company,
                    location,
                    workStyle,
                    startDate,
                    endDate,
                    body,
                  },
                  index,
                ) => {
                  const experienceLine2 = `${company} - ${location}${workStyle !== "in-office" ? ` - ${workStyle}` : ""}`;
                  const date = `${dayjs(startDate).format("MMM YYYY")} -
                          ${
                            endDate
                              ? dayjs(endDate).format("MMM YYYY")
                              : "Present"
                          }`;
                  return (
                    <div key={`WorkExperience-${title}-${index}`}>
                      <div data-testid="Experience">
                        <div data-testid="ExperienceHeader">
                          <div>
                            <span>{title}</span>
                            <span>{experienceLine2}</span>
                          </div>
                          <span>{date}</span>
                        </div>
                        <p>{body}</p>
                      </div>
                    </div>
                  );
                },
              )}
            </div>
          </div>
          <div data-testid="Education" className="border-t-2 p-4">
            <SectionHeader header="Education" />
            {education.map((item) => {
              return (
                <div key={`Education-${item.header}`}>
                  <span>{item.header}</span>
                  <span>{item.subheader}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div data-testid="Sidebar" className={styles.Sidebar}>
          <div data-testid="Bio" className="p-4">
            <SectionHeader
              header="About"
              subheader={resumeBio.replace(/{{(.*?)}}/, professionalExperience)}
            />
          </div>
          <div data-testid="Contact" className={styles.Contact}>
            <SectionHeader
              header="Contact"
              subheader={
                <>
                  <span className="block text-[--color-medium]">
                    607 882 0531
                  </span>
                  <span className="block mt-1 text-[--color-medium]">
                    ty@lerscott.com
                  </span>
                  <span className="block mt-1 text-[--color-medium]">
                    https://ty.lerscott.com
                  </span>
                </>
              }
            />
          </div>
          <div data-testid="Skills" className="pt-4 border-t-2">
            <SectionHeader header="Skills" />
            <div className={styles.SkillsList}>
              {skills.map((props, index) => {
                return (
                  <ResumeSkill
                    {...props}
                    key={props.name}
                    isEven={index % 2 === 0}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResumeClient;
