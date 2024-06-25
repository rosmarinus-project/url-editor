import { execSync } from 'child_process';
import * as fse from 'fs-extra';

export async function pushTag() {
  const manifestContent = await fse.readJson('manifest.json');
  const nowVersion = manifestContent.version;

  execSync('git add .', { stdio: 'inherit' });
  execSync(`git commit -m "chore: bump version to ${nowVersion}"`, { stdio: 'inherit' });
  execSync(`git tag "v${nowVersion}"`, { stdio: 'inherit' });
  execSync('git push', { stdio: 'inherit' });
  execSync(`git push origin "v${nowVersion}"`, { stdio: 'inherit' });
}
