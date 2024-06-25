import archiver from 'archiver';
import * as fse from 'fs-extra';
import type { TaskFunction } from 'gulp';

const TARGET_DIR = 'zip';
const SOURCE_DIR = 'dist';
const TARGET_FILE = 'chrome.zip';

export const zipDist: TaskFunction = async (done) => {
  if (fse.existsSync(SOURCE_DIR)) {
    await fse.ensureDir(TARGET_DIR);
    await fse.remove(`${TARGET_DIR}/${TARGET_FILE}`);
    done();

    return new Promise<void>((resolve) => {
      const output = fse.createWriteStream(`${TARGET_DIR}/${TARGET_FILE}`);
      const archive = archiver('zip', {
        zlib: { level: 9 },
      });

      archive.on('error', (err) => {
        throw err;
      });
      output.on('end', () => {
        resolve();
      });

      archive.pipe(output);
      archive.directory(SOURCE_DIR, false);
      archive.finalize();
    });
  }

  done();
};
