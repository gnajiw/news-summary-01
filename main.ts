import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

// Generates world news summary for 11 November 2026 into /output/entry.txt
function execute(): void {
  const source = fileURLToPath(new URL('./summary.txt', import.meta.url));
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
  const target = join(outDir, 'entry.txt');
  mkdirSync(dirname(target), { recursive: true });
  copyFileSync(source, target);
  const data = readFileSync(target, 'utf-8');
  if (data.length < 1 || data.length > 2000) {
    throw new Error(`Summary character length ${data.length} is outside allowed [1, 2000] range`);
  }
}

execute();
