import { chmodSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE: string =
  "You will spend four hours finding the bug, four minutes fixing it, and four years explaining why it was there.";

const MAX_CHARS = 120;

const chars: number = Array.from(LINE).length;
if (chars < 1 || chars > MAX_CHARS) {
  throw new Error(`entry must be 1..${MAX_CHARS} characters, got ${chars}`);
}
if (LINE.trim().length === 0) {
  throw new Error("entry must not be only white space");
}

const outputDir: string = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outputDir, { recursive: true, mode: 0o755 });

const outputPath: string = join(outputDir, "entry.txt");
writeFileSync(outputPath, LINE + "\n", { encoding: "utf8" });
chmodSync(outputPath, 0o644);

console.log(`wrote ${outputPath}`);
console.log(`chars: ${chars}`);
