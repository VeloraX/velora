import {
  IconBrandFacebook,
  IconBrandGithub,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandTwitter,
} from "@tabler/icons";
import { marked } from "marked";
import Image from "next/image";

export default function BannerBlock({ banner: { frontMatter } }) {
  return (
    <section className="section overflow-hidden banner">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="row g-4 g-lg-5 text-center text-lg-start align-items-center justify-content-center justify-content-lg-start">
              <div className="col-md-4 col-sm-5 col-6">
                <Image
                  className="rounded"
                  src={frontMatter.image}
                  alt={frontMatter.title}
                  width={`250`}
                  height={`250`}
                  layout="responsive"
                  placeholder="blur"
                  blurDataURL={frontMatter.image}
                />
              </div>
              <div className="col-lg-8 col-md-12">
                <p className="mb-2">{frontMatter.subtitle}</p>
                <h1 className="text-dark mb-3">{frontMatter.title}</h1>
                <div className="content">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: marked.parse(frontMatter.description),
                    }}
                  ></div>
                </div>

                <ul className={`social-share icon-box mt-4 pt-2`}>
                  <li className="d-inline-block me-2 mb-2">
                    <a
                      aria-label="facebook"
                      href="https://facebook.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i>
                        <IconBrandFacebook size={18} />
                      </i>
                    </a>
                  </li>
                  <li className="d-inline-block me-2 mb-2">
                    <a
                      aria-label="twitter"
                      href="https://twitter.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i>
                        <IconBrandTwitter size={18} />
                      </i>
                    </a>
                  </li>
                  <li className="d-inline-block me-2 mb-2">
                    <a
                      aria-label="instagram"
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i>
                        <IconBrandInstagram size={18} />
                      </i>
                    </a>
                  </li>
                  <li className="d-inline-block me-2 mb-2">
                    <a
                      aria-label="linkedin"
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i>
                        <IconBrandLinkedin size={18} />
                      </i>
                    </a>
                  </li>
                  <li className="d-inline-block me-2 mb-2">
                    <a
                      aria-label="github"
                      href="https://github.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i>
                        <IconBrandGithub size={18} />
                      </i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
