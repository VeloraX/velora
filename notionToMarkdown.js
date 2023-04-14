const fs = require('fs');
const path = require('path');
const { getAllEntries } = require('./libs/api');
const notionApiKey = process.env.NOTION_API_KEY

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
    const entries = await getAllEntries(notionApiKey);

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

        fs.writeFileSync(filePath, markdownContent);
    }
}

main();
