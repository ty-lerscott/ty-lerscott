import { ScrollText, Home, Newspaper, User } from "lucide-react";
import {
	Sidebar as ShadCNSidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarHeader,
	SidebarTrigger,
	SidebarMenu,
	SidebarMenuItem,
	SidebarGroupLabel,
	SidebarMenuButton,
	SidebarGroupContent,
} from "@/components/ui/sidebar";

export { SidebarProvider } from "@/components/ui/sidebar";

// Menu items.
const items = [
	{
		title: "Home",
		url: "#",
		icon: Home,
	},
	{
		title: "Posts",
		url: "#",
		icon: Newspaper,
	},
	{
		title: "About",
		url: "#",
		icon: User,
	},
	{
		title: "Resume",
		url: "#",
		icon: ScrollText,
	},
];

const Sidebar = () => {
	return (
		<div className="relative flex">
			<ShadCNSidebar variant="floating">
				<SidebarContent>
					<SidebarGroup>
						<SidebarGroupLabel>App</SidebarGroupLabel>
						<SidebarGroupContent>
							<SidebarMenu>
								{items.map((item) => (
									<SidebarMenuItem key={item.title}>
										<SidebarMenuButton asChild>
											<a href={item.url}>
												<item.icon />
												<span>{item.title}</span>
											</a>
										</SidebarMenuButton>
									</SidebarMenuItem>
								))}
							</SidebarMenu>
						</SidebarGroupContent>
					</SidebarGroup>
				</SidebarContent>
			</ShadCNSidebar>

			<div className="self-end bottom-6 absolute left-full">
				<SidebarTrigger className="bg-sidebar rounded-none rounded-r-md" />
			</div>
		</div>
	);
};

export { Sidebar };
