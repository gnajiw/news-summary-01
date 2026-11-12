import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

function run(): void {
  const sourcePath = fileURLToPath(new URL('./summary.txt', import.meta.url));
  const outputBase = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
  const targetPath = join(outputBase, 'entry.txt');

  mkdirSync(dirname(targetPath), { recursive: true });
  copyFileSync(sourcePath, targetPath);

  const content = readFileSync(targetPath, 'utf-8');
  if (content.length < 1 || content.length > 2000) {
    throw new Error(`Summary character length ${content.length} is outside allowed [1, 2000] range`);
  }
}

run();
