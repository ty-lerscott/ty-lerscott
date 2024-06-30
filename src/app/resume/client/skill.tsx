import { MdFavorite } from "react-icons/md";
import type { ResumeSkill } from "@/types/generics.types";

import styles from "./styles/skills.module.css";

const SkillRow = ({
  title,
  value,
}: {
  title: string;
  value: number | string;
}) => {
  return (
    <p className={styles.SkillRow}>
      <span className={styles.SkillTitle}>{title}</span>
      <span className="leading-4">{value}</span>
    </p>
  );
};

const Skill = ({
  name,
  years,
  favorite,
  comfortLevel,
}: ResumeSkill & { years: string }) => {
  return (
    <div className={styles.Skill}>
      <p className={styles.SkillHeader}>
        <span className={styles.SkillName}>{name}</span>
        {favorite && <MdFavorite className={styles.Svg} />}
      </p>
      <SkillRow value={comfortLevel} title="Comfort Level" />
      <SkillRow value={years} title="Experience" />
    </div>
  );
};

export default Skill;
