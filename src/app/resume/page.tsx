import { cache } from "react";
import { setMetadata } from "@/lib/utils";
import { getPage } from "@/lib/contentful";
import type { Resume } from "@/types/generics.types";
import Breadcrumbs, { type Breadcrumb } from "@/components/breadcrumbs";

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
    keywords: resp.keywords,
    description: resp.description,
  });
};

const Resume = async () => {
  const resume = await getData();

  console.dir(resume, { depth: null });
  return <div>RESUME</div>;
};

export default Resume;
