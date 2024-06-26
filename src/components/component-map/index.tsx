import dynamic from "next/dynamic";
import type { Body } from "@/types/generics.types";

const List = dynamic(() => import("@/components/component-map/list"));
const Link = dynamic(() => import("@/components/component-map/link"));
const Code = dynamic(() => import("@/components/component-map/code"));
const Text = dynamic(() => import("@/components/component-map/text"));

const getComponent = (component: Body, index: number) => {
  // console.log(component);
  // switch (component.type) {
  //   // case "text": {
  //   //   return (
  //   //     <Text key={`Component-${component.type}-${index}`} {...component} />
  //   //   );
  //   // }
  //   // case "code": {
  //   //   return (
  //   //     <Code key={`Component-${component.type}-${index}`} {...component} />
  //   //   );
  //   // }
  //   // case "link": {
  //   //   return (
  //   //     <Link key={`Component-${component.type}-${index}`} {...component} />
  //   //   );
  //   // }
  //   // case "list": {
  //   //   return (
  //   //     <List key={`Component-${component.type}-${index}`} {...component} />
  //   //   );
  //   // }
  //   default: {
  //     return (
  //       <div key={`Component-${component.type}-${index}`}>
  //         Component Map looking for: {component.type}
  //       </div>
  //     );
  //   }
  // }

  return <div key={`temp-${index}`}>WOO</div>;
};

const ComponentMap = ({ components }: { components: Body[] }) => {
  return (
    <section data-testid="ComponentMap" className="flex flex-col gap-2">
      {components.map(getComponent)}
    </section>
  );
};

export default ComponentMap;
