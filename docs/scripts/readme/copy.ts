import { existsSync, expandGlob } from "@std/fs";
import { join, parse } from "@std/path";
import { appsNS, getRoot } from "../utils.ts";

const root = getRoot()
const docPath = join('docs', 'doc')

for await (const file of await Array.fromAsync(expandGlob("**/*.md", {
    root: join(root, appsNS),
    exclude: ["**/node_modules/**"],
    includeDirs: false
}))) {
    const { path } = file;
    const { dir } = parse(path)
    const dist = !dir.includes(appsNS) ? join(root, docPath, appsNS) : dir.replace(appsNS, join(docPath, appsNS))
    if (!existsSync(dist)) await Deno.mkdir(dist, { recursive: true })
    await Deno.copyFile(path, join(dist, 'index.md'))
}
console.log("Copied and renamed markdown file")