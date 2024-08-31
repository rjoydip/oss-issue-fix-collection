import { expandGlob } from "@std/fs/expand-glob";
import { exists } from "jsr:@std/fs/exists";
import { join } from "@std/path/join";
import { RuntimeMapper, PackageMapper } from "./types.ts";

export const configPattern = "**/{runtime-*}/**/*{deno,package}.json";
export const installPattern = "**/{runtime-*}/**/*{bun,pnpm-lock}.{lock,yaml}*";

export const runtimeMapper: RuntimeMapper = {
  "package.json": {
    agent: ["bun", "node"],
    cmd: {
      "fmt": "format",
      "check": "check",
      "lint": "lint"
    }
  },
  "deno.json": {
    agent: "deno",
    cmd: {
      fmt: "fmt",
      "check": "check **/*.ts",
      "lint": "lint"
    }
  },
};

export const packageMapper: PackageMapper = {
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

export const isPnpm = async (cwd: string) => await exists(join(cwd, 'pnpm-lock.yaml'))
export const isYarn = async (cwd: string) => await exists(join(cwd, 'yarn.lock'))