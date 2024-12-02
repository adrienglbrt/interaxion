import React from "react";

export default function HeadingOne({
  hasMixBlendMode,
  children,
}: {
  hasMixBlendMode?: boolean;
  children: React.ReactNode;
}) {
  return (
    <h1
      className={`font-serif text-6xl sm:text-7xl lg:text-8xl xl:text-9xl ${
        hasMixBlendMode ? "text-white" : "text-black"
      }`}
    >
      {children}
    </h1>
  );
}
