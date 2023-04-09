import Layout from "@/components/Layout";
import PageHeaderTaxo from "@/components/PageHeaderTaxonomy";
import { getPosts } from "@/libs/getPosts";
import { getSinglePage } from "@/libs/getSinglePage";
import { IconArchive } from "@tabler/icons";
import Link from "next/link";

export default function Archive({ posts, archive: { frontMatter } }) {
  // formatDateByYear
  let formatDateByYear = (a) => {
    const longEnUSFormatter = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
    });
    const date = new Date(a);
    return longEnUSFormatter.format(date);
  };

  // formatDateByMonth
  let formatDateByMonth = (a) => {
    const longEnUSFormatter = new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
    });
    const date = new Date(a);
    return longEnUSFormatter.format(date);
  };

  // sortByYear
  let postYear = posts.map((year) => formatDateByYear(year.frontMatter.date));
  const uniqueYear = [...new Set(postYear)];

  return (
    <Layout metaTitle={`${frontMatter.title} Posts`}>
      <PageHeaderTaxo title={frontMatter.title} />

      <section>
        <div className="container">
          <div className="row">
            <div className="col-lg-10 mx-auto">
              {uniqueYear.map((unqYear, y) => (
                <div className="archive-block" key={y}>
                  <h2>
                    <i>
                      <IconArchive size={80} />
                    </i>
                    {unqYear}
                  </h2>
                  {posts.map((post, i) =>
                    formatDateByYear(post.frontMatter.date) === unqYear ? (
                      <div key={i} className="archive-post-item mb-3">
                        <span
                          className="mx-0 d-inline-block"
                          style={{ width: 68 + "px" }}
                        >
                          {formatDateByMonth(post.frontMatter.date)}
                        </span>
                        <span>•</span>
                        <Link href={`/blog/${post.slug}`}>
                          <a>{post.frontMatter.title}</a>
                        </Link>
                      </div>
                    ) : null
                  )}
                </div>
              ))}
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
      posts: getPosts(),
      archive: getSinglePage("content/archive.md"),
    },
  };
}
