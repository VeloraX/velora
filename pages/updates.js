import React from "react";
import { getIssues, getLabelClass } from "@/libs/labelUtils";
import Layout from "@/components/Layout";
import Image from "next/image";
import { format } from 'date-fns';

const Updates = ({ issues }) => {
    return (
        <Layout metaTitle={"Latest Updates"}>
            <section>
                <div className="relative h-screen">
                    <div className="container mx-auto px-4">
                        <h1 className="tw-text-4xl tw-font-bold tw-py-10">Updates</h1>
                        <ul className="tw-space-y-4">
                            {issues &&
                                issues.map((issue) => {
                                    const date = format(new Date(issue.created_at), 'MMMM dd, yyyy');
                                    const issueLink = issue.html_url.match(/.+\/issues\/\d+/)[0];
                                    return (
                                        <li key={issue.id} className="tw-p-4 tw-shadow-lg tw-flex tw-flex-items-start">
                                            <div
                                                className={`change-badge tw-text-sm tw-font-bold tw-uppercase tw-px-4 tw-py-1  ${getLabelClass(issue.state)}`}
                                            >
                                                {issue.state}
                                            </div>
                                            <div className="change-description tw-ml-2">
                                                <h2 className="tw-text-xl tw-font-bold">{issue.title}</h2>
                                                <p className="tw-mt-2">{issue.body}</p>
                                                <a
                                                    href={`${issueLink}/L19-L22`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="tw-text-blue-500 tw-hover:text-blue-700"
                                                >
                                                    {`(${issue.number}: L19-L22)`}
                                                </a>
                                                <span className="tw-ml-2 tw-text-gray-600">{date}</span>
                                            </div>
                                        </li>
                                    );
                                })}
                        </ul>
                    </div>
                    <Image
                        className="tw-fixed tw-top-0 tw-right-0 tw-opacity-50"
                        src="https://ik.imagekit.io/velora/Assets/13170.jpg?updatedAt=1681562247555"
                        alt="Globe"
                        width={492}
                        height={492}
                    />
                </div>
            </section>
        </Layout>
    );
};


export async function getServerSideProps() {
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    const response = await fetch(
        "https://api.github.com/repos/VeloraX/velora/issues?state=all&since=" +
        oneMonthAgo.toISOString()
    );

    const issues = await response.json();

    return {
        props: {
            issues: issues.filter((issue) => !issue.pull_request),
        },
    };
}

export default Updates;