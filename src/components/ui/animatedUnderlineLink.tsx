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
    <div className='group relative inline-block h-8 overflow-hidden'>
      <Link
        href={href}
        scroll={false}
        className={`
          relative uppercase lg:text-xl text text-white 
          transition-all duration-500 ease-in-out cursor-pointer
          ${className}
        `}
      >
        {children}

        {/* Base Underline */}
        <span
          className='
            absolute left-0 top-full h-1 w-full 
              border-white border-b
            transition-transform duration-700 ease-in-out
            group-hover:translate-x-[200%]
          '
        />

        {/* Hover Underline */}
        <span
          className='
            absolute left-0 top-full h-1 w-full 
             border-white border-b
            transition-transform duration-700 ease-in-out
            transform -translate-x-[200%]
            group-hover:translate-x-0
          '
        />
      </Link>
    </div>
  );
}
