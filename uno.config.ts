// uno.config.ts
import { defineConfig, presetAttributify, presetUno } from 'unocss'
import presetWeapp from 'unocss-preset-weapp'
import { extractorAttributify, transformerClass, defaultRules } from 'unocss-preset-weapp/transformer'

const { presetWeappAttributify, transformerAttributify } = extractorAttributify()

/**
 * 目前插件的动态类名支持 :class="[1 === 1 ? "m-b-2.5" : "m-p-2"]" 以及 :class="{"m-b-2.5": true}" 这两种写法
 * 直接使用 :class"'m-b-3.6'" 不会生效
 */
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
  const transformRules = {
    ...defaultRules,
  }

  config = {
    presets: [
      // @ts-expect-error: no
      presetWeappAttributify(),
      // @ts-expect-error: no
      presetWeapp({
        isH5: false,
        platform: 'uniapp',
        whRpx: false,
        transformRules,
      }),
      // ...custom presets
    ],
    transformers: [
      // https://github.com/MellowCo/unocss-preset-weapp/tree/main/src/transformer/transformerAttributify
      transformerAttributify(),
      // https://github.com/MellowCo/unocss-preset-weapp/tree/main/src/transformer/transformerClass
      transformerClass({ transformRules }),
    ],
  }
}
export default defineConfig(config)
