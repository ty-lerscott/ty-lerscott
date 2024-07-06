import { cache } from "react";
import dynamic from "next/dynamic";
import Header from "./client/header";
import { setMetadata } from "@/lib/utils";
import Contact from "./components/contact";
import { getPage } from "@/lib/contentful";
import type { Resume } from "@/types/generics.types";
import Breadcrumbs, { type Breadcrumb } from "@/components/breadcrumbs";

import styles from "./styles.module.css";

const Skills = dynamic(() => import("./client/skills"));
const About = dynamic(() => import("./components/about"));
const Education = dynamic(() => import("./components/education"));
const Experiences = dynamic(() => import("./components/experiences"));

const getData = cache(async () => {
  return getPage<Resume>("resume");
});

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
    keywords: `${resp.keywords}${(resp.resumeSkills.filter(Boolean) || []).map((item) => item.name).join(",")}`,
  });
};

export default async function Resume() {
  const { body, education, workExperience, resumeBio, resumeSkills } =
    await getData();

  // TODO: mobile styling
  return (
    <div data-testid="Page-Resume">
      <Breadcrumbs breadcrumbs={BREADCRUMBS} />

      <div className={styles.Page}>
        <Header body={body} />

        <div data-testid="ResumeBody" className={styles.ResumeBody}>
          <div data-testid="Experiences" className={styles.Experiences}>
            {workExperience.length ? (
              <Experiences experiences={workExperience} />
            ) : null}

            {education.length ? <Education education={education} /> : null}
          </div>

          <div data-testid="Sidebar" className={styles.Sidebar}>
            {resumeBio ? <About about={resumeBio} /> : null}

            <Contact />

            {resumeSkills.length ? <Skills skills={resumeSkills} /> : null}
          </div>
        </div>
      </div>
    </div>
  );
}
