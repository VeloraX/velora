import { AppContext } from "@/components/UseContext";
import { formatDate } from "@/utils/formatDate";
import { IconX } from "@tabler/icons";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { posts } from "../cache/data";

export default function Search() {
  const { toggleSearch } = useContext(AppContext);
  const [searchOpen, setSearchOpen] = toggleSearch;

  const [searchTerm, setSearchTerm] = useState("");
  const [showSearchResults, setshowSearchResults] = useState([]);

  // Get Post Tags
  const allTags = posts.map((tag) => tag.frontMatter.tags);
  const flatTags = allTags.flat();
  const uniqueTags = [...new Set(flatTags)];

  // Get Post Categories
  const allCategories = posts.map(
    (category) => category.frontMatter.categories
  );
  const flatCategories = allCategories.flat();
  const uniqueCategories = [...new Set(flatCategories)];

  useEffect(() => {
    const getResults = async () => {
      const res = await fetch("/api/search");
      const post = await res.json();
      setshowSearchResults(post);
    };
    getResults();
  }, []);

  const searchResults = showSearchResults.filter((searchResult) => {
    if (searchTerm === "") {
      return "";
    } else if (
      searchResult.frontMatter.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    ) {
      return searchResult;
    } else if (
      searchResult.frontMatter.description
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    ) {
      return searchResult;
    } else if (
      searchResult.frontMatter.author
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    ) {
      return searchResult;
    } else if (
      searchResult.frontMatter.tags[0]
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    ) {
      return searchResult;
    } else if (
      searchResult.frontMatter.categories[0]
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    ) {
      return searchResult;
    }
  });

  // search input focus
  searchOpen
    ? setTimeout(() => {
        document.querySelector('[aria-label="search-query"]').focus();
      }, 250)
    : null;

  const resetSearchInput = () => {
    setSearchOpen(!searchOpen);
    setSearchTerm("");
  };

  return (
    <>
      <div
        className={searchOpen ? `search-overlay is-visible` : `search-overlay`}
        onClick={() => resetSearchInput(true)}
      ></div>
      <div
        className={
          searchOpen ? `search-block is-visible` : `search-block is-hidden`
        }
      >
        <div data-toggle="search-close" onClick={() => resetSearchInput(true)}>
          <span className="text-primary">
            <IconX size={38} />
          </span>
        </div>
        <input
          type="text"
          value={searchTerm}
          placeholder="Type to search blog.."
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
          aria-label="search-query"
        />

        <div className="search-result-block">
          {searchResults.length ? (
            <div className="search-results row g-4 mt-2">
              <p className="h4 mb-0">
                <span className="font-secondary">{searchResults.length} </span>
                {searchResults.length > 1 ? "results" : "result"} found.
              </p>
              {searchResults.map((r, i) => (
                <div
                  key={i}
                  className="search-result-card col-xl-2 col-lg-3 col-sm-4 col-12"
                  onClick={() => resetSearchInput(true)}
                >
                  <Link href={`/blog/${r.slug}`}>
                    <a title={r.frontMatter.title}>
                      <Image
                        className="rounded"
                        src={r.frontMatter.image}
                        alt={r.frontMatter.title}
                        width={`190`}
                        height={`100`}
                        layout="responsive"
                        placeholder="blur"
                        blurDataURL={r.frontMatter.image}
                      />
                      <span className="d-inline-block mt-2 mb-1 small">
                        {formatDate(r.frontMatter.date)}
                      </span>
                      <p className="h5 mb-0">{r.frontMatter.title}</p>
                    </a>
                  </Link>
                </div>
              ))}
            </div>
          ) : searchTerm === "" ? (
            <></>
          ) : (
            <div className="search-results row g-4 mt-2">
              <p className="h3 mt-3 mb-0">No results found!</p>
            </div>
          )}
        </div>

        <div className="mt-4 pt-3 card-meta">
          <p className="h4 mb-3">See posts by tags</p>
          <ul className="card-meta-tag list-inline">
            {uniqueTags.map((item, i) => (
              <li
                key={i}
                className="list-inline-item me-1 mb-2"
                onClick={() => resetSearchInput(true)}
              >
                <Link href={`/tags/${item.replace(/ /g, "-").toLowerCase()}`}>
                  <a className="small">{item}</a>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-4 card-meta">
          <p className="h4 mb-3">See posts by categories</p>
          <ul className="card-meta-tag list-inline">
            {uniqueCategories.map((item, i) => (
              <li
                key={i}
                className="list-inline-item me-1 mb-2"
                onClick={() => resetSearchInput(true)}
              >
                <Link
                  href={`/categories/${item.replace(/ /g, "-").toLowerCase()}`}
                >
                  <a className="small">{item}</a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
