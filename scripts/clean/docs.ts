import { getFiles } from "../utils.ts";

for await (const dir of await getFiles("**/{apps,scripts}/**/docs", {
    root: Deno.cwd(),
    includeDirs: true,
    exclude: ["**/node_modules"]
})) {
    await Deno.remove(dir.path, { recursive: true });
}

console.log("Deleted all docs folders");