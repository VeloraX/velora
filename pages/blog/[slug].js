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


















            <div className="col-lg-8 post-content-block order-0 order-lg-2 mx-auto">
              <div
                className="content text-justify"
                dangerouslySetInnerHTML={{ __html: marked.parse(content) }}
              ></div>
            </div>
          </div>


          {/* Author section */}
          <div className="single-post-author">
            <div className="row justify-content">
              <div className="col-lg-10">
                <div className="d-block d-md-flex">
                  <Link
                    href={`/author/${author.replace(/ /g, "-").toLowerCase()}`}
                  >
                    <a>
                      {authors.map((authorPage, i) =>
                        author.replace(/ /g, "-").toLowerCase() ===
                          authorPage.authorSlug ? (
                          <span key={i}>
                            <Image
                              src={authorPage.authorFrontMatter.image}
                              alt={author}
                              width="155"
                              height="155"
                              layout="fixed"
                              className="rounded mr-4"
                              placeholder="blur"
                              blurDataURL={authorPage.authorFrontMatter.image}
                            />
                          </span>
                        ) : (
                          ""
                        )
                      )}
                    </a>
                  </Link>
                  <div className="ms-0 ms-md-4 ps-0 ps-md-3 mt-4 mt-md-0">
                    <h3 className="h4 mb-3">
                      <Link
                        href={`/author/${author
                          .replace(/ /g, "-")
                          .toLowerCase()}`}
                      >
                        <a className="text-dark">{author}</a>
                      </Link>
                    </h3>
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
                    <div className="content">
                      <Link
                        href={`/author/${author
                          .replace(/ /g, "-")
                          .toLowerCase()}`}
                      >
                        <a className="text-dark">
                          See all posts by this author{" "}
                          <i>
                            <IconArrowUpRight size={20} />
                          </i>
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section >







      {useScripts("/js/lightense/lightense.min.js", "body", true)}
    </Layout >
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
