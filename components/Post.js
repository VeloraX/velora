import { formatDate } from "@/utils/formatDate";
import { readingTime } from "@/utils/readingTime";
import { truncateString } from "@/utils/truncateString";
import { IconCalendarEvent, IconClock } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";

export default function Post({
  post: {
    slug,
    content,
    frontMatter: { title, image, date, author, description, tags },
  },
  authors,
  postColumns,
}) {
  return (
    <article
      className={`card post-card h-100 border-0 bg-transparent ${postColumns == 3 ? "post-card-col-4" : ""
        }`}
    >
      <div className="card-body">
        <Link href={`/blog/${slug}`} className="d-block" title={title}>
          <div className="post-image position-relative">
            <Image
              className="rounded img-fluid"
              src={image}
              alt={title}
              width={`650`}
              height={`335`}
              placeholder="blur"
              blurDataURL={image}
            />
          </div>
        </Link>

        <ul className="card-meta list-inline mb-3 tw-inline-block">
          <li className="list-inline-item mt-2 tw-inline-block">
            <i className="me-2 tw-inline-block">
              <IconCalendarEvent size={18} />
            </i>
            <span>{formatDate(date)}</span>
          </li>
          <li className="list-inline-item mt-2 tw-inline-block">—</li>
          <li className="list-inline-item mt-2 tw-inline-block">
            <i className="me-2 tw-inline-block">
              <IconClock size={18} />
            </i>
            <span>{readingTime(content)} min read</span>
          </li>
        </ul>

        <Link href={`/blog/${slug}`} className="d-block" title={title}>
          <h3 className={`post-title mb-3 ${postColumns == 3 ? "h4" : ""}`}>
            {title}
          </h3>
        </Link>
        <p className={postColumns == 3 ? "small" : ""}>
          {truncateString(description, postColumns == 3 ? 90 : 150)}
        </p>
      </div>

      <div className="card-footer border-top-0 bg-transparent p-0">
        <ul className="card-meta list-inline">
          <li className="list-inline-item mt-2">
            <Link
              href={`/author/${author.replace(/ /g, "-").toLowerCase()}`}
              className="card-meta-author d-flex align-items-center"
              title={`Read all posts by - ${author}`}
            >
              {authors.map(
                (authorPage, i) =>
                  author.replace(/ /g, "-").toLowerCase() ===
                  authorPage.authorSlug && (
                    <span key={i} className="me-2">
                      <Image
                        src={authorPage.authorFrontMatter.image}
                        alt={author}
                        width="26"
                        height="26"
                      />
                    </span>
                  )
              )}
              <span className="d-inline-block">
                by <span>{author.split(" ")[0]}</span>
              </span>
            </Link>
          </li>
          <li className="list-inline-item mt-2">
            <ul className="card-meta-tag list-inline">
              {tags.map((t, i) => (
                <li key={i} className="list-inline-item small">
                  <Link href={`/tags/${t.replace(/ /g, "-").toLowerCase()}`}>
                    {t}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </div>
    </article>
  );
}
