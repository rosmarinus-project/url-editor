import { select } from '@inquirer/prompts';
import semver from 'semver';
import * as fse from 'fs-extra';

const enum VersionMode {
  major = 'major',
  minor = 'minor',
  patch = 'patch',
}

export async function changeVersion() {
  const version = await select({
    message: 'select version: ',
    choices: [{ value: VersionMode.major }, { value: VersionMode.minor }, { value: VersionMode.patch }],
  });

  const manifestContent = await fse.readJson('manifest.json');
  const nowVersion = manifestContent.version;
  const nextVersion = semver.inc(nowVersion, version);

  manifestContent.version = nextVersion;
  await fse.writeJson('manifest.json', manifestContent, { spaces: 2 });
  const packageJsonContent = await fse.readJson('package.json');

  packageJsonContent.version = nextVersion;
  await fse.writeJson('package.json', packageJsonContent, { spaces: 2 });
}
