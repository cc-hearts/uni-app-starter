import { vue, typescript } from '@cc-heart/eslint-config'

export default [
  ...vue({ typescript: true}),
  ...typescript()
]