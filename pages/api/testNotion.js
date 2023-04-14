// import { getAllEntries } from '@/libs/api';

// export default async function handler(_req, res) {
//     try {
//         const entries = await getAllEntries();
//         res.status(200).json({ entries });
//     } catch (error) {
//         res.status(500).json({ message: 'Error fetching data from Notion', error });
//     }
// }


const { getAllEntries } = require('/libs/api');

async function testNotion() {
    const entries = await getAllEntries();
    console.log(entries);
}

testNotion()