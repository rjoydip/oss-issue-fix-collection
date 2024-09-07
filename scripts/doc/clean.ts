import { getFiles, getRoot } from "../utils.ts";

for await (const dir of await getFiles("**/{apps,scripts,docs}/**/{docs,doc}", {
    root: getRoot(),
    exclude: ["_site"],
    includeDirs: true
})) {
    await Deno.remove(dir.path, { recursive: true });
}

console.log("\n%c>> Deleted all docs folders", "color:#C68FE6")