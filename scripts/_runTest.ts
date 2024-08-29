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

async function installPackages(cmd: stirng[], dir: stirng) {
  if(!dir) throw new Error("Directory is missing");
  if(!cmd) throw new Error("Install command is missing");
  
  const proc = spawn(cmd, {
    cwd: dir.replaceAll("\\", sep),
  });
  const output = await new Response(proc.stdout).text();
  proc.kill;
  return output
}

async function testExecution(cmd: stirng[], dir: stirng) {
  if(!dir) throw new Error("Directory is missing");
  if(!cmd) throw new Error("Test command is missing");
  
  const proc = spawn(cmd, {
    cwd: dir.replaceAll("\\", sep),
  });
  const output = await new Response(proc.stdout).text();
  proc.kill;
  return output
}

for await (const file of files) {
  const { base, dir } = parse(file);
  const { name = "node", runtime = "node" } = mapper[base];
  try {
    // Install Packages
    const installOutput = await installPackages([name, "install"],  dir);
    console.log(installOutput);
    // Execute Test
    const testOutput = await testExecution([name, "test"], dir);
    console.log(testOutput);
  } catch (err: any) {
    console.log(`Failed with code ${err.exitCode}`);
    console.log(err.stdout.toString());
  }
}
