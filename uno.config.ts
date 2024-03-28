// uno.config.ts
import { defineConfig, presetAttributify, presetUno } from 'unocss'
import presetWeapp from 'unocss-preset-weapp'
import { extractorAttributify, transformerClass } from 'unocss-preset-weapp/transformer'
const { presetWeappAttributify, transformerAttributify } = extractorAttributify()

let config = {
  presets: [
    presetAttributify({
      /* preset options */
    }),
    presetUno(),
    // ...custom presets
  ],
}
const argv = process.argv
if (argv.includes('mp-weixin')) {
  config = {
    presets: [
      // @ts-ignore
      presetWeappAttributify(),
      // @ts-ignore
      presetWeapp({
        isH5: true,
        platform: 'uniapp',
      }),
      // ...custom presets
    ],
    transformers: [
      // https://github.com/MellowCo/unocss-preset-weapp/tree/main/src/transformer/transformerAttributify
      transformerAttributify(),
      // https://github.com/MellowCo/unocss-preset-weapp/tree/main/src/transformer/transformerClass
      transformerClass(),
    ],
  }
}
export default defineConfig(config)
