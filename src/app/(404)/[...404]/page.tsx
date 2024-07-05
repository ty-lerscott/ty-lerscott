import Path from "./path";
import pkg from "~/package.json";
import type { Metadata } from "next";
import getFact from "@/lib/externals/fact";
import { FaInfinity } from "react-icons/fa";
import { setMetadata } from "@/lib/utils";

export const metadata: Metadata = setMetadata({
  alternates: {
    canonical: "/oops",
  },
  title: `Not Found ${pkg.metadata.title}`,
});

const NotFoundPage = async () => {
  const { text } = await getFact(true);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <FaInfinity className="w-48 h-40 text-[--background-secondary]" />

      <Path />

      <div className="mt-4 flex flex-col items-center">
        <h3 className="text-[--ghost]">
          Here&apos;s a random fact to compensate for the awkwardness:
        </h3>
        <span className="block text-center text-sm mt-2 max-w-[80%] leading-4">
          {text}
        </span>
      </div>
    </div>
  );
};

export default NotFoundPage;
