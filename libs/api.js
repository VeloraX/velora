// const { Client } = require('@notionhq/client');

// async function getAllEntries(notionApiKey) {
//     const notion = new Client({ auth: notionApiKey });

//     const response = await notion.databases.query({
//         database_id: process.env.NEXT_NOTION_DATABASE_ID,
//         filter: {
//             property: 'status',
//             select: {
//                 equals: 'published',
//             },
//         },
//     });

//     return response.results;
// }

// module.exports = { getAllEntries };
const { Client } = require('@notionhq/client');

const notion = new Client({
    auth: process.env.NOTION_API_KEY,
});

const databaseId = process.env.NOTION_DATABASE_ID;

async function getAllEntries() {
    const response = await notion.databases.query({
        database_id: databaseId,
    });
    console.log(response);
    return response.results;
}

module.exports = {
    getAllEntries,
};

