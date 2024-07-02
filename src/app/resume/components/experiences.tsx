import dayjs from "dayjs";
import SectionHeader from "@/app/resume/components/section-header";
import type { WorkExperience, Header, Text } from "@/types/generics.types";

import styles from "./styles/experiences.module.css";

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
          <h5 className={styles.Title}>{title}</h5>
          <span className={styles.Date}>{date}</span>
        </div>
        <p className={styles.ExperienceSubheader}>{located}</p>
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

const Experiences = ({ experiences }: { experiences: WorkExperience[] }) => {
  /**
   * NOTE:
   *      I would prefer Array.prototype.toReversed(), but that's not part of the standard yet
   *      using slice reverse as a hacky alternative
   *  TODO: Replace with toReversed when it's standardized
   */
  const ordered = experiences.slice().reverse() as WorkExperience[];

  return (
    <>
      <SectionHeader header="Experience" />
      <div className={styles.ExperienceList}>
        {ordered.map((exp) => {
          return <Experience key={exp.name} {...exp} />;
        })}
      </div>
    </>
  );
};

export default Experiences;
