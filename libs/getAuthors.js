import fs from "fs";
import matter from "gray-matter";
import path from "path";

const authorDirFiles = fs.readdirSync(path.join("content/author"));
const authors = authorDirFiles.filter((f) => f.includes(".md"));

export function getAuthors() {
  const returnDirFiles = authors.map((filename) => {
    const authorSlug = filename.replace(".md", "");
    const dirFileContents = fs.readFileSync(
      path.join("content/author", filename),
      "utf-8"
    );
    const { data: authorFrontMatter, content } = matter(dirFileContents);

    return {
      authorSlug,
      authorFrontMatter,
      authorContent: content,
    };
  });
  return returnDirFiles;
}
