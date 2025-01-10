import localFont from "next/font/local";
import { ReactNode } from "react";
import NavBarAlt from "../navigation/navBarAlt";

const enduro = localFont({
  src: [
    {
      path: "../../../public/fonts/EnduroWeb-Regular.woff",
      weight: "400",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-enduro",
});

const cardinalPhoto = localFont({
  src: [
    {
      path: "../../../public/fonts/CardinalPhotoWeb-Regular.woff",
      weight: "400",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-cardinalPhoto",
});

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div
      className={`${cardinalPhoto.variable} ${enduro.variable} font-sans bg-white text-black min-h-[100svh]`}
    >
      {children}
      <NavBarAlt />
    </div>
  );
}
