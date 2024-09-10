import { deepMerge } from "@std/collections";
import { expandGlob, ExpandGlobOptions } from "@std/fs/expand-glob";
import { exists } from "jsr:@std/fs/exists";
import { join } from "@std/path/join";
import { dirname, resolve } from "@std/path";
import { up } from "npm:empathic/find";
import { PackageMapper, RuntimeMapper } from "./types.ts";

// Patterns
export const globMdPattern = "**/*.md";
export const configPattern = "apps/**/{runtime-*}/**/*{deno,package}.json";
export const installPattern =
  "apps/**/{runtime-*}/**/*{bun,pnpm-lock}.{lock,yaml}*";
export const denoDocsPattern = "{apps,scripts}/**/*deno.json";
export const docsPattern = "**/{apps,scripts,docs}/**/{docs,doc}";

// Values
export const appsNS = "apps";
export const docPath = join("docs", "doc");
export const excludes = [".git", '.github', "_site", "node_modules", "templates"]

// Runtime mapper
export const runtimeMapper: RuntimeMapper = {
  "package.json": {
    agent: ["bun", "node"],
    cmd: {
      "check": "check",
      "doc": "doc",
      "fmt": "format",
      "lint": "lint",
    },
  },
  "deno.json": {
    agent: "deno",
    cmd: {
      "check": "check **/*.ts",
      "doc": "doc --html **/*.ts",
      fmt: "fmt",
      "lint": "lint",
    },
  },
};

// Package manager mapper
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

// Functions
export const getFiles = async (pattern: string, option?: ExpandGlobOptions) => {
  const _option = deepMerge({
    root: getRoot(),
    includeDirs: false,
    exclude: [...option?.exclude ?? [], "**/node_modules/**", "**/.git/**"],
  }, option ?? {});
  if (!pattern) throw new Error("Pattern missing");
  return await Array.fromAsync(expandGlob(pattern, _option));
};
export const isPnpm = async (cwd: string) =>
  await exists(join(cwd, "pnpm-lock.yaml"));
export const isYarn = async (cwd: string) =>
  await exists(join(cwd, "yarn.lock"));
export const getRoot = () => {
  const cwd = resolve(Deno.cwd());
  return dirname(up("LICENSE", { cwd }) || cwd);
};

export const isCI = () => {
  const ciEnvVars = [
    'CI',
    'GITHUB_ACTIONS',
  ];

  for (const varName of ciEnvVars) {
    if (Deno.env.get(varName)) {
      return true;
    }
  }

  return false;
}
