import { ReactNode } from "react";

export default function Wrapper({ children }: { children: ReactNode }) {
  return <div className='h-full w-full px-4'>{children}</div>;
}
