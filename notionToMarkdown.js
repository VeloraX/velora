const { Client } = require('@notionhq/client');
const notion = new Client({ auth: process.env.NEXT_NOTION_API_KEY });
const fs = require('fs');
const path = require('path');
const { getAllEntries } = require('./libs/api');

const envConfig = fs.readFileSync('.env.local', 'utf8');
const env = envConfig
    .split('\n')
    .filter(line => line.trim())
    .reduce((acc, line) => {
        const [key, value] = line.split('=');
        acc[key] = value;
        return acc;
    }, {});

process.env = { ...process.env, ...env };

async function main() {
    const notionApiKey = process.env.NEXT_NOTION_API_KEY;
    const contentPath = path.join(__dirname, 'content', 'blog');
    const entries = await getAllEntries(notionApiKey);

    console.log('Entries:', entries); // Add this line to log the entries

    for (const entry of entries) {
        const {
            id,
            properties: {
                cover,
                title,
                slug,
                status,
                tags,
                summary,
                type,
                relation,
                created_by,
                last_edited_time,
            },
        } = entry;

        const fileName = `${slug.title}.md`;
        const filePath = path.join(contentPath, fileName);

        const markdownContent = `---
id: ${id}
title: "${title.title[0].text.content}"
slug: ${slug.title}
cover: ${cover.url}
status: ${status.select.name}
tags: ${tags.multi_select.map(tag => tag.name).join(', ')}
summary: "${summary.rich_text[0].text.content}"
type: ${type.select.name}
relation: ${relation.title}
created_by: "${created_by.created_by.name}"
last_edited_time: "${last_edited_time}"
---

${summary.rich_text[0].text.content}
`;

        console.log(`Writing file: ${filePath}`); // Add this line to log the file being written
        fs.writeFileSync(filePath, markdownContent);
    }
}

main().catch(console.error);
