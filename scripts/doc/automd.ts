import { parseArgs } from "jsr:@std/cli/parse-args"
import { join } from "@std/path/join";
import { existsSync } from "@std/fs/exists";
import { appsNS, getRoot, isCI } from "../utils.ts";
import { SEPARATOR } from "@std/path/constants";

const isCi = isCI()
const root = getRoot()

const flags = parseArgs(Deno.args, {
    boolean: ["help"],
    string: ["app", 'provider', 'pm', 'runtime', 'issue', 'problem'],
    default: { app: 'xxxx', provider: 'github', pm: 'npm', runtime: 'node', issue: 'xxxx', problem: 'xxxx' },
});

if (flags.help) {
    console.log(`
        Automd: Automatically generate markdown file

        Usage: deno run scripts/doc/automd.ts [OPTIONS] ..

        Options:
            app         Application Name    --app=xxxx
            provider    Provider Name       --provider=xxxx
            pm          Package manager     --pm=npm|pnpm|yarn|bunx
            runtime     Runtime             --runtim=node|bun|deno
            issue       Issuer number       --issue=xxxx
            problem     problem number      --problem=xxxx
    `)
}

const app = flags["app"]
const provider = flags["provider"]
const runtime = flags["runtime"]
const issueNumber = flags["issue"]
const problemNumber = flags["problem"]
const packageManager = flags["pm"]
const path = join(isCi ? Deno.makeTempDirSync() : join(root, appsNS), app, provider, `runtime-${runtime}`, issueNumber ?? problemNumber)

if (!existsSync(path)) {
    await Deno.mkdir(path, { recursive: true })
}

const data = await Deno.readFile(join(root, 'templates', 'readme.tmpl.md'));

const replacedData = new TextDecoder("utf-8").decode(data)
    .replaceAll("{{issueNumber}}", issueNumber ?? problemNumber)
    .replaceAll("{{appName}}", app)
    .replaceAll("{{appPath}}", path.replace(root, '').replaceAll(SEPARATOR, '/'))
    .replaceAll("{{provider}}", provider)
    .replaceAll("{{packageManager}}", packageManager)

await Deno.writeFile(join(path, 'readme.md'), new TextEncoder().encode(`${replacedData}\n`))

if (isCi) {
    const { assertEquals } = await import('jsr:@std/assert')
    const isExists = existsSync(join(path, 'readme.md'))
    assertEquals(isExists, true)
    console.log("\n%c>> Validate readme file generated", "color:#C68FE6");
    await Deno.remove(join(path, 'readme.md'))
} else {
    console.log("\n%c>> Readme file generated", "color:#C68FE6");
}