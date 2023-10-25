import Head from "next/head";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Head>
        <title>Tyler Scott&apos;s Blog</title>
      </Head>
      <div className="flex gap-x-4 mb-4">
        <div className="w-8/12">
          <h2 className="mb-4">Hi, I&apos;m Tyler!</h2>
          <p>
            I&apos;m a Software Engineer based in the United States. I&apos;ll
            mostly be writing about my experiences with software development and
            anything that has caught my attention long enough for me to do a
            deep-dive.
          </p>
        </div>
        <div className="w-4/12">
          <Image
            src="/portrait.jpg"
            priority
            width={250}
            height={250}
            alt="portrait"
          />
        </div>
      </div>
      <div>
        <h3>Latest Posts</h3>
        <p className="text-center my-12 text-primary italic">No recent posts</p>
      </div>
    </>
  );
}
