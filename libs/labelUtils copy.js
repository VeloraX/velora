import axios from "axios";

export async function getLabels(repo, owner) {
    const url = `https://api.github.com/repos/${owner}/${repo}/labels`;

    const config = {
        headers: {
            Authorization: `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
        },
    };

    const { data } = await axios.get(url, config);
    return data.map((label) => ({
        name: label.name,
        color: label.color,
    }));
}

export async function getIssues(repo, owner) {
    const url = `https://api.github.com/repos/${owner}/${repo}/issues`;

    const config = {
        headers: {
            Authorization: `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
        },
    };

    const { data } = await axios.get(url, config);
    return data;
}

export function getStatusLabel(status) {
    switch (status.toLowerCase()) {
        case "completed":
            return "tw-bg-green-500";
        case "in progress":
            return "tw-bg-yellow-500";
        case "pending":
            return "tw-bg-gray-500";
        default:
            return "tw-bg-red-500";
    }
}
