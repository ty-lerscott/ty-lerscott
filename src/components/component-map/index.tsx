import dynamic from "next/dynamic";
import type { Body } from "@/types/generics.types";

const Code = dynamic(() => import("@/components/component-map/code"));
const Text = dynamic(() => import("@/components/component-map/text"));

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
    default: {
      return <div>Component Map looking for: {component.type}</div>;
    }
  }
};

const ComponentMap = ({ components }: { components: Body[] }) => {
  // console.log(components);
  return (
    <section data-testid="ComponentMap" className="flex flex-col gap-2">
      {components.map(getComponent)}
    </section>
  );
};

export default ComponentMap;
