"use client";

import { sort } from "fast-sort";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import SectionHeader from "../components/section-header";

import type {
  Resume,
  ResumeSkill as ResumeSkillType,
  ResumeSkill,
} from "@/types/generics.types";
import {
  Select,
  SelectItem,
  SelectValue,
  SelectTrigger,
  SelectContent,
} from "@/components/ui/select";

import { MdFavorite } from "react-icons/md";
import styles from "./styles/skills.module.css";

type SortBy = "name" | "comfortLevel" | "years" | "favorite" | "default";

type ModifiedSkill = ResumeSkillType & { years: string };

const SORTER = (value: SortBy) => (i: ModifiedSkill) => {
  if (value === "default") {
    return i;
  }

  return ["boolean", "number"].includes(typeof i[value])
    ? i[value]
    : (i[value] as string).toLowerCase();
};

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

const Skills = ({ skills }: { skills: ModifiedSkill[] }) => {
  const [sortBy, setSortBy] = useState<SortBy>("default");
  const [isChecked, setIsChecked] = useState<boolean>(true);
  const [sortedSkills, setSkills] = useState<ModifiedSkill[]>(skills);

  const handleSort = (value: SortBy) => {
    setSortBy(value);

    setSkills((current) => {
      return value === "default"
        ? skills
        : isChecked
          ? sort(current).asc([SORTER(value)])
          : sort(current).desc([SORTER(value)]);
    });
  };

  const toggleOrder = (value: boolean) => {
    setIsChecked(value);

    setSkills((current) => {
      return value
        ? sort(current).asc([SORTER(sortBy)])
        : sort(current).desc([SORTER(sortBy)]);
    });
  };

  return (
    <div data-testid="Skills" className={styles.Skills}>
      <SectionHeader header="Skills" />
      <div className={styles.SelectWrapper}>
        <Select onValueChange={handleSort}>
          <SelectTrigger className="border-t-0 border-b-0 border-l-0 border-r-2 border-r-[--color-dark]">
            <SelectValue placeholder="Default" className="text-sm" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="default">Default</SelectItem>
            <SelectItem value="favorite">Preferred</SelectItem>
            <SelectItem value="years">Years of Experience</SelectItem>
            <SelectItem value="name">Alphabetical</SelectItem>
            <SelectItem value="comfortLevel">Comfort Level</SelectItem>
          </SelectContent>
          <div className="flex justify-between items-center p-2">
            <span className="text-2xs font-semibold text-[--color-medium-light]">
              desc
            </span>
            <Switch
              checked={isChecked}
              onCheckedChange={toggleOrder}
              disabled={sortBy === "default"}
            />
            <span className="text-2xs font-semibold text-[--color-medium-light]">
              asc
            </span>
          </div>
        </Select>
      </div>
      <div className={styles.SkillsList}>
        {sortedSkills.map((props) => {
          return <Skill {...props} key={props.name} />;
        })}
      </div>
    </div>
  );
};

export default Skills;
