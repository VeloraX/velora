const { Client } = require("@notionhq/client");
const fs = require("fs");
const path = require("path");
require("dotenv-flow").config();

const notion = new Client({ auth: process.env.NEXT_NOTION_API_KEY });
const databaseId = process.env.NEXT_NOTION_DATABASE_ID;

console.log("API Key:", process.env.NEXT_NOTION_API_KEY);
console.log("Database ID:", process.env.NEXT_NOTION_DATABASE_ID);

function saveMarkdownFile(slug, title, content) {
    const outputPath = path.join("content", "blog", `${slug}.md`);
    const data = `---
title: "${title}"
slug: "${slug}"
---

${content}`;

    fs.writeFileSync(outputPath, data);
}

function createSlug(title) {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
}

function formatDateToLocal(date) {
    const localOffsetMinutes = date.getTimezoneOffset();
    const localDate = new Date(date.getTime() - localOffsetMinutes * 60 * 1000);
    const year = localDate.getUTCFullYear();
    const month = String(localDate.getUTCMonth() + 1).padStart(2, "0");
    const day = String(localDate.getUTCDate()).padStart(2, "0");
    const hour = String(localDate.getUTCHours()).padStart(2, "0");
    const minute = String(localDate.getUTCMinutes()).padStart(2, "0");
    const second = String(localDate.getUTCSeconds()).padStart(2, "0");

    const localOffset = -localOffsetMinutes;
    const offsetHours = String(Math.floor(localOffset / 60)).padStart(2, "0");
    const offsetMinutes = String(localOffset % 60).padStart(2, "0");
    const offsetSign = localOffset < 0 ? "-" : "+";
    const offsetString = `${offsetSign}${offsetHours}:${offsetMinutes}`;

    return `${year}-${month}-${day}T${hour}:${minute}:${second}${offsetString}`;
}

async function fetchPostsFromNotion() {
    const response = await notion.databases.query({
        database_id: databaseId,
    });

    const posts = response.results.map((page) => {
        const title = page.properties.title.title[0].plain_text;
        const slug = createSlug(title);
        const description =
            page.properties.description &&
                page.properties.description.rich_text &&
                page.properties.description.rich_text.length > 0
                ? page.properties.description.rich_text[0].plain_text
                : "";

        const body = page.content.map((block) => {
            return block.paragraph && block.paragraph.text && block.paragraph.text[0].plain_text;
        }).join("\n\n");

        const author =
            page.properties.author &&
                page.properties.author.rich_text &&
                page.properties.author.rich_text.length > 0
                ? page.properties.author.rich_text[0].plain_text
                : "";
        const tags = page.properties.tags.multi_select.map((tag) => tag.name);
        const categories = page.properties.categories.multi_select.map(
            (category) => category.name
        );
        const date = page.last_edited_time;

        const formattedDate = formatDateToLocal(new Date(date));
        const contentBlock =
            page.properties.content &&
            page.properties.content.rich_text &&
            page.properties.content.rich_text[0];
        const content = contentBlock ? contentBlock.plain_text : "";
        const cover =
            page.cover && page.cover.external && page.cover.external.url
                ? page.cover.external.url
                : null;

        return {
            title,
            slug,
            description,
            tags,
            categories,
            formattedDate,
            content,
            cover,
            author,
            body,
        };
    });

    for (const post of posts) {
        const {
            title,
            slug,
            description,
            tags,
            categories,
            formattedDate,
            content,
            cover,
            author,
            body,
        } = post;
        const frontMatter = `---
title: "${title}"
description: "${description}"
image: ${cover ? `"${cover}"` : "null"}
date: "${formattedDate}"
categories: ${JSON.stringify(categories)}
tags: ${JSON.stringify(tags)}
author: "${author}"
---

${body}`;

        console.log(frontMatter);
    }
}


const outputDirectory = process.env.NEXT_OUTPUT_DIRECTORY || "content/blog";
const filePath = path.join(process.cwd(), outputDirectory, `${slug}.md`);

fs.writeFileSync(filePath, frontMatter + content);

console.log(
    `Imported post "${title}" with slug "${slug}" and date "${formattedDate}".`
);


console.log(`Imported ${posts.length} posts.`);


// console.log(page.properties.description);
// console.log(page.properties.author);

fetchPostsFromNotion();
