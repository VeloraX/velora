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

export function getLabelClass(state) {
    switch (state) {
        case "open":
            return "bg-green-500";
        case "closed":
            return "bg-red-500";
        default:
            return "";
    }
}