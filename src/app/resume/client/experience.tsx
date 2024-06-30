import dayjs from "dayjs";
import type { WorkExperience, Header, Text } from "@/types/generics.types";

import styles from "./styles/experience.module.css";

const Experience = ({
  body,
  title,
  company,
  endDate,
  location,
  workStyle,
  startDate,
}: WorkExperience) => {
  const located = `${company} - ${location}${workStyle !== "in-office" ? ` - (${workStyle})` : ""}`;
  const date = `${dayjs(startDate).format("MMM YYYY")} -
                          ${
                            endDate
                              ? dayjs(endDate).format("MMM YYYY")
                              : "Present"
                          }`;
  return (
    <div data-testid="Experience" className={styles.Experience}>
      <div
        data-testid="ExperienceHeader"
        className={styles.ExperienceHeaderWrapper}
      >
        <div className={styles.ExperienceHeader}>
          <small className={styles.Title}>{title}</small>
          <span className={styles.Date}>{date}</span>
        </div>
        <span className={styles.ExperienceSubheader}>{located}</span>
      </div>
      <div className={styles.BodyList}>
        {body.map((bodyItem, index) => {
          return (
            <p className={styles.Body} key={`${title}-${index}`}>
              {(bodyItem as Header).header ? (
                <>
                  <span className={styles.BodyHeader}>
                    {(bodyItem as Header).header}:{" "}
                  </span>
                  {(bodyItem as Header).subheader ? (
                    <span className={styles.BodySubheader}>
                      {(bodyItem as Header).subheader}
                    </span>
                  ) : null}
                </>
              ) : (
                (bodyItem as Text).text
              )}
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default Experience;
