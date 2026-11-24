import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const { packages } = JSON.parse(readFileSync('package-lock.json', 'utf8'));
const sections = [
  'Zenthyr documentation site',
  readFileSync('LICENSE', 'utf8').trim(),
  'License and notice files from installed site dependencies',
];

for (const [path, metadata] of Object.entries(packages)) {
  if (!path.startsWith('node_modules/') || metadata.dev) continue;

  let entries;
  try {
    entries = readdirSync(path, { withFileTypes: true });
  } catch (error) {
    if (error.code === 'ENOENT' && metadata.optional) continue;
    throw error;
  }

  const name = path.split('node_modules/').at(-1);
  for (const entry of entries) {
    if (!/^(licen[cs]e|notice|copying)([.-]|$)/i.test(entry.name)) continue;
    const files = entry.isDirectory()
      ? readdirSync(join(path, entry.name), { withFileTypes: true })
          .filter(file => file.isFile())
          .map(file => join(entry.name, file.name))
      : [entry.name];
    for (const file of files) {
      const license = readFileSync(join(path, file), 'utf8').trim();
      sections.push(`--- ${name} ${metadata.version} / ${file} ---\n\n${license}`);
    }
  }
}

writeFileSync('dist/third-party-notices.txt', sections.join('\n\n') + '\n');
