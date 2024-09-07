import { deepMerge } from "@std/collections";
import { expandGlob, ExpandGlobOptions } from "@std/fs/expand-glob";
import { exists } from "jsr:@std/fs/exists";
import { join } from "@std/path/join";
import { dirname, resolve } from "@std/path";
import { up } from 'npm:empathic/find';
import { RuntimeMapper, PackageMapper } from "./types.ts";

export const globMdPattern = "**/*.md"
export const configPattern = "apps/**/{runtime-*}/**/*{deno,package}.json";
export const installPattern = "apps/**/{runtime-*}/**/*{bun,pnpm-lock}.{lock,yaml}*";
export const denoDocsPattern = "{apps,scripts}/**/*deno.json";

export const runtimeMapper: RuntimeMapper = {
  "package.json": {
    agent: ["bun", "node"],
    cmd: {
      "check": "check",
      "doc": "doc",
      "fmt": "format",
      "lint": "lint"
    }
  },
  "deno.json": {
    agent: "deno",
    cmd: {
      "check": "check **/*.ts",
      "doc": "doc --html **/*.ts",
      fmt: "fmt",
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

export const getFiles = async (pattern: string, option?: ExpandGlobOptions) => {
  const _option = deepMerge({
    root: "./",
    includeDirs: false,
    exclude: [...option?.exclude ?? [], "**/node_modules/**", "**/.git/**"]
  }, option ?? {})
  if (!pattern) throw new Error("Pattern missing");
  return await Array.fromAsync(expandGlob(pattern, _option));
};

export const isPnpm = async (cwd: string) => await exists(join(cwd, 'pnpm-lock.yaml'))
export const isYarn = async (cwd: string) => await exists(join(cwd, 'yarn.lock'))
export const docPath = join('docs', 'doc')
export const appsNS = 'apps'
export const getRoot = () => {
  const cwd = resolve(Deno.cwd())
  return dirname(up("LICENSE", { cwd }) || cwd)
}