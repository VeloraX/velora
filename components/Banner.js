import { useState } from "react";
import {
  IconCheck,
  IconHeartFilled,
  IconClipboardCopy,
  IconArrowRight,
  IconThumbUp,
} from "@tabler/icons-react";

export default function Banner() {
  const [copied, setCopied] = useState(false);
  const [packageType, setPackageType] = useState(null);

  const handleCopyClick = () => {
    navigator.clipboard.writeText(`${packageType} create velora@latest`);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const handlePackageSelect = (type) => {
    setPackageType(type);
  };

  return (
    <section className="bg-transparent tw-py-20 pb-14 min-vw-99">
      <div className="container">
        <div className="row align-items-start">
          <div className="col-12 col-md-6">
            <h1 className="display-4 font-weight-bold mb-4">
              <b>THIS </b>is{" "}
              <span className="tw-text-purple-400 font-weight-normal">
                the{" "}
              </span>{" "}
              style
              <span className="tw-text-blue-400 font-weight-normal">
                <b>Sheet </b>
              </span>
              <span className="text-success">
                <b>
                  <i>for </i>
                </b>
              </span>
              the{" "}
              <span className="tw-text-orange-300">
                <b>modern</b>{" "}
              </span>
              we
              <span className="tw-text-pink-400">b</span>.
            </h1>
            <p className="mb-4">
              Velora is an open-source framework that combines the best of Bulma
              and Tailwind CSS, providing ready-to-use frontend components for
              building responsive and professional web interfaces with ease.
            </p>
            <div className="d-flex align-items-center mb-3">
              <IconCheck size={18} className="text-purple-400 mr-2" />
              <p>No CSS knowledge required.</p>
            </div>
            <div className="d-flex align-items-center mb-3">
              <IconCheck size={18} className="text-orange-500 mr-2" />
              <p>All for free.</p>
            </div>{" "}
            <br />
          </div>

          <div className="col-12 col-md-6">
            <div className="embed-responsive embed-responsive-16by9">
              <iframe
                width="750"
                height="406"
                className="embed-responsive-item"
                src="https://shorturl.at/kJPQU"
                title="Tru shows how its done"
                allowFullScreen
              ></iframe>
            </div>
            <p className="text-sm d-flex justify-content-end align-items-end py-3">
              <a
                href="https://shorturl.at/pxX89"
                target="_blank"
                rel="noreferrer"
                className="d-inline-flex align-items-end text-gray-500 small"
              >
                Tru Narla
                <IconHeartFilled
                  icon={IconHeartFilled}
                  className="text-red-400 ml-2"
                  size={18}
                />
              </a>
            </p>
          </div>



          <div className="col-12 col-md-6">
            <div className="position-relative h-16 w-75 rounded shadow gradient-border">
              {!packageType && (
                <div
                  className="d-flex gap-2 mb-2 position-absolute"
                  style={{ top: "-1.5rem", left: "1.5rem" }}
                >
                  <span
                    className="text-white cursor-pointer"
                    onClick={() => handlePackageSelect("npm")}
                  >
                    npm
                  </span>
                  <span
                    className="text-white cursor-pointer"
                    onClick={() => handlePackageSelect("yarn")}
                  >
                    yarn
                  </span>
                  <span
                    className="text-white cursor-pointer"
                    onClick={() => handlePackageSelect("pnpm")}
                  >
                    pnpm
                  </span>
                </div>
              )}
              <div
                className="position-relative rounded"
                style={{ padding: "1px" }}
              >
                <div
                  className="d-flex align-items-center justify-content-between bg-dark rounded px-4"
                  style={{ height: "3rem" }}
                >
                  <div className="d-flex align-items-center">
                    <IconArrowRight className="h-5 w-5 text-white opacity-20 mr-2" />
                    <h1 className="text-white text-sm">
                      {copied
                        ? "👍 Way to go!"
                        : packageType
                          ? `Selected: ${packageType}`
                          : "Select a Package Type"}
                    </h1>
                  </div>
                  {packageType && (
                    <IconClipboardCopy
                      onClick={handleCopyClick}
                      className="h-5 w-5 text-white opacity-50 cursor-pointer mr-2"
                    />
                  )}
                </div>
              </div>

              <style>{`
  .gradient-border::before {
    content: "";
    position: absolute;
    top: -2px;
    right: -2px;
    bottom: -2px;
    left: -2px;
    border-radius: inherit;
    background-image: linear-gradient(to right, #f72585, #b5179e, #7209b7, #560bad, #480ca8, #3a0ca3, #3f37c9, #4361ee, #4895ef, #4cc9f0);
    z-index: -1;
  }
`}</style>
            </div>


            <div className="w-50 mt-4 tw-pb-16 d-flex justify-content-between gap-3">

              <a
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.preventDefault()}
                style={{
                  pointerEvents: "none",
                  cursor: "default",
                  textDecoration: "none",
                }}
              >
                <button
                  className="btn btn-primary shadow font-semibold rounded"
                  title="Disabled!"
                >
                  <span>Start Here</span>
                </button>
              </a>

              <a
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.preventDefault()}
                style={{
                  pointerEvents: "none",
                  cursor: "default",
                  textDecoration: "none",
                }}
              >
                <button
                  className="btn btn-primary shadow font-semibold rounded"
                  title="Disabled!"
                >
                  <span>Download It</span>
                </button>
              </a>
            </div>
          </div>




        </div>
      </div>
    </section>


  );
}
