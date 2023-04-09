import BannerBlock from "@/components/Banner";
import Layout from "@/components/Layout";
import Post from "@/components/Post";
import PostHorizontal from "@/components/PostHorizontal";
import siteConfig from "@/config/site.config.json";
import { getAuthors } from "@/libs/getAuthors";
import { getPosts } from "@/libs/getPosts";
import { getSinglePage } from "@/libs/getSinglePage";
import { IconNewSection } from "@tabler/icons";
import Link from "next/link";

export default function Home({ authors, posts, banner }) {
  const postColumns = siteConfig.postColumns;
  return (
    <Layout>
      <BannerBlock banner={banner} />

      <div className="container">
        <div className="row">
          <div className="col-12 text-center">
            <h2 className="section-title">
              <span>Recent posts</span>
            </h2>
          </div>
        </div>
        <div className="row gy-5 gx-4 g-xl-5">
          {posts.map((post, i) =>
            postColumns == 1 ? (
              <div key={i} className="col-lg-12">
                <PostHorizontal post={post} authors={authors} />
              </div>
            ) : (
              <div
                key={i}
                className={postColumns == 3 ? "col-lg-4 col-md-6" : "col-lg-6"}
              >
                <Post post={post} authors={authors} postColumns={postColumns} />
              </div>
            )
          )}

          <div className="col-12 text-center">
            <Link href={`/blog`}>
              <a className="btn btn-primary mt-5" aria-label="View all posts">
                <i className="me-2">
                  <IconNewSection size={16} />
                </i>
                View all posts
              </a>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  return {
    props: {
      authors: getAuthors(),
      posts: getPosts().slice(0, 6),
      banner: getSinglePage("content/_index.md"),
    },
  };
}
