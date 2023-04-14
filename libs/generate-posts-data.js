const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

function blogData() {
  const blogDirFiles = fs.readdirSync(path.join("content/blog"));
  const blogs = blogDirFiles.filter((f) => f.includes(".md"));

  posts = blogs.map((filename) => {
    const slug = filename.replace(".md", "");
    const dirFileContents = fs.readFileSync(
      path.join("content/blog", filename),
      "utf8"
    );

    const { data: frontMatter } = matter(dirFileContents);

    return {
      slug,
      frontMatter,
    };
  });

  return `export const posts = ${JSON.stringify(posts)}`;
}

try {
  fs.readdirSync("data");
} catch (error) {
  fs.mkdirSync("data");
}

fs.writeFile("data/posts.js", blogData(), function (err) {
  if (err) return console.log(err);
  console.log("Successfully generated Post data.");
});
