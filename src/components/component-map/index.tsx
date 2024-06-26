import dynamic from "next/dynamic";
import type { Body } from "@/types/generics.types";

const Link = dynamic(() => import("@/components/component-map/link"));
const Separator = dynamic(() => import("@/components/ui/separator"));
const Table = dynamic(() => import("@/components/component-map/table"));
const List = dynamic(() => import("@/components/component-map/list"));
const Text = dynamic(() => import("@/components/component-map/text"));
const Code = dynamic(() => import("@/components/component-map/code"));
const Quote = dynamic(() => import("@/components/component-map/quote"));

const getComponent = (component: Body, index: number) => {
  switch (component.type) {
    case "text": {
      return (
        <Text key={`Component-${component.type}-${index}`} {...component} />
      );
    }
    case "code": {
      return (
        <Code key={`Component-${component.type}-${index}`} {...component} />
      );
    }
    case "link": {
      return (
        <Link key={`Component-${component.type}-${index}`} {...component} />
      );
    }
    case "list": {
      return (
        <List key={`Component-${component.type}-${index}`} {...component} />
      );
    }
    case "quote": {
      return (
        <Quote key={`Component-${component.type}-${index}`} {...component} />
      );
    }
    case "table": {
      return (
        <Table key={`Component-${component.type}-${index}`} {...component} />
      );
    }
    case "separator": {
      return <Separator key={`Component-${component.type}-${index}`} />;
    }
    default: {
      return (
        <div key={`Component-${component.type}-${index}`}>
          Component Map looking for: {component.type}
        </div>
      );
    }
  }
};

const ComponentMap = ({ components }: { components: Body[] }) => {
  return (
    <section data-testid="ComponentMap" className="flex flex-col gap-2">
      {components.map(getComponent)}
    </section>
  );
};

export default ComponentMap;
