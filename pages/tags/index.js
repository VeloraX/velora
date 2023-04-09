import Link from 'next/link';
import PageHeaderBlock from '@/components/PageHeader';
import Layout from '@/components/Layout';
import { getPosts } from '@/libs/getPosts';
import { IconTags } from '@tabler/icons';

export default function Tags({ posts }) {
  const allTags = posts.map((tag) => tag.frontMatter.tags);
  const flatTags = allTags.flat();
  const uniqueTags = [...new Set(flatTags)];

  // count tag posts
  let tagArray = [];
  uniqueTags.map((tag) => {
    flatTags.map((t) => {
      if (tag === t) {
        tagArray.push(tag);
      }
    });
  });
  const postCount = [];
  tagArray.forEach((x) => {
    postCount[x] = (postCount[x] || 0) + 1;
  });

  return (
    <Layout metaTitle="All Tags">
      <PageHeaderBlock title="All tags" />

      <div className="container">
        <div className="row g-4 justify-content-center text-center">
          {uniqueTags.map((tag, i) => (
            <div key={i} className="col-lg-4 col-md-6">
              <Link href={`/tags/${tag.replace(/ /g, '-').toLowerCase()}`}>
                <a className="p-4 rounded bg-white d-block is-hoverable">
                  <i className="mt-1 mb-2 d-inline-block">
                    <IconTags size={30} />
                  </i>
                  <span className="h4 mt-2 mb-3 d-block">{tag}</span>
                  Total {postCount[tag]} posts
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
