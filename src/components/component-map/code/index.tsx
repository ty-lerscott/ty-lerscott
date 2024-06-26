import Prism from "prismjs";
import { cn } from "@/lib/utils";
import CodeClient from "./client";
import dynamic from "next/dynamic";
import type { Code } from "@/types/generics.types";

import "./code.styles.css";

const Text = dynamic(() => import("@/components/component-map/text"));

const Code = ({
  text,
  syntax,
  header,
  subheader,
  className,
}: Omit<Code, "type"> & { className?: string }) => {
  const language = syntax === "typescript" ? "javascript" : syntax;

  const html = Prism.highlight(text, Prism.languages[language], language);

  return (
    <div data-testid="Code">
      {header ? <Text tag="h2" text={header} /> : null}
      {subheader ? <Text tag="small" text={subheader} /> : null}
      <CodeClient text={text} syntax={syntax}>
        <code
          dangerouslySetInnerHTML={{ __html: html }}
          className={cn(
            `language-${syntax} [&>span]:text-xs text-xs`,
            className,
          )}
        />
      </CodeClient>
    </div>
  );
};

export default Code;
