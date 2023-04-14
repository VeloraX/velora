import { getAllEntries } from '@/libs/api';

export default async function handler(req, res) {
    try {
        const entries = await getAllEntries();
        res.status(200).json({ entries });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching data from Notion', error });
    }
}
