import { docsPattern, getFiles, getRoot } from "../utils.ts";

for await (
  const dir of await getFiles(docsPattern, {
    root: getRoot(),
    exclude: ["_site", "scripts/doc"],
    includeDirs: true,
  })
) {
  await Deno.remove(dir.path, { recursive: true });
}

console.log("\n%c>> Deleted all docs folders", "color:#C68FE6");
