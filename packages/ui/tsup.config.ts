import { defineConfig } from "tsup";
import type { Options } from "tsup";

export default defineConfig((options: Options) => ({
    entry: ["src/index.ts"],
    format: ["cjs", "esm"],
    clean: true,
    external: ["react"],
    onSuccess: "tsc --project tsconfig-typedefs.json --emitDeclarationOnly --declaration",
    ...options,
}));
