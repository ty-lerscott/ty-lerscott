import { cn } from "@/lib/utils";
import type { Space as SpaceType } from "@/types/generics.types";

const styles = {
  "1x": "h-2",
  "2x": "h-4",
  "3x": "h-6",
  "4x": "h-8",
  default: "",
};

const Space = ({ amount }: Omit<SpaceType, "type">) => {
  return <div className={cn("w-full pointer-events-none", styles[amount])} />;
};

export default Space;
