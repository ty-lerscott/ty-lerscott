import dynamic from "next/dynamic";

const Text = dynamic(() => import("@/components/component-map/text"));

const getComponent = (component, index) => {
  // switch
  return <div key={`Component-${index}`} />;
};

const ComponentMap = ({ components }) => {
  // console.log(components);
  return <div>{components.map(getComponent)}</div>;
};

export default ComponentMap;
