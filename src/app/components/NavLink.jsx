import Link from "next/link";

const NavLink = ({ href, title }) => {
  return (
    <Link
      href={href}
      shallow
      className="block py-2 pl-3 pr-4 font-bold text-base text-[#484848] sm:text-md rounded md:p-0 hover:text-black"
    >
      {title}
    </Link>
  );
};

export default NavLink;
