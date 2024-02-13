export {}

declare module 'vue' {
  type Hooks = App.AppInstance & Page.PageInstance
  interface ComponentCustomOptions extends Hooks {}
}

declare global {
  export const process = {
    env: {
      NODE_ENV: string,
      UNI_MODES: string,
    },
  }
}
