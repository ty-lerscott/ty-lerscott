import type { Header as HeaderType } from "@/types/generics.types";

const Header = ({ tag, header, subheader }: HeaderType) => {
  const Tag = tag;

  return (
    <div data-testid="Header">
      <Tag>{header}</Tag>
      {subheader ? <span>{subheader}</span> : null}
    </div>
  );
};

export default Header;
