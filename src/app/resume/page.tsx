import { cache } from "react";
import { setMetadata } from "@/lib/utils";
import { getPage } from "@/lib/contentful";
import type { Resume, Text } from "@/types/generics.types";
import Breadcrumbs, { type Breadcrumb } from "@/components/breadcrumbs";

import "./styles.scss";

const BREADCRUMBS: Breadcrumb[] = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Resume",
    href: "/resume",
  },
];

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

const Resume = async () => {
  const { body, resumeSkills, workExperience, education } = await getData();
  const roles = body as Text[];

  // console.dir(body, { depth: null });
  return (
    <div className="border-2 p-4" data-testid="Page-Resume">
      <div className="header">
        <div className="name-title">
          <h1 className="name">Tyler Scott Williams</h1>
          <p className="title">{roles[0].text}</p>
        </div>
      </div>
    </div>
  );
};

export default Resume;
