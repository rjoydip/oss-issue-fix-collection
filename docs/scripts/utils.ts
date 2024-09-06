import { dirname, resolve } from "@std/path";
import { up } from 'npm:empathic/find';

export const appsNS = 'apps'
export const getRoot = () => {
    const cwd = resolve(Deno.cwd())
    return dirname(up("LICENSE", { cwd }) || cwd)
}