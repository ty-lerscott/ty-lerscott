import dayjs from "dayjs";
import { cache } from "react";
import pkg from "~/package.json";
import Rating from "@/components/rating";
import { setMetadata } from "@/lib/utils";
import { getPage } from "@/lib/contentful";
import { FaRegCalendar } from "react-icons/fa6";
import { AiFillLinkedin } from "react-icons/ai";
import { MdEmail, MdPhone, MdHouse } from "react-icons/md";
import type { Header, Resume, Text } from "@/types/generics.types";

import styles from "./styles.module.css";

const getData = cache(async () => {
  return getPage<Resume>("resume");
});

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

const contactInfo = {
  author: {
    Icon: MdEmail,
    text: pkg.author.email,
  },
  phone: {
    Icon: MdPhone,
    text: pkg.author.phone,
  },
  address: {
    Icon: MdHouse,
    text: pkg.author.address,
  },
  linkedin: {
    Icon: AiFillLinkedin,
    text: pkg.author.linkedin,
  },
};

const Page = async () => {
  const { resumeSkills, workExperience, education } = await getData();

  const experience = (workExperience || []).reverse();

  return (
    <div className={styles.Page}>
      <div>
        <h1 className={styles.Name}>{pkg.author.name}</h1>
        <h2 className={styles.Profession}>{pkg.author.profession}</h2>
      </div>
      <div className={styles.Contact}>
        {Object.values(contactInfo).map(({ text, Icon }) => {
          return (
            <div key={text} className={styles.ContactItem}>
              <div>
                <Icon className={styles.Icon} />
              </div>
              <p>{text}</p>
            </div>
          );
        })}
      </div>
      <div className={styles.Body}>
        <div className={styles.WorkExperiences}>
          <h2 className={styles.Header}>Work Experience</h2>
          {experience.map(
            ({ name, title, company, location, startDate, endDate, body }) => {
              const date = `${dayjs(startDate).format("MMM YYYY")} -
                          ${
                            endDate
                              ? dayjs(endDate).format("MMM YYYY")
                              : "Present"
                          }`;
              return (
                <div key={name} className={styles.Experience}>
                  <h3>{title}</h3>
                  <p className={styles.ExperienceCompanyLocation}>
                    {company} &#x2022; {location}
                  </p>
                  <p className={styles.ExperienceDate}>
                    <FaRegCalendar className={styles.ExperienceCalendar} />{" "}
                    <span>{date}</span>
                  </p>
                  {(body || []).map((bodyItem, index) => {
                    return (
                      <p
                        key={`${title}-${index}`}
                        className={styles.ExperienceBody}
                      >
                        {(bodyItem as Header).header ? (
                          <>
                            <span>{(bodyItem as Header).header}: </span>
                            {(bodyItem as Header).subheader ? (
                              <span>{(bodyItem as Header).subheader}</span>
                            ) : null}
                          </>
                        ) : (
                          (bodyItem as Text).text
                        )}
                      </p>
                    );
                  })}
                </div>
              );
            },
          )}
        </div>
        <div className={styles.Sidebar}>
          <h2 className={styles.Header}>Education</h2>
          {education.map((item) => {
            return (
              <div className={styles.Education} key={item.header as string}>
                <h5>{item.header}</h5>
                <p className={styles.EducationDuration}>{item.subheader}</p>
              </div>
            );
          })}
          <h2 className={styles.Header}>Skills</h2>
          {resumeSkills.map((item) => {
            return (
              <div key={item.name} className={styles.Skill}>
                <p>{item.name}</p>
                <Rating rating={item.comfortLevel / 2} invert />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Page;
