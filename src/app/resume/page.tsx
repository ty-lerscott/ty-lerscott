import dayjs from "dayjs";
import { cache } from "react";
import { setMetadata } from "@/lib/utils";
import { getPage } from "@/lib/contentful";
import type { Resume, Text } from "@/types/generics.types";
import Breadcrumbs, { type Breadcrumb } from "@/components/breadcrumbs";

import "./styles.scss";

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

const getData = cache(async () => getPage<Resume>("resume"));

export const generateMetadata = async () => {
  const resp = await getData();

  return setMetadata({
    alternates: {
      canonical: resp.slug,
    },
    title: resp.title,
    description: resp.description,
    keywords: [resp.keywords]
      .concat((resp.resumeSkills || []).map((item) => item.name))
      .join(", "),
  });
};

const yearsOfExperience = (date: string): string =>
  String(Number(new Date().getFullYear()) - Number(date));

const Resume = async () => {
  const { body, resumeSkills, workExperience, education, resumeBio } =
    await getData();
  const roles = body as Text[];
  const matches = resumeBio.match(/{{(.*?)}}/);
  const professionalExperience = Array.isArray(matches)
    ? yearsOfExperience(matches[1].split(":")[1])
    : "";

  return (
    <div data-testid="Page-Resume">
      <Breadcrumbs breadcrumbs={BREADCRUMBS} />
      <div data-testid="ResumeHeader" className="border-2 bg-lime-500 p-4">
        <div>
          <h1>Tyler Scott Williams</h1>
          <p>{roles[0].text}</p>
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
    </div>
  );
};

export default Resume;
