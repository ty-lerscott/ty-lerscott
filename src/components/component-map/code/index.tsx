import Prism from "prismjs";
import { cn } from "@/lib/utils";
import CodeClient from "./client";
import dynamic from "next/dynamic";
import { type Code } from "@/types/generics.types";

import "./overrides.css";
import styles from "./styles.module.css";

const Header = dynamic(() => import("@/components/component-map/header"));

Prism.languages["typescript"] = Prism.languages.extend("javascript", {
  type: /\b(?:type|string|number|boolean|any)\b/,
  punctuation: /[{}[\]()]/,
  endline: /[,.:;]/,
});

const Code = ({
  text,
  syntax,
  header,
  subheader,
  className,
}: Omit<Code, "type"> & { className?: string }) => {
  const html = Prism.highlight(text, Prism.languages[syntax], syntax);

  const headerProps = {
    header,
    subheader,
  };
  return (
    <div data-testid="Code">
      {header ? <Header {...headerProps} /> : null}

      <CodeClient text={text} syntax={syntax}>
        <pre>
          <code
            dangerouslySetInnerHTML={{ __html: html }}
            className={cn(styles.Code, className)}
          />
        </pre>
      </CodeClient>
    </div>
  );
};

export default Code;
