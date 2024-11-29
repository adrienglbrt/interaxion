import localFont from "next/font/local";
import { ReactNode } from "react";
import NavBar from "../navigation/navBar";

const enduro = localFont({
  src: [
    {
      path: "../../../public/fonts/Enduro-Regular-Trial.otf",
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
      path: "../../../public/fonts/CardinalPhoto-Regular-Trial.otf",
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
      className={`${cardinalPhoto.variable} ${enduro.variable} font-sans antialiased bg-white text-black min-h-[100svh]`}
    >
      {children}
      <NavBar />
    </div>
  );
}
