import { Glob, spawn } from "bun";
import { parse, sep } from "node:path";

const glob = new Glob("**/{runtime-*}/**/*{bun,pnpm-lock}.{lock,yaml}*");
const files = glob.scan({
  cwd: ".",
  absolute: false,
  onlyFiles: true,
});

const mapper: {
  [key: string]: {
    name: "bun" | "node" | "pnpm" | "yarn";
    runtime: "bun" | "node";
    config: "package.json";
  };
} = {
  "bun.lockb": {
    name: "bun",
    runtime: "bun",
    config: "package.json",
  },
  "yarn.lock": {
    name: "yarn",
    runtime: "node",
    config: "package.json",
  },
  "pnpm-lock.yaml": {
    name: "pnpm",
    runtime: "node",
    config: "package.json",
  },
  "package-lock.yaml": {
    name: "node",
    runtime: "node",
    config: "package.json",
  },
};

for await (const file of files) {
  const { base, dir } = parse(file);
  const { name = "node", runtime = "node" } = mapper[base];
  try {
    let cmd: string[] = [];
    if (runtime === "bun") {
      cmd = [runtime, "test"];
    } else {
      if (name == "yarn" || name == "pnpm") {
        cmd = [name, "test"];
      } else {
        cmd = ["npm", "test"];
      }
    }
    const proc = spawn(cmd, {
      cwd: dir.replaceAll("\\", sep),
    });
    const text = await new Response(proc.stdout).text();
    console.log(text);
    proc.kill;
  } catch (err: any) {
    console.log(`Failed with code ${err.exitCode}`);
    console.log(err.stdout.toString());
  }
}
