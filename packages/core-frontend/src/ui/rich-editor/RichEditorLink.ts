import { mergeAttributes } from '@tiptap/core'
import Link, { isAllowedUri } from '@tiptap/extension-link'
import { truncateUrlForTooltip } from './linkUtils'

export const RichEditorLink = Link.extend({
  renderHTML({ HTMLAttributes }) {
    const { protocols, defaultProtocol } = this.options
    const href = HTMLAttributes.href

    if (
      !this.options.isAllowedUri(href, {
        defaultValidate: (hrefCandidate) => !!isAllowedUri(hrefCandidate, protocols),
        protocols,
        defaultProtocol,
      })
    ) {
      return [
        'a',
        mergeAttributes(this.options.HTMLAttributes, { ...HTMLAttributes, href: '' }),
        0,
      ]
    }

    const hrefStr = String(href ?? '')
    const existingTitle = (HTMLAttributes.title as string | undefined)?.trim()
    const title =
      existingTitle || (hrefStr ? truncateUrlForTooltip(hrefStr) : undefined)

    return [
      'a',
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        ...(title ? { title } : {}),
      }),
      0,
    ]
  },
})
