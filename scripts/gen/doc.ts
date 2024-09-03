import { dirname } from "jsr:@std/path/dirname";
import { exec } from "node:child_process";
import { promisify } from "node:util";
import { getFiles, denoPattern, runtimeMapper, isYarn, isPnpm } from "../utils.ts";
import { Output } from "../types.ts";
import { Agent } from "../types.ts";

const exca = promisify(exec);
const getCmd = async (agent: Agent, cwd: string, cmd: { doc: string }) => `${agent === 'node' ? await isPnpm(cwd) ? 'pnpm run' : await isYarn(cwd) ? 'yarn run' : 'npm run' : agent} ${cmd?.doc || 'doc'}`

for await (const file of await getFiles(denoPattern)) {
    const { name, path } = file;
    const { agent, cmd = { doc: 'doc' } } = runtimeMapper[name]
    const cwd = dirname(path)

    let outputs: Output[] = []
    if (typeof agent === 'string') {
        const $cmd = await getCmd(agent, cwd, cmd)
        const { stderr, stdout } = await exca($cmd, {
            cwd,
        });
        outputs.push({
            stderr,
            stdout
        })
    } else {
        outputs = await Promise.all(agent.map(async (ag) => {
            const $cmd = await getCmd(ag, cwd, cmd)
            if (path.includes(ag)) {
                const { stderr, stdout } = await exca($cmd, {
                    cwd,
                });
                return { stderr, stdout }
            } else {
                return {
                    stderr: '',
                    stdout: ''
                }
            }
        }))
    }

    outputs
        .filter(i => i.stderr && i.stdout)
        .map(({ stdout, stderr }) => {
            if (stdout) console.log("stdout:", stdout);
            if (stderr && !stderr.includes('$')) console.error("stderr:", stderr);
        })
}
