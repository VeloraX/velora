import Layout from "@/components/Layout";
import useScripts from "@/components/Scripts";
import siteConfig from "@/config/site.config.json";
import { getAuthors } from "@/libs/getAuthors";
import { formatDate } from "@/utils/formatDate";
import { readingTime } from "@/utils/readingTime";
import { truncateString } from "@/utils/truncateString";
import {
  IconArrowUpRight,
  IconBrandFacebook,
  IconBrandLinkedin,
  IconBrandPinterest,
  IconBrandReddit,
  IconBrandTwitter,
  IconCalendarEvent,
  IconClock,
} from "@tabler/icons";
import fs from "fs";
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
                  layout="fill"
                  objectFit="cover"
                  quality={100}
                  placeholder="blur"
                  blurDataURL={image}
                />
                <div className="post-hero-overlay">
                  <div className="post-hero-content tw-pl-60">
                    <h3 className="h1 mb-4 post-title text-white tw-absolute tw-bottom-36">{title}</h3>
                    <ul className="post-meta-tag list-unstyled list-inline mt-5">
                      <li className="list-inline-item">Tags: </li>
                      {tags.map((t, i) => (
                        <li key={i} className="list-inline-item">
                          <Link href={`/tags/${t.replace(/ /g, "-").toLowerCase()}`}>
                            <a className="bg-white text-dark">{t}</a>
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
              {/* Post section */}
              <div className="post-content">
                <div
                  className="content text-justify"
                  dangerouslySetInnerHTML={{ __html: marked.parse(content) }}
                ></div>
              </div>
            </div>

            <div className="col-lg-3 tw-relative tw-left-28">
              {/* Author section */}
              <div className="tw-sticky tw-top-4">
                <div className="tw-d-block tw-d-md-flex tw-w-full tw-ml-11 tw-mt-2.5">
                  <Link href={`/author/${author.replace(/ /g, "-").toLowerCase()}`}>
                    <a>
                      {authors.map((authorPage, i) =>
                        author.replace(/ /g, "-").toLowerCase() ===
                          authorPage.authorSlug ? (
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
                    </a>
                  </Link>
                </div>
                <div className="tw-p-5">
                  <div className="tw-flex tw-pb-3 tw-text-2xl tw-items-center">
                    <i className="tw-text-gray-500 tw-ml-auto far fa-heart" />
                  </div>
                  <p className="tw-text-gray-500">
                    <div className="ms-0 ms-md-4 ps-0 ps-md-3 mt-4 mt-md-0">
                      <h3 className="h4 tw-mb-3 tw--ml-3.5 tw-relative tw-bottom-6">
                        <Link
                          href={`/author/${author
                            .replace(/ /g, "-")
                            .toLowerCase()}`}
                        >
                          <a className="tw-text-slate-500">{author}</a>
                        </Link>
                      </h3>
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
                        <Link href={`/author/${author.replace(/ /g, "-").toLowerCase()}`}>
                          <a className="tw-text-slate-500 tw-hover:text-blue-700 tw-font-semi-bold">
                            About {`${author.replace(/ /g, " ")}`} ↬
                          </a>
                        </Link>
                      </div>

                    </div>
                  </p>
                  <div>
                  <br />
                    <span className="tw-text-gray-500 tw-ml-16">Follow This Dev</span>
                  </div>
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

export async function getStaticPaths() {
  const blogDirFiles = fs.readdirSync(path.join("content/blog"));
  const blogs = blogDirFiles.filter((f) => f.includes(".md"));

  const paths = blogs.map((filename) => ({
    params: {
      slug: filename.replace(".md", ""),
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const fileContents = fs.readFileSync(
    path.join("content/blog", slug + ".md"),
    "utf8"
  );

  const { data: frontMatter, content } = matter(fileContents);

  return {
    props: {
      slug,
      frontMatter,
      content,
      authors: getAuthors(),
    },
  };
}
