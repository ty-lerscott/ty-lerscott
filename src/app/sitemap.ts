import dayjs from "dayjs";
import pkg from "~/package.json";
import { MetadataRoute } from "next";
import { getSitemapData } from "@/lib/contentful";

const TODAY = dayjs();
const A_WEEK_AGO = TODAY.subtract(7, "days");
const A_MONTH_AGO = TODAY.subtract(1, "month");

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const sitemapItems = await getSitemapData();

  return (sitemapItems || []).map(
    ({ slug: url, updatedAt: lastModified, type }) => {
      const cleanUrl = url.replace(/^\//, "");
      const isPage = type === "page";
      const updatedDate = dayjs(lastModified);
      const isBaby = A_WEEK_AGO.isBefore(updatedDate);
      const isTeen =
        updatedDate.isAfter(A_WEEK_AGO) &&
        A_MONTH_AGO.isBefore(updatedDate) &&
        !isBaby;

      const changeFrequency = isPage
        ? !cleanUrl.length || cleanUrl === "post"
          ? "weekly"
          : "monthly"
        : isBaby
          ? "weekly"
          : isTeen
            ? "monthly"
            : "yearly";

      return {
        url: `${pkg.author.website}${isPage ? `${cleanUrl ? "/" : ""}${cleanUrl}` : `/posts/${cleanUrl}`}`,
        lastModified,
        changeFrequency,
        priority: isPage ? 1 : isBaby ? 0.7 : isTeen ? 0.55 : 0.4,
      };
    },
  );
};

export default sitemap;
