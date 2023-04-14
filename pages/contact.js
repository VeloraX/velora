import Layout from "@/components/Layout";
import PageHeaderBlock from "@/components/PageHeader";
import contactForm from "@/config/contactForm.json";
import { getSinglePage } from "@/libs/getSinglePage";
import {
  IconBrandTelegram,
  IconMailForward,
  IconPhone,
} from "@tabler/icons-react";
import { marked } from "marked";

export default function Contact({ contact: { frontMatter } }) {
  return (
    <Layout metaTitle={frontMatter.title}>
      <PageHeaderBlock title={frontMatter.title} />

      <section>
        <div className="container">
          <div className="row gy-5 justify-content-center">
            <div className="col-lg-5 col-md-10 ms-lg-auto me-lg-0 me-auto">
              <div className="mb-5">
                <h2 className="h3 mb-3">{frontMatter.contact.title}</h2>
                <p
                  className="mb-0"
                  dangerouslySetInnerHTML={{
                    __html: marked.parseInline(frontMatter.contact.content),
                  }}
                ></p>
              </div>
              <div>
                <h2
                  className="h4 mb-3"
                  dangerouslySetInnerHTML={{
                    __html: marked.parseInline(
                      frontMatter.contact.contact_info_title
                    ),
                  }}
                ></h2>
                <p className="mb-2 content">
                  <i className="me-2 d-inline-block mb-0">
                    <IconMailForward size={16} />
                  </i>{" "}
                  <a href={`mailto:${frontMatter.contact.email_address}`}>
                    {frontMatter.contact.email_address}
                  </a>
                </p>
                <p className="mb-0 content">
                  <i
                    className="me-2"
                    style={{ transform: "translateY(" + -2 + "px)" }}
                  >
                    <IconPhone size={17} />
                  </i>{" "}
                  {frontMatter.contact.phone_number}
                </p>
              </div>
            </div>

            <div className="col-lg-5 me-lg-auto ms-lg-0 ms-auto">
              <h2 className="h3 mb-4">Contact form</h2>

              <form
                className="row g-4"
                action={contactForm.contactFormAction}
                method="POST"
                target="_blank"
              >
                <div className="col-md-12">
                  <textarea
                    className="form-control"
                    placeholder="Ask question or just say Hi"
                    rows="4"
                    name="message"
                    required
                  ></textarea>
                </div>
                <div className="col-md-12">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email address"
                    name="email"
                    required
                  />
                </div>
                <div className="col-md-12">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Your name here"
                    name="name"
                    required
                  />
                </div>
                <div className="col-12">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    aria-label="Send Message"
                  >
                    Send{" "}
                    <i className="ms-1">
                      <IconBrandTelegram size={18} />
                    </i>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  return {
    props: {
      contact: getSinglePage("content/contact.md"),
    },
  };
}
