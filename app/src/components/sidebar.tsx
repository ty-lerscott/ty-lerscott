import React from "react";
import Link from "next/link";
import { icons, ChevronRight } from "lucide-react";

import SOCIALS from "./social-map";
import { getMenu } from "@/lib/cms";
import type { Page, Menu, Link as LinkType } from "@/types";

import {
	SidebarMenu,
	SidebarGroup,
	SidebarFooter,
	SidebarHeader,
	SidebarMenuSub,
	SidebarContent,
	SidebarMenuItem,
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

const getIcon = (icon: string) => {
	const LucideIcon = icons[icon as keyof typeof icons];

	return LucideIcon ? <LucideIcon /> : null;
};

const Sidebar = async () => {
	const [navigation, socials] = await Promise.all([
		getMenu("sidebar"),
		getMenu("socials"),
	]);

	if (!navigation?.items) return null;

	return (
		<div className="relative flex">
			<ShadCNSidebar variant="floating">
				<SidebarHeader className="text-center pb-0">
					<p className="text-xl font-bold">Tyler Scott</p>
				</SidebarHeader>
				<SidebarContent>
					<SidebarGroup>
						<SidebarGroupContent>
							<SidebarMenu>
								{navigation.items.map(({ item }) => {
									if ((item as Menu).items) {
										const { id, items, icon, name } = item as Menu;

										return (
											<Collapsible
												asChild
												key={id}
												defaultOpen
												className="group/collapsible"
											>
												<SidebarMenuItem>
													<CollapsibleTrigger asChild>
														<SidebarMenuButton>
															{icon ? getIcon(icon) : null}
															{name ? <span>{name}</span> : null}
															<ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
														</SidebarMenuButton>
													</CollapsibleTrigger>
													<CollapsibleContent>
														<SidebarMenuSub>
															{items.map(({ item }) => {
																const {
																	id,
																	metadata: { slug, title },
																} = item as Page;

																return (
																	<SidebarMenuSubItem key={id}>
																		<SidebarMenuSubButton asChild size="sm">
																			<Link href={slug}>{title}</Link>
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

									const { metadata, icon } = item as Page;

									return (
										<SidebarMenuItem key={metadata.title}>
											<SidebarMenuButton asChild>
												<Link href={metadata.slug}>
													{getIcon(icon as string)}
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
						<ul className="flex justify-center gap-1 list-none">
							{(socials.items || []).map(({ item }) => {
								const { brand, href } = item as LinkType;
								const Icon = SOCIALS[brand as keyof typeof SOCIALS];

								return (
									<li key={brand as string}>
										<Link
											className="block p-1 hover:opacity-75 transition-opacity duration-300"
											target="_blank"
											href={href as string}
											rel="noopener noreferrer"
										>
											<Icon className="size-5" />
										</Link>
									</li>
								);
							})}
						</ul>
					</SidebarFooter>
				) : null}
			</ShadCNSidebar>
		</div>
	);
};

export { SidebarProvider } from "@/components/ui/sidebar";
export { Sidebar };
