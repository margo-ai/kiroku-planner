/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

declare module "*.scss";
declare module "*.css";

declare module "*.svg" {
  import React from "react";

  const SVG: React.FC<React.SVGProps<SVGSVGElement>>;
  export default SVG;
}

interface ImportMetaEnv {
  readonly VITE_USE_EMULATORS?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
