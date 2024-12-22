import React from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { icons } from "lucide-react";

import {
	SidebarMenu,
	SidebarGroup,
	SidebarFooter,
	SidebarHeader,
	SidebarContent,
	SidebarTrigger,
	SidebarMenuItem,
	SidebarGroupLabel,
	SidebarMenuButton,
	SidebarGroupContent,
	Sidebar as ShadCNSidebar,
} from "@/components/ui/sidebar";
import { getMenu } from "@/lib/cms";
import type { Page } from "@/types/page.type";

const getIcon = (icon: string) => {
	const LucideIcon = icons[icon as keyof typeof icons];

	return LucideIcon ? <LucideIcon /> : <span>{icon} not found</span>;
};

const SOCIALS = {
	bmac: dynamic(() =>
		import("react-icons/bi").then((module) => module.BiCoffeeTogo),
	),
	github: dynamic(() =>
		import("react-icons/ai").then((module) => module.AiFillGithub),
	),
	linkedin: dynamic(() =>
		import("react-icons/ai").then((module) => module.AiFillLinkedin),
	),
	instagram: dynamic(() =>
		import("react-icons/ai").then((module) => module.AiFillInstagram),
	),
	twitter: dynamic(() =>
		import("react-icons/ai").then((module) => module.AiFillTwitterSquare),
	),
};

const Sidebar = async () => {
	const [navigation, socials] = await Promise.all([
		getMenu("sidebar"),
		getMenu("socials"),
	]);

	if (!navigation) return null;

	return (
		<div className="relative flex">
			<ShadCNSidebar variant="floating">
				<SidebarHeader className="text-center pb-0">
					<h1 className="text-xl font-bold">Tyler Scott</h1>
				</SidebarHeader>
				<SidebarContent>
					<SidebarGroup>
						<SidebarGroupLabel>App</SidebarGroupLabel>
						<SidebarGroupContent>
							<SidebarMenu>
								{navigation.map((item) => {
									const { metadata } = item.page as Page;

									return (
										<SidebarMenuItem key={metadata.title}>
											<SidebarMenuButton asChild>
												<a href={metadata.slug}>
													{getIcon(item.icon as string)}
													<span>{metadata.title}</span>
												</a>
											</SidebarMenuButton>
										</SidebarMenuItem>
									);
								})}
							</SidebarMenu>
						</SidebarGroupContent>
					</SidebarGroup>
				</SidebarContent>
				{socials ? (
					<SidebarFooter className="mb-2">
						<ul className="flex justify-center gap-2 list-none">
							{socials.map(({ brand, href }) => {
								const Icon = SOCIALS[brand as keyof typeof SOCIALS];

								return (
									<li key={brand as string}>
										<Link
											className="block p-1 hover:opacity-75 transition-opacity duration-300"
											target="_blank"
											href={href as string}
											rel="noopener noreferrer"
										>
											<Icon className="size-4" />
										</Link>
									</li>
								);
							})}
						</ul>
					</SidebarFooter>
				) : null}

				<div className="self-end bottom-6 absolute left-full">
					<SidebarTrigger className="rounded-none rounded-r-md" />
				</div>
			</ShadCNSidebar>
		</div>
	);
};

export { SidebarProvider } from "@/components/ui/sidebar";
export { Sidebar };
