import sharp from 'sharp';
import { resolve } from 'node:path';
import { stat } from 'node:fs/promises';

const publicDir = resolve('public');
const work = [];
for (const { name, widths } of [
  { name: 'pathfinder', widths: [640, 960, 1448] },
  { name: 'team', widths: [640, 1040, 1672] },
]) {
  for (const width of widths) {
    work.push(
      sharp(resolve(publicDir, `${name}.png`))
        .resize({ width })
        .webp({ quality: 82, effort: 6 })
        .toFile(resolve(publicDir, `${name}-${width}.webp`)),
    );
  }
}
work.push(
  sharp(resolve(publicDir, 'potomac-logo.png'))
    .resize(240, 240)
    .webp({ lossless: true })
    .toFile(resolve(publicDir, 'potomac-logo.webp')),
);
work.push(
  sharp(resolve(publicDir, 'potomac-logo.png'))
    .trim()
    .resize(64, 64, { fit: 'contain', background: '#000000' })
    .png()
    .toFile(resolve(publicDir, 'favicon.png')),
);
await Promise.all(work);
for (const name of [
  'pathfinder-640.webp',
  'pathfinder-1448.webp',
  'team-1040.webp',
  'potomac-logo.webp',
  'favicon.png',
]) {
  console.log(name, (await stat(resolve(publicDir, name))).size);
}
