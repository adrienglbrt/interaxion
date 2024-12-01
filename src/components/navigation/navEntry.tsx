import Link from "next/link";

export default function NavEntry({
  href,
  children,
  isExternal,
}: {
  href: string;
  children: React.ReactNode;
  isExternal?: boolean;
}) {
  return (
    <Link
      href={href}
      target={isExternal ? "_blank" : "_self"}
      className='uppercase hover:opacity-70 transition-opacity duration-300'
      scroll={false}
    >
      {children}
    </Link>
  );
}
