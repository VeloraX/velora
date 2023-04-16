import { useState } from "react";
import {
  IconCheck,
  IconHeartFilled,
  IconClipboardCopy,
  IconArrowRight,
} from "@tabler/icons-react";

export default function HeroSection() {
  const [videoVisible, setVideoVisible] = useState(false);
  const videoThumbnailUrl =
    "https://img.youtube.com/vi/T-Zv73yZ_QI/maxresdefault.jpg";

  return (
    <section className="tw-bg-transparent tw-py-20 tw-min-w-max">
      <div className="tw-container tw-mx-auto">
        <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-8 tw-items-start">
          <div className="tw-w-full tw--ml-24">
            <h1 className="tw-text-6xl tw-font-bold tw-mb-6">
              <b>THIS </b>is{" "}
              <span className="tw-text-purple-500 tw-font-normal">the </span>{" "}
              style
              <span className="tw-text-blue-500 tw-font-normal">
                <b>Sheet </b>
              </span>
              <span className="tw-text-green-500">
                <b>
                  <i>for </i>
                </b>
              </span>
              the{" "}
              <span className="tw-text-orange-500">
                <b>modern</b>{" "}
              </span>
              web
              <span className="tw-text-pink-500">
                <b>.</b>
              </span>
            </h1>
            <p className="tw-mb-10 tw-text-xl">
              Velora is an open-source framework that combines the best of Bulma
              and Tailwind CSS, providing ready-to-use frontend components for
              building responsive and professional web interfaces with ease.
            </p>
            <div className="tw-flex tw-items-center">
              <IconCheck
                icon={IconCheck}
                className="tw-text-purple-400 tw-mr-2"
                size={18}
              />
              <p className="tw-text-2xl">No CSS knowledge required.</p>
            </div>
            <div className="tw-flex tw-items-center">
              <IconCheck
                icon={IconCheck}
                className="tw-text-orange-500 tw-mr-2"
                size={18}
              />
              <p className="tw-text-2xl">All for free.</p>
            </div>{" "}
            <br />
            <div className="tw-relative tw-h-16 tw-w-96 tw-rounded-md tw-bg-gradient-to-r tw-from-pink-500 tw-via-red-500 tw-to-yellow-500 tw-p-0.5 tw-shadow-xl">
              <div className="tw-flex tw-h-full tw-w-full tw-items-center tw-justify-between tw-bg-gray-900 tw-rounded-md tw-px-4">
                <div className="tw-flex tw-items-center">
                  <IconArrowRight className="tw-h-5 tw-w-5 tw-text-white tw-opacity-20 tw-mr-2" />
                  <h1 className="tw-text-white tw-text-sm">
                    <del>npm create velora@latest</del>
                  </h1>
                </div>
                <IconClipboardCopy
                  onClick={handleCopyClick}
                  className="tw-h-5 tw-w-5 tw-text-white tw-opacity-50 tw-cursor-pointer tw-mr-2"
                />
              </div>
            </div>
            <div className="tw-w-96 tw-mt-4 tw-flex tw-justify-between">
              <a href="#" target="_blank" rel="noopener noreferrer">
                <button className="tw-px-6 tw-py-2 tw-w-44 tw-shadow-xl tw-bg-blue-600 hover:tw-bg-blue-700 tw-text-white tw-font-semibold tw-rounded">
                  <span>Start Here </span>
                </button>
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <button className="tw-px-6 tw-py-2 tw-w-44 tw-shadow-xl tw-bg-blue-600 hover:tw-bg-blue-700 tw-text-white tw-font-semibold tw-rounded">
                  <span>Download It</span>
                </button>
              </a>
            </div>
          </div>
          <div className="tw-w-full tw-drop-shadow-[0_35px_35px_rgba(0,0,0,0.60)] tw--ml-6">
            <iframe
              width="850"
              height="506"
              src="https://www.youtube.com/embed/T-Zv73yZ_QI?disablekb=1&fs=0&modestbranding=1&playsinline=1&color=white&iv_load_policy=3"
              title="Tru shows how its done"
              allowfullscreen
              className="tw-mx-auto"
            ></iframe>

            <p className="tw-text-sm tw-flex tw-justify-end tw-items-end tw-py-12">
              <a
                href="https://www.youtube.com/redirect?event=video_description&redir_token=QUFFLUhqa21ZYVpRVWZ3MC1mX3pqNWk0N1V0VGdWZHBDZ3xBQ3Jtc0tsYWNINklzYWVMWXB6Tk9LWE5IcFREdk5PNFN3U0hubmwzVmpQWE5mNFhqYnUzRl9ZS21Vd2ZMX0hNOHJ5OGM0OWRLb3JNUzFZZnJydlo0SS1rWTlwOFdsb2lNbEhxcTh2WUJ6clZUbFR2cjV5cHdGVQ&q=https%3A%2F%2Ftwitter.com%2Ftrunarla&v=T-Zv73yZ_QI"
                target="_blank"
                rel="noreferrer"
                className="tw-inline-flex tw-items-end tw-text-gray-500 tw-text-xs"
              >
                Tru Narla
                <IconHeartFilled
                  icon={IconHeartFilled}
                  className="tw-text-red-400 tw-mr-2"
                  size={18}
                />
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

const handleCopyClick = copy();

function copy() {
  return () => {
    navigator.clipboard.writeText("npm create velora@latest");
  };
}
