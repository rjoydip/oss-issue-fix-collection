import { dirname } from "@std/path/dirname";
import { installDependencies } from "npm:nypm";
import { getFiles, installPattern, packageMapper } from "../utils.ts";

for await (const file of await getFiles(installPattern)) {
  const { agent } = packageMapper[file.name];
  await installDependencies({
    cwd: dirname(file.path),
    packageManager: agent,
    silent: false,
  });
}
console.log("\n%c>> Complement all installation", "color:#C68FE6");
