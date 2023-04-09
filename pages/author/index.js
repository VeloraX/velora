import Author from "@/components/Author";
import Layout from "@/components/Layout";
import PageHeaderBlock from "@/components/PageHeader";
import Post from "@/components/Post";
import siteConfig from "@/config/site.config.json";
import { getAuthors } from "@/libs/getAuthors";
import { getPosts } from "@/libs/getPosts";
import { IconNewSection } from "@tabler/icons";
import Link from "next/link";

export default function Authors({ authors, posts }) {
  const allAuthor = posts.map((author) => author.frontMatter.author);
  const postCount = [];
  allAuthor.forEach((x) => {
    postCount[x] = (postCount[x] || 0) + 1;
  });

  const postColumns = siteConfig.postColumns;

  return (
    <Layout metaTitle="Our Authors">
      <PageHeaderBlock title="Author" />

      <section className="section-sm pt-0">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 mx-auto">
              <div className="row gx-4 gy-5 gx-md-5 justify-content-center text-center">
                {authors.map((author, i) => (
                  <div key={i} className="col-lg-4 col-sm-6">
                    <Author author={author} postCount={postCount} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <hr className="bg-primary" />
            </div>
          </div>
        </div>
      </section>

      <section className="section-sm pb-0">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center">
              <h2 className="section-title">
                <span>Recent posts</span>
              </h2>
            </div>
          </div>
          <div className="row gy-5 gx-4 g-xl-5">
            {posts.slice(0, postColumns == 3 ? 3 : 4).map((post, i) => (
              <div
                key={i}
                className={postColumns == 3 ? "col-lg-4 col-md-6" : "col-lg-6"}
              >
                <Post post={post} authors={authors} postColumns={postColumns} />
              </div>
            ))}

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
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  return {
    props: {
      authors: getAuthors(),
      posts: getPosts(),
    },
  };
}
