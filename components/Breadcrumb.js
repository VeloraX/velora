import { Children, Fragment } from "react";

const Breadcrumb = ({ children, blogPage }) => {
  const childrenArray = Children.toArray(children);

  const childrenWtihSeperator = childrenArray.map((child, index) => {
    if (index !== childrenArray.length - 1) {
      return <Fragment key={index}>{child}</Fragment>;
    }
    return child;
  });

  return (
    <nav className="mb-4" aria-label="breadcrumb">
      <ul
        className={`list-inline breadcrumb-menu ${
          blogPage && "blog-page-breadcrumb-menu"
        }`}
      >
        {childrenWtihSeperator}
      </ul>
    </nav>
  );
};

export default Breadcrumb;
