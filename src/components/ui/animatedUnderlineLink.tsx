import Link from "next/link";

export default function AnimatedUnderlineLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className='relative inline-block group h-8 overflow-hidden'>
      <Link
        href={href}
        scroll={false}
        className={`
          relative z-10 uppercase lg:text-xl text text-white 
          transition-all duration-500 ease-in-out
          ${className}
        `}
      >
        {children}

        {/* Base Underline */}
        <span
          className='
            absolute left-0 -bottom-1 h-[1px] w-full 
            bg-white origin-left 
            transition-transform duration-700 ease-in-out
            group-hover:translate-x-[200%]
          '
        />

        {/* Hover Underline */}
        <span
          className='
            absolute left-0 -bottom-1 h-[1px] w-full 
            bg-white origin-right 
            transition-transform duration-700 ease-in-out
            transform -translate-x-[200%]
            group-hover:translate-x-0
          '
        />
      </Link>
    </div>
  );
}
