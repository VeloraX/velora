// pages/updates.js
import { getCommits, groupCommits } from "@/libs/commitUtils";
import Layout from "@/components/Layout";
import axios from "axios"

export default function Updates({ commitGroups }) {
    return (
        <Layout metaTitle={"Latest Updates"}>
            <section className="section-sm pb-0">
                <div className="container">
                    {Object.entries(commitGroups).map(([category, commits]) => (
                        <div key={category}>
                            <h2>{category}</h2>
                            <ul>
                                {commits.map((commit) => (
                                    <li key={commit.url}>
                                        <a href={commit.url} target="_blank" rel="noopener noreferrer">
                                            {commit.message}
                                        </a>{" "}
                                        - <span>{new Date(commit.date).toLocaleDateString()}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </section>
        </Layout>
    );
}

export async function getStaticProps() {
    const commits = await getCommits("velora", "VeloraX");
    const commitGroups = groupCommits(commits);

    return {
        props: {
            commitGroups,
        },
        revalidate: 60 * 60, // Update every hour
    };
}
