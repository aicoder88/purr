"use client";

import dynamic from "next/dynamic";

// Dynamically import the CatBlessingTool to avoid SSR issues with audio
const CatBlessingTool = dynamic(
  () => import("@/components/fun/CatBlessingTool").then((mod) => mod.CatBlessingTool),
  { ssr: false }
);

export function CatBlessingToolClient() {
  return <CatBlessingTool />;
}
