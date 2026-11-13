import { Bricolage_Grotesque, Instrument_Sans, JetBrains_Mono } from "next/font/google";

export const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});

export const sans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
});

export const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

/** Classes à poser sur `<html>` pour que les polices soient disponibles. */
export const fontVariables = `${display.variable} ${sans.variable} ${mono.variable}`;
