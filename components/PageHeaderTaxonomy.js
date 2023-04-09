import Breadcrumb from "@/components/Breadcrumb";
import BreadcrumbItem from "@/components/BreadcrumbItem";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function PageHeaderTaxo({ title }) {
  const router = useRouter();
  const [breadcrumbs, setBreadcrumbs] = useState();

  useEffect(() => {
    const pathWithoutQuery = router.asPath.split("?")[0];
    let pathArray = pathWithoutQuery.split("/");
    pathArray.shift();

    pathArray = pathArray.filter((path) => path !== "");

    const breadcrumbs = pathArray.map((path, index) => {
      const href = "/" + pathArray.slice(0, index + 1).join("/");
      return {
        href,
        label: path.charAt(0).toUpperCase() + path.slice(1),
        isCurrent: index === pathArray.length - 1,
      };
    });

    setBreadcrumbs(breadcrumbs);
  }, [router.asPath]);

  const convertBreadcrumb = (string) => {
    return (
      string
        .replace(/-/g, " ")
        .replace(/oe/g, "ö")
        .replace(/ae/g, "ä")
        .replace(/ue/g, "ü")
        .charAt(0)
        .toUpperCase() + string.slice(1).replace(/-/g, " ")
    );
  };
  return (
    <>
      <section className="section-sm">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <p className="mb-2">Showing posts from</p>
              <h1 className="section-title h2 mb-3">
                <span className="text-captalize">
                  {convertBreadcrumb(title)}
                </span>
              </h1>

              <Breadcrumb>
                <BreadcrumbItem isCurrent={router.pathname === "/"} href="/">
                  <i
                    className="d-inline-block text-dark"
                    style={{ transform: "translateY(-" + 2 + "px)" }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                      <polyline points="5 12 3 12 12 3 21 12 19 12"></polyline>
                      <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7"></path>
                      <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6"></path>
                    </svg>
                  </i>
                  <span className="ms-2">Home</span>
                </BreadcrumbItem>
                {breadcrumbs &&
                  breadcrumbs.map((breadcrumb) => (
                    <BreadcrumbItem
                      key={breadcrumb.href}
                      href={breadcrumb.href}
                      isCurrent={breadcrumb.isCurrent}
                    >
                      {breadcrumb.label}
                    </BreadcrumbItem>
                  ))}
              </Breadcrumb>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
