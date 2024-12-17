import Link from "next/link";

export default function AnimatedUnderlineLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <div className='group relative inline-block h-7 overflow-hidden'>
      <Link
        href={href}
        scroll={false}
        className='relative transition-opacity duration-500 hover:opacity-80 ease-in-out cursor-pointer'
      >
        {children}

        {/* Base Underline */}
        <span
          className='
            absolute left-0 top-full h-[0.125rem] w-full border-black border-b transition-transform duration-1000 ease-in-out group-hover:translate-x-[200%]'
        />

        {/* Hover Underline */}
        <span
          className='
            absolute left-0 top-full h-[0.125rem] w-full border-black border-b transition-transform duration-1000 ease-in-out transform -translate-x-[200%] group-hover:translate-x-0'
        />
      </Link>
    </div>
  );
}
