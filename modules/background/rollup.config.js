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
      }),
    ],
  };
}

export default [getConfig('cjs'), getConfig('es')];
