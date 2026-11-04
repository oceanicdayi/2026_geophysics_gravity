import { cpSync, rmSync } from "node:fs";

rmSync("assets", { recursive: true, force: true });
cpSync("dist/index.html", "index.html");
cpSync("dist/favicon.svg", "favicon.svg");
cpSync("dist/.nojekyll", ".nojekyll");
cpSync("dist/assets", "assets", { recursive: true });
