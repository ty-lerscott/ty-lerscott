import { Fragment } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";

export type Breadcrumb = {
  href: string;
  title: string;
};

const Breadcrumbs = ({ breadcrumbs }: { breadcrumbs: Breadcrumb[] }) => {
  return (
    <div data-testid="Breadcrumbs">
      <Breadcrumb>
        <BreadcrumbList>
          {breadcrumbs.map(({ href, title }, index) => {
            return (
              <Fragment key={title}>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href={href}>{title}</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {index !== breadcrumbs.length - 1 ? (
                  <BreadcrumbSeparator />
                ) : null}
              </Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

export default Breadcrumbs;
