import React, { useState } from "react";
import Layout from "@/components/Layout";
import Image from "next/image";
import format from 'date-fns/format';
import { differenceInHours, isSameDay } from 'date-fns';

const badgeColors = [
    'tw-bg-red-500',
    'tw-bg-yellow-500',
    'tw-bg-green-500',
    'tw-bg-blue-500',
    'tw-bg-indigo-500',
    'tw-bg-purple-500',
    'tw-bg-pink-500',
    'tw-bg-teal-500',
    'tw-bg-cyan-500',
    'tw-bg-lime-500',
];

const Updates = ({ commits }) => {
    const [search, setSearch] = useState('');

    const filteredCommits = commits.filter((commit) => {
        return commit.commit.message.toLowerCase().includes(search.toLowerCase());
    });

    const renderCommits = (commits) => {
        let currentDate = null;

        return commits.map((commit) => {
            const date = new Date(commit.commit.author.date);
            const isNewDay = currentDate === null || !isSameDay(currentDate, date);
            currentDate = date;

            const hoursDifference = differenceInHours(new Date(), date);
            const message = commit.commit.message;
            const commitLink = commit.html_url;

            const badge = message.match(/^(?:[\u{1F195}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{1F900}-\u{1F9FF}\u{1F300}-\u{1F5FF}\u{1F1E6}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}])\s([A-Z]+):/u);

            const badgeColor = badgeColors[Math.floor(Math.random() * badgeColors.length)];

            const messageWithBadge = badge ? message.replace(badge[0], `<span class="tw-inline-block tw-px-2 tw-py-0.5 tw-rounded tw-text-white tw-mr-2 ${badgeColor}">${badge[1].toLowerCase()}</span>`) : message;

            const messageWithLinks = messageWithBadge.replace(
                /(https?:\/\/[^\s]+)/g,
                (url) => `<a href="${url}" target="_blank" rel="noopener noreferrer" class="tw-text-purple-500 tw-hover:text-purple-700">${url}</a>`
            );

            return (
                <React.Fragment key={commit.sha}>
                    {isNewDay && (
                        <li className="tw-py-4">
                            <h3 className="tw-text-2xl tw-font-bold">{format(date, 'MMMM dd, yyyy')}</h3>
                        </li>
                    )}
                    <li className="tw-p-2 tw-shadow-sm tw-flex tw-flex-items-start">
                        <div className="change-description">
                            <h2
                                className="tw-text-md tw-inline"
                                dangerouslySetInnerHTML={{ __html: messageWithLinks }}
                            ></h2>
                            <a
                                href={commitLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="tw-text-purple-500 tw-hover:text-purple-700 tw-ml-2"
                                style={{
                                    background: `linear-gradient(to right, #434C5E, #4C566A, #E5E9F0, #ECEFF4)`,
                                    backgroundSize: "100% 1px",
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "bottom",
                                    paddingBottom: "2px",
                                }}
                            >
                                {`(${commit.sha.substring(0, 7)})`}
                            </a>
                            <span className="tw-ml-2 tw-text-gray-600">
                                {hoursDifference < 48 ? `${hoursDifference} hours ago` : format(date, 'MMMM dd, yyyy')}
                            </span>
                        </div>
                    </li>
                </React.Fragment>
            );
        });
    };


    return (
        <Layout metaTitle={"Latest Updates"}>
            <section>
                <div className="relative h-screen">
                    <div className="container mx-auto px-4">
                        <h1 className="tw-text-4xl tw-font-bold tw-py-10 tw-text-center">Updates</h1>
                        <div className="tw-w-full tw-flex tw-justify-center tw-pb-4">
                            <input
                                type="text"
                                className="tw-rounded tw-border tw-border-gray-300 tw-py-2 tw-px-4 tw-w-1/2 tw-outline-none focus:tw-ring-2 focus:tw-ring-purple-500"
                                placeholder="Search commits..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                        <ul className="tw-space-y-4">
                            {filteredCommits.length === 0 ? (
                                <p>Sorry but, we haven't committed that yet!</p>
                            ) : (
                                renderCommits(filteredCommits)
                            )}
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