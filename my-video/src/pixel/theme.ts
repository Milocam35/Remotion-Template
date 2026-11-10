import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

// DESIGN.md §2 + §4
export const PX = 6;
export const FONT = "Departure Mono";
loadFont({ family: FONT, url: staticFile("fonts/DepartureMono-Regular.otf") }); // delays render until loaded

export const q = (v: number) => Math.round(v / PX) * PX; // snap to the art grid

// DESIGN.md §3
export const T = {
  plaque: "#F6F0E4",
  plaqueDash: "#D8D0C0",
  ink: "#202028",
  inkGold: "#A07008",
  captionBg: "rgba(6, 6, 18, 0.92)",
  captionText: "#F8F8F8",
  hlYellow: "#F8D040",
  hlCyan: "#58D8F0",
  chipBg: "#423C36",
  chipYellow: "#F0D050",
  chipCyan: "#68E0F8",
  footerBg: "#000006",
  footerText: "#A8B0B8",
  cardBody: "#F0F0F6",
  clip: "#A2AEBA",
  clipDark: "#6C727E",
  clipLight: "#C8D0D8",
  cat1: "#FCB400",
  cat2: "#3684E4",
  cat3: "#EA2A36",
  cat4: "#FC6C18",
} as const;

// Illustration palette of the bone-healing video (pastel background asked by its script; not in DESIGN.md yet)
export const ART = {
  pastel: "#A9D4F0",
  pastelShadow: "#8CBCDB",
  bone: "#F4EAD0",
  boneLight: "#FFF8E8",
  boneShade: "#DCCAA0",
  boneBreak: "#E9B8A0",
  band: "#F6C08A",
  bandPad: "#E8A070",
  blush: "#F4A0B0",
  glass: "#F4FAFF",
  white: "#FFFFFF",
  rulerLight: "#FFD866",
  rulerShade: "#D89600",
} as const;
