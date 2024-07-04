import dynamic from "next/dynamic";
import type {
  Body,
  Link as LinkType,
  Text as TextType,
  Code as CodeType,
  List as ListType,
  Table as TableType,
  Quote as QuoteType,
  Space as SpaceType,
  Header as HeaderType,
} from "@/types/generics.types";
import { Root as SeparatorType } from "@radix-ui/react-separator";

const Table = dynamic(() => import("@/components/component-map/table"));
const Link = dynamic(() => import("@/components/component-map/link"));
const Separator = dynamic(() => import("@/components/ui/separator"));
const List = dynamic(() => import("@/components/component-map/list"));
const Text = dynamic(() => import("@/components/component-map/text"));
const Code = dynamic(() => import("@/components/component-map/code"));
const Quote = dynamic(() => import("@/components/component-map/quote"));
const Space = dynamic(() => import("@/components/component-map/space"));
const Header = dynamic(() => import("@/components/component-map/header"));

const getComponent = ({ type, ...props }: Body, index: number) => {
  const keyString = `Component-${type}-${index}`;

  switch (type) {
    case "text": {
      return <Text key={keyString} {...(props as TextType)} />;
    }
    case "code": {
      return <Code key={keyString} {...(props as CodeType)} />;
    }
    case "link": {
      return (
        <div key={keyString}>
          <Link {...(props as LinkType)} />
        </div>
      );
    }
    case "list": {
      return <List key={keyString} {...(props as ListType)} />;
    }
    case "quote": {
      return <Quote key={keyString} {...(props as QuoteType)} />;
    }
    case "table": {
      return <Table key={keyString} {...(props as TableType)} />;
    }
    case "header": {
      return <Header key={keyString} {...(props as HeaderType)} />;
    }
    case "separator": {
      return <Separator key={keyString} {...(props as typeof SeparatorType)} />;
    }
    case "space": {
      return <Space key={keyString} {...(props as SpaceType)} />;
    }
    default: {
      return (
        <div key={`Component-${type}-${index}`}>
          Component Map looking for: {type}
        </div>
      );
    }
  }
};

const ComponentMap = ({ components }: { components: Body[] }) =>
  components.map(getComponent);

export default ComponentMap;
