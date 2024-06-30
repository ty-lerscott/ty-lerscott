import dayjs from "dayjs";
import { cache } from "react";
import ResumeClient from "./client";
import { setMetadata } from "@/lib/utils";
import { getPage } from "@/lib/contentful";
import { yearsOfExperience } from "./client/utils";
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
  const skills = props.resumeSkills.map((item) => {
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

  return (
    <div data-testid="Page-Resume">
      <ResumeClient {...props} resumeSkills={skills} roles={roles} />
    </div>
  );
};

export default Resume;
