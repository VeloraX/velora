import { useState } from "react";
import { Icon } from "@iconify/react";
import checkmarkIcon from "@iconify/icons-ic/baseline-check-circle";

export default function HeroSection() {
  const [videoVisible, setVideoVisible] = useState(false);
  const videoThumbnailUrl =
    "https://img.youtube.com/vi/T-Zv73yZ_QI/maxresdefault.jpg";

  const handlePlayButtonClick = () => {
    setVideoVisible(true);
  };

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
          <Icon
            icon={checkmarkIcon}
            className="tw-text-green-500 tw-mr-2"
          />
          <p className="tw-text-2xl">No CSS knowledge required.</p>
        </div>
        <div className="tw-flex tw-items-center">
          <Icon
            icon={checkmarkIcon}
            className="tw-text-green-500 text-lg tw-mr-2"
          />
          <p className="tw-text-2xl">All for free.</p>
        </div>{" "}
        <br />
        <pre className="tw-bg-gray-800 tw-text-orange-400 tw-p-4 tw-rounded tw-mb-6 tw-w-80 ">
          <code>npm install velora</code>
        </pre>
        <p />
        <div className="tw-mb-6">
          <button className="tw-bg-blue-500 tw-hover:bg-blue-600 tw-text-white tw-font-bold tw-py-2 tw-px-4 tw-rounded tw-mr-4">
            View on GitHub
          </button>
          <button className="tw-bg-white tw-hover:bg-gray-300 tw-text-gray-800 tw-font-bold tw-py-2 tw-px-4 tw-rounded">
            Download
          </button>
        </div>
      </div>
      <div className="tw-w-full tw-drop-shadow-[0_35px_35px_rgba(0,0,0,0.60)] tw--ml-11">
        <iframe
          width="900"
          height="506"
          src="https://www.youtube.com/embed/T-Zv73yZ_QI?disablekb=1&fs=0&modestbranding=1&playsinline=1&color=white&iv_load_policy=3"
          title="Tru shows how its done"
          allowfullscreen
          className="tw-mx-auto"
        ></iframe>
      </div>
        </div>
      </div>
      
    </section>
  );
}
