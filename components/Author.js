import Image from "next/image";
import Link from "next/link";

export default function Author({
  author: {
    authorSlug,
    authorFrontMatter: { title, image },
  },
  postCount,
}) {
  return (
    <>
      <Link href={`/author/${authorSlug}`}>
        <a className="d-inline-block is-hoverable">
          <Image
            className="rounded"
            src={image}
            alt={title}
            width={`150`}
            height={`150`}
            layout="fixed"
            placeholder="blur"
            blurDataURL={image}
          />
          <h4 className="text-dark mt-4 mb-1">{title}</h4>
          <p className="mb-0">
            <span className="fw-bold text-black">
              {postCount[title] < 9 ? `0${postCount[title]}` : postCount[title]}
            </span>{" "}
            Published posts
          </p>
        </a>
      </Link>
    </>
  );
}
