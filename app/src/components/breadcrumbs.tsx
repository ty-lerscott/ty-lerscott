import Link from "next/link";
import { Fragment } from "react";

import {
	Breadcrumb as BreadcrumbComponent,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export type Breadcrumb = {
	href: string;
	title: string;
};

const MAX_LENGTH = 15;

const Breadcrumbs = ({ breadcrumbs }: { breadcrumbs: Breadcrumb[] }) => {
	return (
		<div data-testid="Breadcrumbs">
			<BreadcrumbComponent>
				<BreadcrumbList>
					{breadcrumbs.map(({ href, ...props }, index) => {
						const title = props.title.substring(0, MAX_LENGTH);
						return (
							<Fragment key={title}>
								<BreadcrumbItem>
									<BreadcrumbLink asChild>
										<Link href={href}>
											{`${title}${props.title.length > MAX_LENGTH ? "..." : ""}`}
										</Link>
									</BreadcrumbLink>
								</BreadcrumbItem>
								{index !== breadcrumbs.length - 1 ? (
									<BreadcrumbSeparator />
								) : null}
							</Fragment>
						);
					})}
				</BreadcrumbList>
			</BreadcrumbComponent>
		</div>
	);
};

export default Breadcrumbs;
