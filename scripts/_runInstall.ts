import { dirname } from "@std/path/dirname";
import { installDependencies } from 'npm:nypm'
import { getFiles, installPattern, mapper } from "./utils.ts";

for await (const file of await getFiles(installPattern)
) {
    const { agent } = mapper[file.name]
    await installDependencies({
        cwd: dirname(file.path),
        packageManager: agent,
        silent: false
    })
}
