import { cn } from "@/lib/utils";

import styles from "./styles.module.css";

const Star = ({ percent = 0 }: { percent: number }) => {
  const offset = `${percent}%`;

  return (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      className={styles.Star}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient
          id={`fill-${percent}`}
          x1="0%"
          y1="0%"
          x2="100%"
          y2="0%"
        >
          <stop
            offset={offset}
            style={{
              stopOpacity: 1,
              stopColor: "var(--color-lighter)",
            }}
          />
          <stop
            offset={offset}
            style={{
              stopOpacity: 1,
              stopColor: "var(--color-dark)",
            }}
          />
        </linearGradient>
      </defs>
      <path
        fill={`url(#fill-${percent})`}
        d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
      />
    </svg>
  );
};

const Rating = ({
  rating,
  className,
}: {
  rating: number;
  className?: string;
}) => {
  const safeRating = Math.min(Math.max(rating, 0), 5);

  return (
    <div data-testid="Rating" className={cn(styles.Rating, className)}>
      {Array.from({ length: 5 }).map((_, ind) => {
        const starNumber = ind + 1;
        const percent =
          Math.min(Math.max(safeRating - (starNumber - 1), 0), 1) * 100;

        return <Star key={`Star-${ind}`} percent={percent} />;
      })}
    </div>
  );
};

export default Rating;
