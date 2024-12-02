import React from "react";

export default function HeadingOne({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <h1 className='font-serif text-6xl sm:text-7xl lg:text-8xl xl:text-9xl'>
      {children}
    </h1>
  );
}
