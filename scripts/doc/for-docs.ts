import { join } from "@std/path";
import { existsSync } from "@std/fs/exists";
import { parse } from "@std/path/parse";
import remarkFrontmatter from "npm:remark-frontmatter";
import remarkToc from "npm:remark-toc";
import { remark } from "npm:remark";
import { read } from "npm:to-vfile";
import { visit } from "npm:unist-util-visit";
import { appsNS, docPath, getFiles, getRoot, globMdPattern } from "../utils.ts";

const root = getRoot();
const _docPath = join(root, docPath)
if(existsSync(_docPath)) await Deno.remove(_docPath, { recursive: true });

for await (
  const file of await getFiles(globMdPattern, {
    root,
    includeDirs: false,
    exclude: ["**/docs/doc", "templates"],
  })
) {
  const { path } = file;

  // Copy readme to docs
  const { dir } = parse(path);
  const distDir = !dir.includes(appsNS)
    ? join(root, docPath)
    : dir.replace(appsNS, join(docPath, appsNS));
  if (!existsSync(distDir)) await Deno.mkdir(distDir, { recursive: true });
  await Deno.copyFile(path, join(distDir, "index.md"));

  // Refactor
  const mdfile = await remark()
    .use(remarkToc)
    .use(remarkFrontmatter, ["yaml"])
    .use(() => {
      // deno-lint-ignore no-explicit-any
      return (tree: any) => {
        visit(tree, "yaml", (node) => {
          node.value = node.value.replace(
            "layout: ''",
            "layout: 'layouts/apps.vto'",
          );
          return node;
        });
        return tree;
      };
    })
    .process(await read(join(distDir, "index.md")));

  const encoder = new TextEncoder();
  const data = encoder.encode(String(mdfile));
  await Deno.writeFile(join(distDir, "index.md"), data, {
    create: false,
    append: false,
  });
}

console.log("\n%c>> Readme for docs", "color:#C68FE6");
