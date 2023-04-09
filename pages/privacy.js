import Layout from "@/components/Layout";
import PageHeaderBlock from "@/components/PageHeader";
import { getSinglePage } from "@/libs/getSinglePage";
import { marked } from "marked";

export default function About({ privacy: { frontMatter, content } }) {
  return (
    <Layout
      metaTitle={frontMatter.title}
      metaDescription={frontMatter.description}
    >
      <PageHeaderBlock title={frontMatter.title} />

      <section>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div
                className="content"
                dangerouslySetInnerHTML={{
                  __html: marked.parse(content),
                }}
              ></div>
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
      privacy: getSinglePage("content/privacy.md"),
    },
  };
}
