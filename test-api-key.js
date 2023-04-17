const { Client } = require('@notionhq/client');
require('dotenv-flow').config();

const notion = new Client({ auth: process.env.NEXT_NOTION_API_KEY });

async function testApiKey() {
    try {
        const users = await notion.users.list();
        console.log(users);
    } catch (error) {
        console.error('Error fetching Notion data:', error);
    }
}

testApiKey();


