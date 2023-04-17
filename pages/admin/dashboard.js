import { useState, useEffect } from 'react';
import Link from 'next/link';

const Dashboard = () => {
    const [commits, setCommits] = useState([]);

    useEffect(() => {
        fetchCommits();
    }, []);

    const fetchCommits = async () => {
        const repoUrl = 'https://api.github.com/repos/VeloraX/velora/commits';

        try {
            const response = await fetch(repoUrl, {
                headers: {
                    Authorization: `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setCommits(data.slice(0, 5)); // Display up to 5 latest commits
            } else {
                console.error('Failed to fetch commits');
            }
        } catch (error) {
            console.error('Failed to fetch commits', error);
        }
    };

    return (
        <div className="container mx-auto">
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

            <div className="mb-8">
                <Link href="/admin/new-post" passHref>
                    <a className="bg-blue-600 text-white px-4 py-2 rounded">Publish a Post</a>
                </Link>
            </div>

            <div className="mb-8">
                <h2 className="text-xl font-bold mb-2">Latest Commits</h2>
                <ul>
                    {commits.map((commit) => (
                        <li key={commit.sha} className="mb-2">
                            <a
                                href={commit.html_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:text-blue-800"
                            >
                                {commit.commit.message}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>

            <nav>
                <ul className="flex">
                    <li className="mr-4">
                        <Link href="/admin/posts" passHref>
                            <a className="text-blue-600 hover:text-blue-800">Posts</a>
                        </Link>
                    </li>
                    <li className="mr-4">
                        <Link href="/admin/categories" passHref>
                            <a className="text-blue-600 hover:text-blue-800">Categories</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/admin/tags" passHref>
                            <a className="text-blue-600 hover:text-blue-800">Tags</a>
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );

};

export default Dashboard;
