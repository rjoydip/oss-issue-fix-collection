import { dirname } from "jsr:@std/path/dirname";
import { error, info } from "@std/log"
import { exec } from "node:child_process";
import { promisify } from "node:util";
import { configPattern, getFiles } from "../utils.ts";

const exca = promisify(exec);

for await (const file of await getFiles(configPattern)) {
  const decoder = new TextDecoder("utf-8");
  const data = await Deno.readFile(file.path);
  const content = JSON.parse(decoder.decode(data).toString());
  const tasks = content["tasks"] || content["scripts"];
  if (tasks && tasks["test"]) {
    Deno.chdir(dirname(file.path));
    const { stdout, stderr } = await exca(tasks["test"]);
    if (stdout) info(stdout);
    if (stderr) stderr.includes('0 fail') ? info(stderr) : error(stderr);
  }
}
console.log("%c>> Complement all test execution", "color:#C68FE6");
