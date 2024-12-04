import Link from "next/link";
import { useScramble } from "use-scramble";

export default function NavEntry({
  href,
  children,
  isExternal,
}: {
  href: string;
  children: string;
  isExternal?: boolean;
}) {
  const { ref, replay } = useScramble({
    text: children,
    range: [65, 125],
    speed: 0.7,
    tick: 5,
  });

  return (
    <div className='relative inline-block'>
      <Link
        href={href}
        target={isExternal ? "_blank" : "_self"}
        className='uppercase hover:opacity-70 transition-opacity duration-300'
        scroll={false}
        onMouseEnter={replay}
      >
        <span ref={ref}>{children}</span>
      </Link>
    </div>
  );
}
