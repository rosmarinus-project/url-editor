import * as fse from 'fs-extra';
import type { TaskFunction } from 'gulp';

export const buildDist: TaskFunction = async (done) => {
  if (fse.existsSync('dist')) {
    await fse.remove('dist');
  }

  await Promise.all([
    fse.copy('manifest.json', 'dist/manifest.json'),
    fse.copy('modules/background/dist', 'dist/background/dist'),
    fse.copy('modules/popup/dist', 'dist/popup/dist'),
    fse.copy('i18n', 'dist/_locales'),
    fse.copy('assets', 'dist/assets'),
  ]);

  done();
};
