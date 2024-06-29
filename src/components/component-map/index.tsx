import dynamic from "next/dynamic";
import type { ReactElement } from "react";
import type { Body } from "@/types/generics.types";

const Link = dynamic(() => import("@/components/component-map/link"));
const Table = dynamic(() => import("@/components/component-map/table"));
const Header = dynamic(() => import("@/components/component-map/header"));
const Separator = dynamic(() => import("@/components/ui/separator"));
const List = dynamic(() => import("@/components/component-map/list"));
const Text = dynamic(() => import("@/components/component-map/text"));
const Code = dynamic(() => import("@/components/component-map/code"));
const Quote = dynamic(() => import("@/components/component-map/quote"));

const getComponent = ({ type, ...props }: Body, index: number) => {
  const keyString = `Component-${type}-${index}`;

  switch (type) {
    case "text": {
      return <Text key={keyString} {...props} />;
    }
    case "code": {
      return <Code key={keyString} {...props} />;
    }
    case "link": {
      return (
        <div key={keyString}>
          <Link {...props} />
        </div>
      );
    }
    case "list": {
      return <List key={keyString} {...props} />;
    }
    case "quote": {
      return <Quote key={keyString} {...props} />;
    }
    case "table": {
      return <Table key={keyString} {...props} />;
    }
    case "header": {
      return <Header key={keyString} {...props} />;
    }
    case "separator": {
      return (<Separator key={keyString} {...props} />) as ReactElement;
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

const ComponentMap = ({ components }: { components: Body[] }) => {
  return (
    <section data-testid="ComponentMap" className="flex flex-col gap-6">
      {components.map(getComponent)}
    </section>
  );
};

export default ComponentMap;
