const { Client } = require('@notionhq/client');
const fetch = require('node-fetch');
const fs = require('fs');
require('dotenv-flow').config();

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const databaseId = process.env.NOTION_DATABASE_ID;
const outputDirectory = process.env.OUTPUT_DIRECTORY;

async function main() {
    const pages = await getPages();
    createMarkdownFiles(pages);
}

async function getPages() {
    const results = await notion.databases.query({
        database_id: databaseId,
    });

    return results.results;
}

function createMarkdownFiles(pages) {
    for (const page of pages) {
        console.log('Processing page:', page); // Log the page being processed
        if (!page.properties.Name || !page.properties.Name.title[0]) {
            console.warn('Skipping a page with an improperly formatted or missing title:', page);
            continue;
        }

        const title = page.properties.Name.title[0].text.content;
        const fileName = `${outputDirectory}/${title.replace(/\s+/g, '-').toLowerCase()}.md`;

        // Add the required properties here.
        const description = page.properties.description.rich_text[0]?.text?.content || '';
        const image = page.properties.image.files[0]?.url || '';
        const date = page.properties.Date.date.start || '';
        const author = page.properties.author.rich_text[0]?.text?.content || '';
        const categories = page.properties.categories.multi_select.map(item => item.name) || [];
        const tags = page.properties.tags.multi_select.map(item => item.name) || [];

        // Generate the markdown content
        const markdown = `---
title: "${title}"
description: "${description}"
image: "${image}"
date: "${date}"
author: "${author}"
categories: ${JSON.stringify(categories)}
tags: ${JSON.stringify(tags)}
---

${page.properties.Body.rich_text.map(block => block.text.content).join('\n')}
`;

        console.log('Creating file:', fileName);
        fs.writeFileSync(fileName, markdown);
    }
}

main().catch(console.error);


(async () => {
    try {
        const pages = await fetchNotionPages(process.env.NEXT_NOTION_DATABASE_ID);
        await createMarkdownFiles(pages);

        console.log('Blog posts fetched and Markdown files created successfully.');
    } catch (error) {
        console.error('Error fetching Notion data:', error);
    }
})();
