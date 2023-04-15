import { getIssues, getStatusLabel } from "@/libs/labelUtils";
import Layout from "@/components/Layout";
import Image from "next/image";
import React from "react";

export default function Updates({ issues }) {
    return (
        <Layout metaTitle={"Latest Updates"}>
            <div className="relative h-screen">
                {/* <Image
                    className="absolute top-0 left-0 w-full h-full object-cover"
                    src="https://ik.imagekit.io/velora/Random_images/13170.jpg?updatedAt=1681557656596"
                    alt="Background"
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center"
                    quality={90}
                /> */}
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-bold text-white py-10">Updates</h1>
                    <div className="grid grid-cols-3 gap-4">
                        {issues &&
                            issues.map((issue) => (
                                <a
                                    key={issue.id}
                                    href={issue.html_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <div className="rounded-lg overflow-hidden shadow-lg bg-white p-4">
                                        <div className="flex justify-between items-center">
                                            <div className="text-lg font-bold">{issue.title}</div>
                                            <div
                                                className={`text-sm font-bold uppercase rounded-full px-4 py-1 text-white ${getStatusLabel(
                                                    issue.state
                                                )}`}
                                            >
                                                {issue.state}
                                            </div>
                                        </div>
                                        <p className="mt-2">{issue.body}</p>
                                    </div>
                                </a>
                            ))}
                    </div>
                </div>
                <Image
                    className="fixed top-0 right-0 opacity-50"
                    src="https://ik.imagekit.io/velora/Assets/13170.jpg?updatedAt=1681562247555"
                    alt="Globe"
                    width={192}
                    height={192}
                />
            </div>
        </Layout>
    );
}

export async function getServerSideProps() {
    const issues = await getIssues("velora", "VeloraX");
    return { props: { issues } };
}
