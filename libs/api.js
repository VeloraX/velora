// const { Client } = require('@notionhq/client');

// async function getAllEntries(notionApiKey) {
//     const notion = new Client({
//         auth: notionApiKey,
//     });

//     return response.results;
// }

// module.exports = { getAllEntries };


const { Client } = require('@notionhq/client');

async function getAllEntries(apiKey) {
    const notion = new Client({ auth: apiKey });

    const response = await notion.databases.query({
        database_id: process.env.NOTION_DATABASE_ID,
        filter: {
            property: 'status',
            select: {
                equals: 'published',
            },
        },
    });

    return response.results;
}

module.exports = { getAllEntries };
