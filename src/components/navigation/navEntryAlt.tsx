import Link from "next/link";
import { useRouter } from "next/router";

export default function NavEntryAlt({
  href,
  children,
  isExternal,
}: {
  href: string;
  children: string;
  isExternal?: boolean;
}) {
  const { asPath } = useRouter();
  const isActive = asPath.includes(href);

  return (
    <div className='relative inline-block'>
      <Link
        href={href}
        target={isExternal ? "_blank" : "_self"}
        className='group uppercase flex items-center gap-1 hover:opacity-70 transition-opacity duration-300'
        scroll={false}
      >
        <span>{children}</span>
        {isExternal ? (
          <span className='absolute -right-4 text-xl inline-block opacity-0 group-hover:opacity-70 transition-all duration-300'>
            ↗
          </span>
        ) : (
          <span
            className={`relative inline-block bg-white rounded-full size-[6px] transition-all duration-300 ${
              isActive
                ? "opacity-100 group-hover:opacity-70"
                : "opacity-0 group-hover:opacity-70"
            }`}
          />
        )}
      </Link>
    </div>
  );
}
