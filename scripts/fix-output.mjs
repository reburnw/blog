import { readdir, rename, rm } from 'node:fs/promises';
import { join } from 'node:path';

async function collapseHtmlDirectories(dir) {
  const entries = await readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const path = join(dir, entry.name);

    if (!entry.isDirectory()) {
      continue;
    }

    if (entry.name.endsWith('.html')) {
      const tempPath = `${path}.tmp`;
      await rename(join(path, 'index.html'), tempPath);
      await rm(path, { recursive: true, force: true });
      await rename(tempPath, path);
      continue;
    }

    await collapseHtmlDirectories(path);
  }
}

await collapseHtmlDirectories('dist');
