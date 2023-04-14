import Layout from "@/components/Layout";
import useScripts from "@/components/Scripts";
import siteConfig from "@/config/site.config.json";
import { getAuthors } from "@/libs/getAuthors";
import { getPosts } from "@/libs/getPosts";
import { formatDate } from "@/utils/formatDate";
import { readingTime } from "@/utils/readingTime";
import { truncateString } from "@/utils/truncateString";
import {
  // IconTrendingUp,
  // IconArrowUpRight,
  // IconBrandFacebookFilled,
  // IconBrandFacebook,
  // IconBrandLinkedin,
  // IconBrandPinterest,
  // IconBrandReddit,
  // IconBrandTwitterFilled,
  IconCalendarEvent,
  IconClock,
} from "@tabler/icons-react";
// import fs from "fs";
import matter from "gray-matter";
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
          <div className="row justify-content">
            <div className="col-lg-12">
              <div className="mb-5 post-details-image">
                <Image
                  className="rounded w-100"
                  src={image}
                  alt={title}
                  fill
                  cover
                  style={{ objectFit: "cover" }}

                  quality={100}
                  placeholder="blur"
                  blurDataURL={image}
                />
                <div className="post-hero-overlay">
                  <div className="post-hero-content tw-pl-40 tw-mb-64">
                    <h3 className="h1 mb-4 post-title text-white tw-bottom-36 tw-absolute tw-pb-72">
                      {title}
                    </h3>
                    <ul className="post-meta-tag list-unstyled list-inline mt-5">
                      <li className="list-inline-item">Tags: </li>
                      {tags.map((t, i) => (
                        <li key={i} className="list-inline-item">
                          <Link href={`/tags/${t.replace(/ /g, "-").toLowerCase()}`}>
                            <div>
                              <span className="tw-text-gray-500">{t}</span>
                            </div>
                          </Link>
                        </li>

                      ))}
                    </ul>
                    <ul className="card-meta list-inline mb-2">
                      <li className="list-inline-item mt-2">
                        <i className="me-2 tw-inline-block">
                          <IconClock size={18} />
                        </i>
                        <span>{readingTime(content)} min read</span>
                      </li>
                      <li className="list-inline-item mt-2">—</li>
                      <li className="list-inline-item mt-2">
                        <i className="me-2 tw-inline-block">
                          <IconCalendarEvent size={18} />
                        </i>
                        <span>{formatDate(date)}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-8 tw-ml-24">
              <div className="post-content">
                <div
                  className="content text-justify"
                  dangerouslySetInnerHTML={{ __html: marked.parse(content) }}
                ></div>
              </div>
            </div>

            <div className="col-lg-3 tw-relative tw-left-28">
              <h4>
                <Link href={`/author/${author.replace(/ /g, "-").toLowerCase()}`}>
                  <span className="tw-text-slate-500 tw-ml-10">{author}</span>
                </Link>

              </h4>

              <div className="tw-sticky tw-top-4">
                <div className="tw-d-block tw-d-md-flex tw-w-full tw-ml-11 tw-mt-2.5">
                  <Link href={`/author/${author.replace(/ /g, "-").toLowerCase()}`}>

                    {authors.map((authorPage, i) =>
                      author.replace(/ /g, "-").toLowerCase() === authorPage.authorSlug ? (
                        <span key={i}>
                          <Image
                            src={authorPage.authorFrontMatter.image}
                            alt={author}
                            width="200"
                            height="200"
                            layout="fixed"
                            className="tw-rounded tw-mr-4 tw-shadow-md"
                            placeholder="tw-blur"
                            blurDataURL={authorPage.authorFrontMatter.image}
                          />
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
                      <div className="h4 tw-mb-3 tw--ml-3.5 tw-relative tw-bottom-6">
                        <span className="tw-text-sm tw-text-gray-500">
                          {" "}
                          This Dev Contributed{" "}
                          <span className="tw-font-bold">
                            {postCount[author]} Articles
                          </span>
                        </span>
                      </div>

                      <div className="tw--ml-6">
                        {authors.map((authorPage, i) =>
                          author.replace(/ /g, "-").toLowerCase() ===
                            authorPage.authorSlug ? (
                            <div
                              key={i}
                              dangerouslySetInnerHTML={{
                                __html: marked.parse(
                                  truncateString(authorPage.authorContent, 150)
                                ),
                              }}
                            ></div>
                          ) : (
                            ""
                          )
                        )}

                      </div>
                    </div>
                  </div>
                  <div></div>
                </div>
              </div>
            </div>
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
  const postCount = posts.length;

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
