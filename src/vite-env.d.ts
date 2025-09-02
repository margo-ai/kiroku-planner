/// <reference types="vite-plugin-svgr/client" />

declare module "*.scss";

declare module "*.svg" {
  import React from "react";

  const SVG: React.FC<React.SVGProps<SVGSVGElement>>;
  export default SVG;
}
