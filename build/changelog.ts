import { Writable } from 'stream';
import conventionalChangelog from 'conventional-changelog';
import * as fse from 'fs-extra';

export async function buildChangelog() {
  const content = await getContent();

  const nowContent = await fse.readFile('CHANGELOG.md', 'utf-8');
  const newContent = content + nowContent;

  await fse.writeFile('CHANGELOG.md', newContent);
}

async function getContent() {
  return new Promise<string>((resolve) => {
    let content = '';
    const writableStream = new Writable({
      write(chunk, encoding, callback) {
        content += chunk.toString();
        callback();
      },
    });

    const fileStream = conventionalChangelog({}).pipe(writableStream);

    fileStream.on('close', () => resolve(content));
  });
}
