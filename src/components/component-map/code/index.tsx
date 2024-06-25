import Prism from "prismjs";
import CodeClient from "./client";
import type { Code } from "@/types/generics.types";

import "./code.styles.css";

const Index = ({ text, syntax }: Code) => {
  const language = syntax === "typescript" ? "javascript" : syntax;

  const html = Prism.highlight(text, Prism.languages[language], language);

  return (
    <CodeClient text={text} syntax={syntax}>
      <code
        dangerouslySetInnerHTML={{ __html: html }}
        className={`language-${syntax} [&>span]:text-xs text-xs`}
      />
    </CodeClient>
  );
};

export default Index;
