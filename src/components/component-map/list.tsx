import dynamic from "next/dynamic";
import type { List as ListType } from "@/types/generics.types";

const Header = dynamic(() => import("@/components/component-map/header"));

const List = ({
  type,
  ordered,
  body,
  header,
  subheader,
}: Omit<ListType, "name">) => {
  const Tag = ordered ? "ol" : "ul";

  const headerProps = { header, subheader, wrapperClassName: "mb-1" };

  return (
    <div data-testid="List">
      {header ? <Header {...headerProps} /> : null}
      <Tag>
        {body.map((item, index) => {
          return item.type === "list" ? (
            <List
              type={type}
              body={item.body}
              ordered={ordered}
              key={`SubList-${index}`}
            />
          ) : (
            <li key={`ListItem-${index}`}>
              <span>{item.text}</span>
            </li>
          );
        })}
      </Tag>
    </div>
  );
};

export default List;
