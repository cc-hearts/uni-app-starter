export interface RouterPluginOptions {
  guard?: (from: Page.PageInstance<AnyObject, object> | null, to: Page.PageInstance<AnyObject, object>) => void
}
