const { Client } = require('@notionhq/client');
const notion = new Client({ auth: process.env.NEXT_NOTION_API_KEY });
module.exports = { notion };
