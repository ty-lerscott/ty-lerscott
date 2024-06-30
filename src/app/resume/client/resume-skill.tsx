import dayjs from "dayjs";
import { cn } from "@/lib/utils";
import { MdFavorite } from "react-icons/md";
import { yearsOfExperience } from "./utils";
import styles from "@/app/resume/styles.module.css";
import type { ResumeSkill } from "@/types/generics.types";

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
      <span className="uppercase">{title}</span>
      <span>{value}</span>
    </p>
  );
};

const ResumeSkill = ({
  name,
  comfortLevel,
  startDate,
  isActive,
  endDate,
  isEven,
  favorite,
}: ResumeSkill & { isEven: boolean }) => {
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
    <div className="even:bg-[--color-darkest] px-4 py-2">
      <p className="flex items-center gap-1 mb-1">
        <span className="text-sm tracking-wider text-[--color-medium-light]">
          {name}
        </span>
        {favorite && (
          <MdFavorite
            className={cn(
              "size-3",
              isEven ? "text-[--color-darkest]" : "text-[--color-dark]",
            )}
          />
        )}
      </p>
      <div>
        <SkillRow
          title="Comfort Level"
          value={comfortLevel}
          className={cn("border-b-2", [
            isEven ? "border-[--color-darkest]" : "border-[--color-darker]",
          ])}
        />
        <SkillRow {...dateProps} />
      </div>
    </div>
  );
};

export default ResumeSkill;
