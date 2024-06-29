"use client";

import dayjs from "dayjs";
import { useEffect, useState } from "react";
import type { Resume } from "@/types/generics.types";
import { useTransition, animated, config } from "@react-spring/web";
import Breadcrumbs, { type Breadcrumb } from "@/components/breadcrumbs";

import styles from "./styles.module.css";

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

const yearsOfExperience = (date: string): string =>
  String(Number(new Date().getFullYear()) - Number(date));

const ResumeClient = ({
  roles,
  education,
  resumeBio,
  resumeSkills,
  workExperience,
}: Omit<Resume, "body"> & { roles: string[] }) => {
  const [position, setPosition] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setPosition((current) =>
        current === roles.length - 1 ? 0 : current + 1,
      );
    }, 3000);

    return () => clearInterval(timer);
  }, [setPosition, roles]);

  const transitions = useTransition(roles, {
    from: { opacity: 1, transform: "translate3d(0,0px,0)" },
    enter: { opacity: 1, transform: "translate3d(0,0px,0)" },
    leave: { opacity: 0, transform: "translate3d(0,10px,0)" },
    config: { ...config.stiff, duration: 300 },
  });

  const matches = resumeBio.match(/{{(.*?)}}/);
  const professionalExperience = Array.isArray(matches)
    ? yearsOfExperience(matches[1].split(":")[1])
    : "";

  return (
    <>
      <Breadcrumbs breadcrumbs={BREADCRUMBS} />

      <div data-testid="ResumeHeader" className={styles.Header}>
        <div className={styles.Wrapper}>
          <h1 className={styles.Name}>Tyler Scott Williams</h1>
          <div className={styles.AnimatedTextWrapper}>
            {transitions((style, item) => {
              console.log(item);
              gi;
              return (
                <animated.span style={style} className={styles.TextWrapper}>
                  {item}
                </animated.span>
              );
            })}
          </div>
        </div>
      </div>

      <div
        data-testid="ResumeBody"
        className="flex flex-row-reverse border-x-2 border-b-2"
      >
        <div data-testid="Experiences" className="bg-blue-500 border-l-2 grow">
          <div data-testid="WorkExperience" className="p-4">
            <h2>Experience</h2>
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
          <div data-testid="Education" className="border-t-2 p-4">
            <h2>Education</h2>
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
        <div data-testid="Sidebar" className="bg-amber-500 w-[35%]">
          <div data-testid="Bio" className="p-4">
            <h2>Bio</h2>
            {resumeBio.replace(/{{(.*?)}}/, professionalExperience)}
          </div>
          <div data-testid="Contact" className="p-4 border-t-2">
            <h2>Contact</h2>
            <p>607 882 0531</p>
            <p>ty@lerscott.com</p>
            <p>https://ty.lerscott.com</p>
          </div>
          <div data-testid="Skills" className="p-4 border-t-2">
            <h2>Skills</h2>
            {resumeSkills.map(({ name, proficiency, startDate }) => {
              return (
                <div key={`Skill-${name}`} className="flex gap-2">
                  <span>{name}</span>
                  <span>{proficiency}/10</span>
                  <span>
                    {yearsOfExperience(dayjs(startDate).format("YYYY"))} years
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default ResumeClient;
