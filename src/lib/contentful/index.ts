import { PageType } from "@/types/contentful.types";
import { getEntriesByType } from "@/lib/contentful/api";
import type {
  Page,
  Menu,
  Post,
  Link,
  Resume,
  Header,
  ResumeSkill,
  WorkExperience,
} from "@/types/generics.types";

const getMenu = async <Generic = Link>(name: string = "Header") => {
  let menuItems = [] as Generic[];

  try {
    const {
      data: { body },
    } = await getEntriesByType<Menu>({
      name,
      contentType: "menu",
    });

    menuItems = body as Generic[];
  } catch (err) {
    console.log(
      err instanceof Error ? `getMenu error: ${err.message}` : "Unknown Error",
    );
  }
  return menuItems as Generic[];
};

const getPosts = async (select?: string[], skip?: number) => {
  const { pagination, data } = await getEntriesByType<Post[]>({
    skip,
    limit: 10,
    sort: "asc",
    contentType: "post",
    order: "fields.publishDate",
    select: [
      "fields.slug",
      "fields.title",
      "fields.description",
      "fields.publishDate",
    ]
      .concat(select as string[])
      .filter(Boolean),
  });
  return {
    posts: (Array.isArray(data) ? data : [data]).map((post) => {
      post.slug = (post.slug || "").replace(/^\//, "");

      return post;
    }),
    pagination,
  };
};

const getPost = async (slug: string) => {
  const { data: post } = await getEntriesByType<Post>({
    contentType: "post",
    slug: slug,
    select: [
      "fields.body",
      "fields.tags",
      "fields.slug",
      "fields.title",
      "fields.image",
      "fields.keywords",
      "fields.description",
      "fields.publishDate",
    ],
  });

  if (
    !Array.isArray(post.tags) ||
    (Array.isArray(post.tags) && !post.tags.length)
  ) {
    post.tags = [];
  }

  return post;
};

const getPage = async <Type extends Record<string, any> = Page>(
  type: PageType,
) => {
  const { data } = await getEntriesByType<Type>({
    contentType: "page",
    pageType: type,

    select: [
      "fields.body",
      "fields.slug",
      "fields.title",
      "fields.keywords",
      "fields.education",
      "fields.resumeBio",
      "fields.description",
      "fields.resumeSkills",
      "fields.workExperience",
    ],
  });

  // I dont like having to normalize an empty array for this if the API doesn't respond properly
  // TODO: after moving to Directus of PocketBase
  if (type === "resume") {
    const newData = data as unknown as Resume;
    newData.workExperience =
      Array.isArray(data.workExperience) && data.workExperience.length
        ? data.workExperience
        : ([] as WorkExperience[]);

    newData.education =
      Array.isArray(data.education) && data.education.length
        ? data.education
        : ([] as Header[]);

    newData.resumeSkills =
      Array.isArray(data.resumeSkills) && data.resumeSkills.length
        ? data.resumeSkills
        : ([] as ResumeSkill[]);

    newData.resumeBio = newData.resumeBio || "";

    // TODO: fix the type here, this unknown conversion is gross
    return newData as unknown as Type;
  }

  return data as Type;
};

export { getMenu, getPage, getPosts, getPost };
