import Layout from "@/components/Layout";
import useScripts from "@/components/Scripts";
import siteConfig from "@/config/site.config.json";
import { getAuthors } from "@/libs/getAuthors";
import { getPosts } from "@/libs/getPosts";
import { formatDate } from "@/utils/formatDate";
import { readingTime } from "@/utils/readingTime";
import { truncateString } from "@/utils/truncateString";
import {
  IconGitPullRequestDraft,
  IconBrandFacebook,
  IconBrandLinkedin,
  IconBrandPinterest,
  IconBrandReddit,
  IconBrandTwitter,
  IconCalendarEvent,
  IconClock,
} from "@tabler/icons-react";
import { marked } from "marked";
import Image from "next/image";
import Link from "next/link";
import path from "path";

export default function PostPage({
  slug,
  content,
  frontMatter: { title, author, date, image, description, tags },
  authors,
  postCount,
}) {
  let pageUrl = `${siteConfig.baseURL.replace(/\/$|$/, "/")}blog/${slug}`;

  return (
    <Layout metaTitle={title} metaDescription={description} ogImage={image}>
      <section className="section-sm pb-0">
        <div className="container">
          <Image
            className="rounded"
            src={image}
            alt={title}
            fill
            style={{ objectFit: "contain" }}
            quality={100}
            placeholder={title}
            blurDataURL={image}
          />
          <div className="row justify-content">
            <div className="col-lg-12">
              <div className="mb-5 post-details-image">

                <div className="post-hero-overlay">
                  <div className="post-hero-content tw-pl-40 tw-mb-64">
                    <h1 className="article-header tw-font-semi-bold tw-text-white tw-text-6xl tw-absolute">{title}
                    </h1>
                  </div>


                  <div className="meta-box">
                    <ul className="list-unstyled tw-list-item tw--mb-1">
                      <li className="list-inline-item tw-text-white">Tags: </li>
                      {tags.map((t, i) => (
                        <li key={i} className="list-inline-item">
                          <Link href={`/tags/${t.replace(/ /g, "-").toLowerCase()}`}>
                            <span className="tw-text-gray-500 cursor-pointer">
                              {t}
                              {i < tags.length - 1 ? ',' : ''}
                            </span>
                          </Link>
                        </li>
                      ))}


                      <li className="list-inline-item tw-text-white">
                        <i className="me-1 tw-inline-block tw--mb-1">
                          <IconClock size={18} />
                        </i>
                        <span>{readingTime(content)} min read</span>
                      </li>

                      <li className="list-inline-item tw-text-white">
                        <i className="me-1 tw-inline-block tw--mb-1">
                          <IconCalendarEvent size={18} />
                        </i>
                        <span>{formatDate(date)}</span>
                      </li>
                    </ul>
                  </div>

                </div>
              </div>
            </div>

            <div className="col-lg-9">
              <div className="post-content">
                <div
                  className="content tw-text-justify"
                  dangerouslySetInnerHTML={{ __html: marked.parse(content) }}
                ></div>
              </div>
            </div>

            <div className="col-lg-3 tw-relative tw-text-sm">
              <div className="tw-sticky tw-top-4">
                <div className="post-share-block tw-mt-5 tw-mt-lg-0">
                  <div
                    className="position-sticky"
                    style={{ top: 150 + "px" }}
                  ></div>
                </div>

                <div className="tw-d-block tw-d-md-flex tw-w-full tw-ml-11 tw-mt-2.5">
                  <Link
                    href={`/author/${author.replace(/ /g, "-").toLowerCase()}`}
                  >
                    {authors.map((authorPage, i) =>
                      author.replace(/ /g, "-").toLowerCase() ===
                        authorPage.authorSlug ? (
                        <span key={i}>
                          <div className="imageContainer">
                            <Image
                              src={authorPage.authorFrontMatter.image}
                              alt={author}
                              width="200"
                              height="200"
                              className="tw-shadow-md img-fluid"
                              placeholder="tw-blur"
                              blurDataURL={authorPage.authorFrontMatter.image}
                            />
                          </div>
                        </span>
                      ) : (
                        ""
                      )
                    )}
                  </Link>
                </div>
                <div className="tw-p-5">
                  <div className="tw-text-gray-500">
                    <div className="ms-0 ms-md-4 ps-0 ps-md-3 mt-4 mt-md-0">
                      <div className="h4 tw-mb-3 tw--ml-3.5 tw-relative tw-bottom-2">
                        <p className="mb-2">
                          <span className="tw-text-md">
                            {postCount[author] < 9
                              ? `0${postCount[author]}`
                              : postCount[author]}
                          </span>{" "}
                          <span className="tw-text-md">Published Posts</span>
                        </p>
                      </div>

                      <div className="tw--ml-6">
                        {authors.map((authorPage, i) =>
                          author.replace(/ /g, "-").toLowerCase() ===
                            authorPage.authorSlug ? (
                            <div
                              key={i}
                              dangerouslySetInnerHTML={{
                                __html: marked.parse(
                                  truncateString(authorPage.authorContent, 100)
                                ),
                              }}
                            ></div>
                          ) : (
                            ""
                          )
                        )}

                        <br />
                        <Link
                          href={`/author/${author
                            .replace(/ /g, "-")
                            .toLowerCase()}`}
                        >
                          <span
                            className="tw-text-slate-500"
                            style={{
                              background: `linear-gradient(to right, #434C5E, #4C566A, #E5E9F0, #ECEFF4)`,
                              backgroundSize: "100% 1px",
                              backgroundRepeat: "no-repeat",
                              backgroundPosition: "bottom",
                              paddingBottom: "2px",
                            }}
                          >
                            <i>More by {author}...</i>
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div>
                  </div>
                  <br />

                  <span className="d-inline-block tw-mb-3 tw-med tw-ml-3.5">
                    SHARING IS CARING
                  </span>
                  <ul className="social-share icon-box tw-ml-3.5">
                    <li className="d-inline-block tw-me-2 tw-mb-2 tw-bg-blue-400">
                      <Link
                        href={`https://twitter.com/intent/tweet?text=${title}&url=${pageUrl}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i>
                          <IconBrandTwitter
                            size={18}
                            className="tw-w-6 tw-h-6 tw-font-semibold tw-text-white tw-inline-flex tw-items-center"
                          />
                        </i>
                      </Link>
                    </li>

                    <li className="d-inline-block tw-me-2 tw-mb-2 tw-bg-red-600">
                      <Link
                        href={`https://www.pinterest.com/pin/create/button/?&text=${title}&url=${pageUrl}&description=${title}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i>
                          <IconBrandPinterest
                            size={18}
                            className="tw-w-6 tw-h-6 tw-font-semibold tw-text-white tw-inline-flex tw-items-center"
                          />
                        </i>
                      </Link>
                    </li>
                    <li className="d-inline-block tw-me-2 tw-mb-2 tw-bg-blue-500">
                      <Link
                        href={`https://www.facebook.com/sharer.php?u=${pageUrl}&quote=${title}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i>
                          <IconBrandFacebook
                            size={18}
                            className="tw-w-6 tw-h-6 tw-font-semibold tw-text-white tw-inline-flex tw-items-center"
                          />
                        </i>
                      </Link>
                    </li>

                    <li className="d-inline-block tw-me-2 tw-mb-2 tw-bg-red-500">
                      <Link
                        href={`https://www.reddit.com/submit?url=${pageUrl}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i>
                          <IconBrandReddit
                            size={18}
                            className="tw-w-6 tw-h-6 tw-font-semibold tw-text-white tw-inline-flex tw-items-center"
                          />
                        </i>
                      </Link>
                    </li>

                    <li className="d-inline-block tw-me-2 tw-mb-2 tw-bg-blue-600">
                      <Link
                        href={`https://www.linkedin.com/sharing/share-offsite/?url=${pageUrl}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i>
                          <IconBrandLinkedin
                            size={18}
                            className="tw-w-6 tw-h-6 tw-font-semibold tw-text-white tw-inline-flex tw-items-center"
                          />
                        </i>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="alert-container tw-m-24">
          <div className="alert alert-danger" role="alert">
            <IconGitPullRequestDraft /> Contribute or
            <Link
              href={`https://github.com/VeloraX/velora/blob/main/content/blog/${slug}.md`}
              target="_blank"
              rel="noopener noreferrer"
              className="alert-link"
              style={{
                background: `linear-gradient(to right, #434C5E, #4C566A, #E5E9F0, #ECEFF4)`,
                backgroundSize: "94% 0.6px",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "bottom",
                paddingBottom: "2px",
                paddingLeft: "10px",
                paddingRight: "10px",
                marginLeft: "10px"
              }}
            >
              improve this post
            </Link>
          </div>
        </div>







      </section>
      {useScripts("/js/lightense/lightense.min.js", "body", true)}
    </Layout>
  );
}

export async function getStaticProps({ params }) {
  const contentDirectory = path.join(process.cwd(), "content/blog");
  const posts = getPosts(contentDirectory);
  const post = posts.find((p) => p.slug === params.slug);
  const authors = getAuthors();

  // Add the postCount calculation here
  const postCount = {};
  posts.forEach((post) => {
    const author = post.frontMatter.author;
    postCount[author] = (postCount[author] || 0) + 1;
  });

  return {
    props: {
      slug: post.slug,
      content: post.content,
      frontMatter: post.frontMatter,
      authors,
      postCount,
    },
  };
}

export async function getStaticPaths() {
  const contentDirectory = path.join(process.cwd(), "content/blog");
  const posts = getPosts(contentDirectory);
  const paths = posts.map((post) => ({
    params: { slug: post.slug },
  }));

  return {
    paths,
    fallback: false,
  };
}
