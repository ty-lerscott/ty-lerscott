import { cache } from "react";
import ResumeClient from "./client";
import { setMetadata } from "@/lib/utils";
import { getPage } from "@/lib/contentful";
import type { Resume, Text } from "@/types/generics.types";

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
  const { body, ...props } = await getData();
  const roles = body.map((item) => (item as Text).text) as string[];

  return (
    <div data-testid="Page-Resume">
      <ResumeClient {...props} roles={roles} />
    </div>
  );
};

export default Resume;
