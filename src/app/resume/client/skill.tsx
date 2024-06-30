import dayjs from "dayjs";
import { cn } from "@/lib/utils";
import { MdFavorite } from "react-icons/md";
import { yearsOfExperience } from "./utils";
import type { ResumeSkill } from "@/types/generics.types";

import styles from "../styles.module.css";

const SkillRow = ({
  title,
  value,
  className,
}: {
  title: string;
  value: number | string;
  className?: string;
}) => {
  return (
    <p className={cn(styles.SkillRow, className)}>
      <span className={styles.SkillTitle}>{title}</span>
      <span className="leading-4">{value}</span>
    </p>
  );
};

const Skill = ({
  name,
  endDate,
  isActive,
  favorite,
  startDate,
  comfortLevel,
}: ResumeSkill) => {
  if (!isActive && !endDate) {
    throw new Error(
      `ResumeSkill ${name} is inactive and does not have an end date`,
    );
  }

  const start = dayjs(startDate);
  const end = isActive || !endDate ? null : dayjs(endDate);

  const dateProps = {
    title: "Experience",
    value: `${
      isActive
        ? yearsOfExperience(start.format("YYYY"))
        : end
          ? end.year() - start.year()
          : ""
    } y`,
  };

  return (
    <div className={styles.Skill}>
      <p className={styles.SkillHeader}>
        <span className={styles.SkillName}>{name}</span>
        {favorite && <MdFavorite className={styles.Svg} />}
      </p>
      <div>
        <SkillRow value={comfortLevel} title="Comfort Level" />
        <SkillRow {...dateProps} />
      </div>
    </div>
  );
};

export default Skill;
