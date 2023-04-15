import React from "react";
import Layout from "@/components/Layout";
import Image from "next/image";
import { format } from 'date-fns';

const Updates = ({ commits }) => {
    return (
        <Layout metaTitle={"Latest Updates"}>
            <section>
                <div className="relative h-screen">
                    <div className="container mx-auto px-4">
                        <h1 className="tw-text-4xl tw-font-bold tw-py-10">Updates</h1>
                        <ul className="tw-space-y-4">
                            {commits &&
                                commits.map((commit) => {
                                    const date = format(new Date(commit.commit.author.date), 'MMMM dd, yyyy');
                                    const message = commit.commit.message;
                                    const commitLink = commit.html_url;

                                    return (
                                        <li key={commit.sha} className="tw-p-2 tw-shadow-sm tw-flex tw-flex-items-start">
                                            <div className="change-description">
                                                <h2 className="tw-text-lg">{message}</h2>
                                                <a
                                                    href={commitLink}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="tw-text-blue-500 tw-hover:text-blue-700"
                                                >
                                                    View Commit
                                                </a>
                                                <span className="tw-ml-2 tw-text-gray-600">{date}</span>
                                            </div>
                                        </li>
                                    );
                                })}
                        </ul>
                    </div>
                    <div className="tw-fixed tw-top-0 tw-right-0">
                        <Image
                            className="tw-w-48 tw-h-48 tw-object-cover tw-opacity-50"
                            src="https://ik.imagekit.io/velora/Assets/13170.jpg?updatedAt=1681562247555"
                            alt="Globe"
                            width={475}
                            height={260}
                        />
                    </div>
                </div>
            </section>
        </Layout>
    );
};


export default Updates;

export async function getServerSideProps() {
    const res = await fetch(
        `https://api.github.com/repos/VeloraX/velora/commits`
    );
    const data = await res.json();

    if (!data) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            commits: data,
        },
    };
}
