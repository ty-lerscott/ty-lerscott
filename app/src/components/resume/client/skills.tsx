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
		<div
			className={cn(
				"text-[--foreground] flex justify-between text-2xs font-semibold",
				className,
			)}
		>
			<span className="uppercase tracking-widest self-end">{title}</span>
			{isValidElement(value) ? value : <span>{value}</span>}
		</div>
	);
};

const Skill = ({ name, years, favorite, comfort_level }: ModifiedSkill) => {
	return (
		<div className="even:bg-[--sidebar] p-4">
			<p className="flex items-center gap-1 mb-2">
				<span className="text-[--white] text-xs tracking-widest">{name}</span>
				{favorite && <MdFavorite className="size-2.5 text-[--white]" />}
			</p>
			<SkillRow
				title="Comfort"
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

const Skills = ({
	skills,
	isSimple,
}: { skills: SkillType[]; isSimple?: boolean }) => {
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
		<div style={{ gridArea: "skills" }}>
			<div className={cn("flex flex-col border-y-2 border-[--ghost]")}>
				<h3 className="p-4 text-center uppercase tracking-widest">Skills</h3>
			</div>
			{!isSimple && (
				<div className="border-b-2 border-[--ghost] md:grid-cols-[5fr_4fr] grid-cols-2 sm:grid">
					<Select onValueChange={handleSort}>
						<SelectPlaceholder
							className="border-0 border-r-2"
							placeholder="Default"
						/>

						<SelectContent>
							<SelectItem value="default">Default</SelectItem>
							<SelectItem value="name">Alphabetical</SelectItem>
							<SelectItem value="comfort_level">Comfort Level</SelectItem>
							<SelectItem value="favorite">Preferred</SelectItem>
							<SelectItem value="years">Years of Experience</SelectItem>
						</SelectContent>
					</Select>
					<div className="flex justify-between items-center p-4">
						<span
							className="text-xs font-semibold data-[state=disabled]:text-[--ghost] data-[state=enabled]:text-[--foreground]"
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
							className="text-xs font-semibold data-[state=disabled]:text-[--ghost] data-[state=enabled]:text-[--foreground]"
							data-state={sortBy === "default" ? "disabled" : "enabled"}
						>
							asc
						</span>
					</div>
				</div>
			)}
			<div
				className={cn(
					"flex flex-col",
					isSimple
						? ""
						: "max-h-[62rem] scrollbar-hide overflow-y-scroll sm:block",
				)}
			>
				{sortedSkills.slice(0, 20).map((props) => {
					return <Skill {...props} key={props.name} />;
				})}
			</div>
		</div>
	);
};

export default Skills;
