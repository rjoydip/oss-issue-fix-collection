import { expandGlob } from "jsr:@std/fs";
import { dirname } from "jsr:@std/path";
import { exec } from "node:child_process";
import { promisify } from "node:util";

const exca = promisify(exec);

for await (const file of expandGlob("**/runtime-deno/**/deno.json")) {
  const decoder = new TextDecoder("utf-8");
  const data = await Deno.readFile(file.path);
  const content = JSON.parse(decoder.decode(data).toString());
  const tasks = content["tasks"];
  if (tasks && tasks["test"]) {
    try {
      Deno.chdir(dirname(file.path));
      const { stdout, stderr } = await exca(tasks["test"]);
      if (stdout) console.log("stdout:", stdout);
      if (stderr) console.error("stderr:", stderr);
    } catch (p) {
      console.log(`Exit code: ${p.exitCode}`);
      console.log(`Error: ${p.stderr}`);
    }
  }
}
