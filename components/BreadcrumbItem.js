import Link from "next/link";

const BreadcrumbItem = ({ children, href, isCurrent, ...props }) => {
  return (
    <li className="d-inline ms-3" {...props}>
      <Link href={href} passHref>
        <a>{children}</a>
      </Link>
    </li>
  );
};

export default BreadcrumbItem;
