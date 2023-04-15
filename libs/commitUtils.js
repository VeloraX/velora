// lib/commitUtils.js
import axios from "axios";

export async function getCommits(repo, owner) {
    const url = `https://api.github.com/repos/${owner}/${repo}/commits`;

    const config = {
        headers: {
            Authorization: `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
        },
    };

    const { data } = await axios.get(url, config);
    const commits = data.map((commit) => ({
        message: commit.commit.message,
        date: commit.commit.committer.date,
        url: commit.html_url,
    }));

    return commits;
}

export function groupCommits(commits) {
    const categories = {
        "New Features": [],
        Fixed: [],
        Experimental: [],
        Changes: [],
        Depreciations: [],
    };

    commits.forEach((commit) => {
        const message = commit.message.toLowerCase();
        if (message.includes("feat") || message.includes("feature")) {
            categories["New Features"].push(commit);
        } else if (message.includes("fix")) {
            categories["Fixed"].push(commit);
        } else if (message.includes("experimental")) {
            categories["Experimental"].push(commit);
        } else if (message.includes("change") || message.includes("update")) {
            categories["Changes"].push(commit);
        } else if (message.includes("deprecate") || message.includes("deprecated")) {
            categories["Depreciations"].push(commit);
        }
    });

    return categories;
}
