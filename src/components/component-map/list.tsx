import type { List as ListType } from "@/types/generics.types";

const List = ({ ordered, body }: Omit<ListType, "name">) => {
  const Tag = ordered ? "ol" : "ul";

  return (
    <Tag data-testid="List">
      {body.map((item, index) => {
        return item.type === "list" ? (
          <List
            type="list"
            body={item.body}
            ordered={ordered}
            key={`SubList-${index}`}
          />
        ) : (
          <li key={`ListItem-${index}`}>{item.text}</li>
        );
      })}
    </Tag>
  );
};

export default List;
