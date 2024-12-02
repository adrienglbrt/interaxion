import { ReactNode } from "react";

export default function Grid({
  children,
}: {
  children: ReactNode | ReactNode[];
}) {
  return (
    <div className='h-full grid grid-cols-6 lg:grid-cols-12 gap-1 sm:gap-2 lg:gap-4'>
      {children}
    </div>
  );
}
