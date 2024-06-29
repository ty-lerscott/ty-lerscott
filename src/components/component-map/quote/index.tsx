import { cn } from "@/lib/utils";
import { FaQuoteRight, FaQuoteLeft } from "react-icons/fa6";
import type { Quote as QuoteType } from "@/types/generics.types";

import styles from "./styles.module.css";

const Index = ({ text, author }: Omit<QuoteType, "name">) => {
  return (
    <blockquote data-testid="Quote" className={styles.QuoteWrapper}>
      <div className={styles.Quote}>
        <FaQuoteLeft />
        <span className={styles.Text}>{text}</span>
        <FaQuoteRight />
      </div>
      {author ? <span className={styles.Author}>&mdash; {author}</span> : null}
    </blockquote>
  );
};

export default Index;
