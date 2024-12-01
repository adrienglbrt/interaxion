import { ReactNode } from "react";

export default function Grid({
  children,
}: {
  children: ReactNode | ReactNode[];
}) {
  return (
    <div className='grid grid-cols-6 lg:grid-cols-12 gap-4'>{children}</div>
  );
}
