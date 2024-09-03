export type PackageMapper = {
    [key: string]: {
        agent: "bun" | "npm" | "pnpm" | "yarn";
    };
};

export type Agent = "bun" | "node" | "deno"

export type Output = {
    stdout?: string,
    stderr?: string
}

export type RuntimeMapper = {
    [key: string]: {
        agent: Agent[] | Agent;
        cmd?: {
            check: string,
            doc: string,
            fmt: string,
            lint: string
        }
    };
}
