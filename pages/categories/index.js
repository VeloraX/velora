import Layout from "@/components/Layout";
import PageHeaderBlock from "@/components/PageHeader";
import { getPosts } from "@/libs/getPosts";
import { IconColorSwatch } from "@tabler/icons";
import Link from "next/link";

export default function Categories({ posts }) {
  const allCategories = posts.map(
    (category) => category.frontMatter.categories
  );
  const flatCategories = allCategories.flat();
  const uniqueCategories = [...new Set(flatCategories)];

  // count category posts
  let categoryArray = [];
  uniqueCategories.map((category) => {
    flatCategories.map((t) => {
      if (category === t) {
        categoryArray.push(category);
      }
    });
  });
  const postCount = [];
  categoryArray.forEach((x) => {
    postCount[x] = (postCount[x] || 0) + 1;
  });

  return (
    <Layout metaTitle="Categories">
      <PageHeaderBlock title="Categories" />

      <div className="container">
        <div className="row g-4 justify-content-center text-center">
          {uniqueCategories.map((category, i) => (
            <div key={i} className="col-lg-4 col-md-6">
              <Link
                href={`/categories/${category
                  .replace(/ /g, "-")
                  .toLowerCase()}`}
              >
                <a className="p-4 rounded bg-white d-block is-hoverable">
                  <i className="mt-1 mb-2 d-inline-block">
                    <IconColorSwatch size={30} />
                  </i>
                  <span className="h4 mt-2 mb-3 d-block">{category}</span>
                  Total {postCount[category]} posts
                </a>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  return {
    props: {
      posts: getPosts(),
    },
  };
}
