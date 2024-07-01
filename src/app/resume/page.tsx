import dayjs from "dayjs";
import { cache } from "react";
import Skills from "./client/skills";
import Header from "./client/header";
import { getPage } from "@/lib/contentful";
import { yearsOfExperience } from "./utils";
import { cn, setMetadata } from "@/lib/utils";
import Education from "./components/education";
import Experience from "./components/experience";
import SectionHeader from "./components/section-header";
import type { Resume, WorkExperience } from "@/types/generics.types";
import Breadcrumbs, { type Breadcrumb } from "@/components/breadcrumbs";

import styles from "./styles.module.css";

const getData = cache(async () => getPage<Resume>("resume"));

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

const Resume = async () => {
  const { body, education, workExperience, resumeBio, ...props } =
    await getData();

  // I would prefer Array.prototype.toReversed(), but that's not part of the standard yet
  // using slice reverse as a hacky alternative
  const experiences = workExperience.slice().reverse() as WorkExperience[];

  const skills = (props.resumeSkills || []).map((item) => {
    const start = dayjs(item.startDate);
    const end = item.isActive || !item.endDate ? null : dayjs(item.endDate);

    const years = `${
      item.isActive
        ? yearsOfExperience(start.format("YYYY"))
        : end
          ? end.year() - start.year()
          : ""
    } y`;

    return {
      ...item,
      years,
    };
  });

  const matches = resumeBio.match(/{{(.*?)}}/);
  const professionalExperience = Array.isArray(matches)
    ? yearsOfExperience(matches[1].split(":")[1])
    : "";

  return (
    <div data-testid="Page-Resume">
      <Breadcrumbs breadcrumbs={BREADCRUMBS} />
      <Header body={body} />
      <div data-testid="ResumeBody" className={styles.ResumeBody}>
        <div data-testid="Experiences" className={styles.Experiences}>
          {experiences.length ? (
            <>
              <SectionHeader header="Experience" />
              <div className={styles.ExperienceList}>
                {experiences.map((exp) => {
                  return <Experience key={exp.name} {...exp} />;
                })}
              </div>
            </>
          ) : null}

          {education.length ? (
            <>
              <SectionHeader header="Education" />
              <div className={styles.EducationList}>
                {education.map((props) => {
                  return <Education {...props} key={props.header as string} />;
                })}
              </div>
            </>
          ) : null}
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
          <Skills skills={skills} />
        </div>
      </div>
    </div>
  );
};

export default Resume;
