import Link from "next/link";

const BreadcrumbItem = ({ children, href, isCurrent, ...props }) => {
  return (
    <li className="d-inline ms-3" {...props}>
      <Link href={href} passHref>
        {children}
      </Link>
    </li>
  );
};

export default BreadcrumbItem;
