import Link from "next/link";

export default function NavEntry({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className='uppercase hover:opacity-70 transition-opacity duration-300'
    >
      {children}
    </Link>
  );
}
