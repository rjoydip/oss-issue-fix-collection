import { expandGlob } from "@std/fs/expand-glob";

export const testPattern = "**/{runtime-*}/**/*{deno,package}.json";
export const installPattern = "**/{runtime-*}/**/*{bun,pnpm-lock}.{lock,yaml}*";

type Mapper = {
  [key: string]: {
    agent: "bun" | "npm" | "pnpm" | "yarn";
  };
};

export const mapper: Mapper = {
  "bun.lockb": {
    agent: "bun",
  },
  "yarn.lock": {
    agent: "yarn",
  },
  "pnpm-lock.yaml": {
    agent: "pnpm",
  },
  "package-lock.yaml": {
    agent: "npm",
  },
};

export const getFiles = async (pattern: string) => {
  if (!pattern) throw new Error("Pattern missing");
  return await Array.fromAsync(
    expandGlob(pattern, {
      root: "./",
      exclude: ["**/node_modules/**", "**/.git/**", "**/dist/**"],
      includeDirs: false,
    }),
  );
};
