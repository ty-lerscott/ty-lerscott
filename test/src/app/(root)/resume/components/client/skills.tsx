"use client";

import dayjs from "dayjs";
import { sort } from "fast-sort";
import { MdFavorite } from "react-icons/md";
import { useState, type ReactNode, isValidElement } from "react";

import Rating from "../rating";
import { yearsAgo, cn } from "@/lib/utils";
import SectionHeader from "../section-header";
import { Switch } from "@/components/ui/switch";
import type { Skill as SkillType } from "@/types";
import { Separator } from "@/components/ui/separator";
import {
	Select,
	SelectItem,
	SelectContent,
	SelectPlaceholder,
} from "@/components/ui/select";

import styles from "./skills.module.css";

type SortBy = "name" | "comfort_level" | "years" | "favorite" | "default";

type ModifiedSkill = SkillType & { years: number };

const setSkill = (skills: SkillType[]) =>
	skills.map((item) => {
		const start = dayjs(item.start_date);
		const end =
			item.is_actively_in_use || !item.end_date ? null : dayjs(item.end_date);
		const newItem = item as ModifiedSkill;

		newItem.years = item.is_actively_in_use
			? yearsAgo(start.format("YYYY"))
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
			{isValidElement(value) ? value : <span>{value}</span>}
		</div>
	);
};

const Skill = ({ name, years, favorite, comfort_level }: ModifiedSkill) => {
	return (
		<div className={styles.Skill}>
			<p className={styles.SkillHeader}>
				<span className={styles.SkillName}>{name}</span>
				{favorite && <MdFavorite className={styles.Svg} />}
			</p>
			<SkillRow
				title="Comfort Level"
				value={<Rating rating={comfort_level / 2} invert />}
			/>
			<Separator className="h-[1px] my-1" data-testid="separator" />
			<SkillRow
				value={`${years || "<1"}y`}
				title="Experience"
				className="[&>span]:last:tracking-[0.125em]"
			/>
		</div>
	);
};

const Skills = ({ skills }: { skills: SkillType[] }) => {
	const [sortBy, setSortBy] = useState<SortBy>("default");
	const [isChecked, setIsChecked] = useState<boolean>(false);
	const [sortedSkills, setSkills] = useState<ModifiedSkill[]>(setSkill(skills));

	const handleSort = (value: SortBy) => {
		setSortBy(value);

		setSkills((current) => {
			return value === "default"
				? setSkill(skills)
				: sort(current).by(
						isChecked ? [{ asc: SORTER(value) }] : [{ desc: SORTER(value) }],
					);
		});
	};

	const toggleOrder = (value: boolean) => {
		setIsChecked(value);

		setSkills((current) =>
			sort(current).by(
				value ? [{ asc: SORTER(sortBy) }] : [{ desc: SORTER(sortBy) }],
			),
		);
	};

	return (
		<>
			<SectionHeader className={styles.Header}>Skills</SectionHeader>
			<div className={styles.SelectWrapper}>
				<Select onValueChange={handleSort}>
					<SelectPlaceholder className={styles.Select} placeholder="Default" />

					<SelectContent>
						<SelectItem value="default">Default</SelectItem>
						<SelectItem value="name">Alphabetical</SelectItem>
						<SelectItem value="comfort_level">Comfort Level</SelectItem>
						<SelectItem value="favorite">Preferred</SelectItem>
						<SelectItem value="years">Years of Experience</SelectItem>
					</SelectContent>
				</Select>
				<div className={styles.SortOrder}>
					<span
						className={styles.OrderName}
						data-state={sortBy === "default" ? "disabled" : "enabled"}
					>
						desc
					</span>
					<Switch
						checked={isChecked}
						onCheckedChange={toggleOrder}
						disabled={sortBy === "default"}
					/>
					<span
						className={styles.OrderName}
						data-state={sortBy === "default" ? "disabled" : "enabled"}
					>
						asc
					</span>
				</div>
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
