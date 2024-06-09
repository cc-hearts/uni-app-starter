import { reactive } from 'vue'

const cssNamespace = 'cc'

export const cssToken = reactive({
  // TODO: Tokens
  [`${cssNamespace}GlobalBg`]: '#f5f7f9',
})

type CssVariableType<P extends string, T> = T extends `${P}${infer r}` ? r : never

export const useToken = (cssVariableList: Array<CssVariableType<typeof cssNamespace, keyof typeof cssToken>>) => {
  return cssVariableList.reduce((acc, cssName) => {
    const val = cssToken[`${cssNamespace}${cssName}`]

    if (!val) {
      console.warn(`[${cssName}}] Invalid css variable`)
    }

    acc[`--${cssNamespace}-${cssName}`] = val
    return acc
  }, {})
}
