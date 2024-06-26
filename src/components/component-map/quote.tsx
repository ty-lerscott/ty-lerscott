import { FaQuoteRight, FaQuoteLeft } from "react-icons/fa6";

import type { Quote as QuoteType } from "@/types/generics.types";

const Quote = ({ text, author }: Omit<QuoteType, "name">) => {
  return (
    <div data-testid="Quote">
      <FaQuoteLeft />
      <span>{text}</span>
      <FaQuoteRight />
    </div>
  );
};

export default Quote;
