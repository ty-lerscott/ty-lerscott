import dayjs from "dayjs";
import type { WorkExperience } from "@/types/generics.types";

import styles from "../styles.module.css";

const Experience = ({
  body,
  title,
  company,
  endDate,
  location,
  workStyle,
  startDate,
}: WorkExperience) => {
  const located = `${company} - ${location}${workStyle !== "in-office" ? ` - ${workStyle}` : ""}`;
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
      <p className={styles.Body}>{body}</p>
    </div>
  );
};

export default Experience;
