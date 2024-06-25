import { type TaskFunction, series } from 'gulp';
import { buildDist } from './build/buildDist';
import { zipDist } from './build/zip';
import { buildChangelog } from './build/changelog';
import { changeVersion } from './build/changeVersion';
import { pushTag } from './build/pushTag';

export const build: TaskFunction = series(buildDist);

export const zip: TaskFunction = series(zipDist);

export const release: TaskFunction = series(changeVersion, buildChangelog, pushTag);
