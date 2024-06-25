import common from '@rosmarinus/common-plugins';

const external = [];

function getConfig(format) {
  return {
    input: 'src/index.ts',
    output: {
      file: `dist/${format}/index.js`,
      format,
      sourcemap: true,
    },
    external,
    plugins: [
      common({
        ts: { include: ['../../global.d.ts', 'src/**/*'] },
        strip: process.env.NODE_ENV === 'production',
        replace: {
          'process.env.IS_DEV': process.env.NODE_ENV === 'development' ? 'true' : 'false',
          'process.env.IS_PROD': process.env.NODE_ENV !== 'development' ? 'true' : 'false',
        },
      }),
    ],
  };
}

export default [getConfig('cjs'), getConfig('es')];
