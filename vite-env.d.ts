/// <reference types="vite/client" />

declare module '*.svg' {
  // Fix: Renamed 'content' to 'src' to resolve a duplicate identifier error.
  const src: string;
  export default src;
}
