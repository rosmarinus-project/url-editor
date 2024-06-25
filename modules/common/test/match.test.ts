import { describe, beforeEach, afterEach, test, expect } from '@jest/globals';
import { match } from '../src/search/algorithms';

describe('match', () => {
  beforeEach(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.chrome = {};
  });

  afterEach(() => {});

  test('english match', () => {
    expect(
      match('bilibili', 'https://www.bilibili.com/video/BV1oh4y167SE/?spm_id_from=333.788.recommend_more_video.0')
        .isAllPieceMatch,
    ).toBe(true);
  });

  test('uppercase match', () => {
    expect(
      match('BILIBILI', 'https://www.bilibili.com/video/BV1oh4y167SE/?spm_id_from=333.788.recommend_more_video.0')
        .isAllPieceMatch,
    ).toBe(true);
  });

  test('space match', () => {
    expect(
      match('bilibili ', 'https://www.bilibili.com/video/BV1oh4y167SE/?spm_id_from=333.788.recommend_more_video.0')
        .isAllPieceMatch,
    ).toBe(true);
  });
});
