import { getIssues } from "../libs/labelUtils";
import { Layout } from "@/components/Layout";
import Image from "next/image";

export default function Updates({ issues }) {
    return (
        <Layout metaTitle={"Latest Updates"}>
            <div className="relative h-screen">
                <Image
                    className="absolute top-0 left-0 w-full h-full object-cover"
                    src="https://ik.imagekit.io/velora/Random_images/13170.jpg?updatedAt=1681557656596"
                    alt="Background"
                    layout="fill"
                    objectFit="cover"
                />
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-bold text-white py-10">Updates</h1>
                    <div className="grid grid-cols-2 gap-4">
                        {issues &&
                            issues.map((issue) => (
                                <a
                                    key={issue.id}
                                    href={issue.html_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <div className="card p-4 tw-shadow-lg tw-rounded-lg">
                                        <div className="flex justify-between items-center">
                                            <div className="text-lg font-bold">{issue.title}</div>
                                            <div
                                                className={`tw-text-sm tw-font-bold tw-uppercase tw-rounded-full tw-px-4 tw-py-1 tw-text-white ${getStatusLabel(
                                                    issue.state
                                                )}`}
                                            >
                                                {issue.state}
                                            </div>
                                        </div>
                                        <p className="tw-mt-2">{issue.body}</p>
                                    </div>
                                </a>
                            ))}
                    </div>
                </div>
                <div className="tw-fixed tw-top-0 tw-right-0 tw-w-48 tw-h-48 tw-opacity-50">
                    <Image
                        className="tw-w-48 tw-h-48 tw-object-cover tw-opacity-50"
                        src="https://ik.imagekit.io/velora/Assets/13170.jpg?updatedAt=1681562247555"
                        alt="Globe"
                        width={275}
                        height={130}
                    />
                </div>
            </div>
        </Layout>
    );
}

export async function getServerSideProps() {
    const issues = await getIssues("velora", "VeloraX");
    return { props: { issues } };
}

function getStatusLabel(status) {
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
