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

const MAX_LENGTH = 15;

const Breadcrumbs = ({ breadcrumbs }: { breadcrumbs: Breadcrumb[] }) => {
  return (
    <div data-testid="Breadcrumbs">
      <Breadcrumb>
        <BreadcrumbList>
          {breadcrumbs.map(({ href, ...props }, index) => {
            const title = props.title.substring(0, MAX_LENGTH);
            return (
              <Fragment key={title}>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link
                      href={href}
                      className="text-[color:inherit] hover:text-[--ghost-action]"
                    >
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
      </Breadcrumb>
    </div>
  );
};

export default Breadcrumbs;
