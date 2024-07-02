"use client";

import dayjs from "dayjs";
import { cn } from "@/lib/utils";
import { sort } from "fast-sort";
import Index from "@/components/rating";
import { MdFavorite } from "react-icons/md";
import { yearsOfExperience } from "../utils";
import { Switch } from "@/components/ui/switch";
import Separator from "@/components/ui/separator";
import SectionHeader from "../components/section-header";
import type { ResumeSkill } from "@/types/generics.types";
import { useState, type ReactNode, isValidElement } from "react";
import {
  Select,
  SelectItem,
  SelectValue,
  SelectTrigger,
  SelectContent,
} from "@/components/ui/select";

import styles from "./styles/skills.module.css";

type SortBy = "name" | "comfortLevel" | "years" | "favorite" | "default";

type ModifiedSkill = ResumeSkill & { years: number };

const setSkill = (skills: ResumeSkill[]) =>
  skills.map((item) => {
    const start = dayjs(item.startDate);
    const end = item.isActive || !item.endDate ? null : dayjs(item.endDate);
    const newItem = item as ModifiedSkill;

    newItem.years = item.isActive
      ? yearsOfExperience(start.format("YYYY"))
      : end
        ? end.year() - start.year()
        : 0;

    return newItem;
  });

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
  className,
}: {
  title: string;
  className?: string;
  value: number | ReactNode;
}) => {
  return (
    <div className={cn(styles.SkillRow, className)}>
      <span className={styles.SkillTitle}>{title}</span>
      {isValidElement(value) ? (
        value
      ) : (
        <span className={styles.SkillValue}>{value}</span>
      )}
    </div>
  );
};

const Skill = ({ name, years, favorite, comfortLevel }: ModifiedSkill) => {
  return (
    <div className={styles.Skill}>
      <p className={styles.SkillHeader}>
        <span className={styles.SkillName}>{name}</span>
        {favorite && <MdFavorite className={styles.Svg} />}
      </p>
      <SkillRow
        title="Comfort Level"
        value={<Index rating={comfortLevel / 2} />}
      />
      <Separator className="h-[1px] my-1" data-testid="separator" />
      <SkillRow
        value={`${years || `<1`}y`}
        title="Experience"
        className="[&>span]:last:tracking-[0.125em]"
      />
    </div>
  );
};

const Skills = ({ skills }: { skills: ResumeSkill[] }) => {
  const [sortBy, setSortBy] = useState<SortBy>("default");
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [sortedSkills, setSkills] = useState<ModifiedSkill[]>(setSkill(skills));

  // TODO: sort by regular then alphabetize the sort
  const handleSort = (value: SortBy) => {
    setSortBy(value);

    const sorter = isChecked
      ? [{ asc: SORTER(value) }]
      : [{ desc: SORTER(value) }];

    setSkills((current) => {
      return value === "default" ? setSkill(skills) : sort(current).by(sorter);
    });
  };

  const toggleOrder = (value: boolean) => {
    setIsChecked(value);

    const sorter = value
      ? [{ asc: SORTER(sortBy) }]
      : [{ desc: SORTER(sortBy) }];

    setSkills((current) => {
      return sort(current).by(sorter);
    });
  };

  return (
    <>
      <SectionHeader header="Skills" />
      <div className={styles.SelectWrapper}>
        <Select onValueChange={handleSort}>
          <SelectTrigger className="border-t-0 border-b-0 border-l-0 border-r-2 border-r-[--color-medium-dark]">
            <SelectValue placeholder="Default" className="text-sm" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="default">Default</SelectItem>
            <SelectItem value="favorite">Preferred</SelectItem>
            <SelectItem value="years">Years of Experiences</SelectItem>
            <SelectItem value="name">Alphabetical</SelectItem>
            <SelectItem value="comfortLevel">Comfort Level</SelectItem>
          </SelectContent>
          <div className="flex justify-between items-center p-2">
            <span className="text-2xs font-semibold text-[--color-text-secondary]">
              asc
            </span>
            <Switch
              checked={isChecked}
              onCheckedChange={toggleOrder}
              disabled={sortBy === "default"}
            />
            <span className="text-2xs font-semibold text-[--color-text-secondary]">
              desc
            </span>
          </div>
        </Select>
      </div>
      <div className={styles.SkillsList}>
        {sortedSkills.map((props) => {
          return <Skill {...props} key={props.name} />;
        })}
      </div>
    </>
  );
};

export default Skills;
