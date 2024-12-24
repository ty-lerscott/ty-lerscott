import React from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { icons, ChevronRight } from "lucide-react";

import {
	SidebarMenu,
	SidebarGroup,
	SidebarFooter,
	SidebarHeader,
	SidebarMenuSub,
	SidebarContent,
	SidebarMenuItem,
	SidebarGroupLabel,
	SidebarMenuButton,
	SidebarMenuSubItem,
	SidebarGroupContent,
	SidebarMenuSubButton,
	Sidebar as ShadCNSidebar,
} from "@/components/ui/sidebar";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { getMenu } from "@/lib/cms";
import type { Page, Menu, MenuItem } from "@/types";

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
	const [navigation, socials = []] = await Promise.all([
		getMenu("sidebar"),
		// getMenu("socials")
	]);

	if (!navigation) return null;

	return (
		<div className="relative flex">
			<ShadCNSidebar variant="floating">
				<SidebarHeader className="text-center pb-0">
					<p className="text-xl font-bold">Tyler Scott</p>
				</SidebarHeader>
				<SidebarContent>
					<SidebarGroup>
						<SidebarGroupLabel>App</SidebarGroupLabel>
						<SidebarGroupContent>
							<SidebarMenu>
								{navigation.items.map(({ item }) => {
									if ((item as Menu).items) {
										const _item = item as Menu;
										const items = _item.items as { item: MenuItem }[];

										return (
											<Collapsible
												asChild
												defaultOpen
												key={item.id}
												className="group/collapsible"
											>
												<SidebarMenuItem>
													<CollapsibleTrigger asChild>
														<SidebarMenuButton>
															{_item.icon ? getIcon(_item.icon) : null}
															{_item.name ? <span>{_item.name}</span> : null}
															<ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
														</SidebarMenuButton>
													</CollapsibleTrigger>
													<CollapsibleContent>
														<SidebarMenuSub>
															{items.map(({ item }) => {
																const href =
																	item.href || item?.page?.metadata.slug || "";
																const title =
																	item?.page?.metadata?.title || item.text;

																return (
																	<SidebarMenuSubItem key={item.id}>
																		<SidebarMenuSubButton asChild size="sm">
																			<Link href={href}>{title}</Link>
																		</SidebarMenuSubButton>
																	</SidebarMenuSubItem>
																);
															})}
														</SidebarMenuSub>
													</CollapsibleContent>
												</SidebarMenuItem>
											</Collapsible>
										);
									}

									const _item = item as MenuItem;
									const { metadata } = _item.page as Page;

									return (
										<SidebarMenuItem key={metadata.title}>
											<SidebarMenuButton asChild>
												<Link href={metadata.slug}>
													{getIcon(item.icon as string)}
													<span>{metadata.title}</span>
												</Link>
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

				{/* <div className="self-end bottom-6 absolute left-full">
					<SidebarTrigger
						variant="ghost"
						className="rounded-none rounded-r-md"
					/> 
				</div>*/}
			</ShadCNSidebar>
		</div>
	);
};

export { SidebarProvider } from "@/components/ui/sidebar";
export { Sidebar };
