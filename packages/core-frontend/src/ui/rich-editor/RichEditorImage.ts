import { mergeAttributes } from '@tiptap/core'
import Image from '@tiptap/extension-image'
import type { ImageMode } from './richEditorTypes'

export const RichEditorImage = Image.extend({
  name: 'image',

  addAttributes() {
    return {
      ...(this.parent?.() ?? {}),
      imageMode: {
        default: 'blockFullWidth',
        parseHTML: (element) =>
          element.getAttribute('data-image-mode') ||
          element.parentElement?.getAttribute('data-image-mode') ||
          'blockFullWidth',
      },
      caption: {
        default: null,
        parseHTML: (element) => {
          const fromDataAttr = element.getAttribute('data-image-caption')?.trim()
          if (fromDataAttr) return fromDataAttr
          const fromFigureCaption = element.parentElement
            ?.querySelector('figcaption')
            ?.textContent?.trim()
          return fromFigureCaption || null
        },
        renderHTML: (attributes) => {
          const caption = (attributes.caption as string | null | undefined)?.trim()
          return caption ? { 'data-image-caption': caption } : {}
        },
      },
    }
  },

  renderHTML({ node, HTMLAttributes }) {
    const imageMode = (node.attrs.imageMode as ImageMode | undefined) ?? 'blockFullWidth'
    const textAlign = node.attrs.textAlign as string | null | undefined
    const caption = (node.attrs.caption as string | null | undefined)?.trim()
    const merged = mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
      'data-image-mode': imageMode,
      'data-text-align': textAlign || 'left',
      class: ['RichEditor-image', `RichEditor-imageMode-${imageMode}`].join(' '),
    })

    if ('textAlign' in merged) {
      delete (merged as Record<string, unknown>).textAlign
    }

    const imageMarkup: [string, Record<string, unknown>] = ['img', merged]

    if (imageMode === 'inlineWithText') {
      if (!caption) return imageMarkup
      return [
        'span',
        {
          class: 'RichEditor-imageInlineWrap',
          'data-text-align': textAlign || 'left',
        },
        imageMarkup,
        [
          'span',
          {
            class: 'RichEditor-imageCaption RichEditor-imageCaptionInline',
          },
          caption,
        ],
      ]
    }

    const figureMarkup: [string, Record<string, unknown>, ...unknown[]] = [
      'figure',
      {
        class: 'RichEditor-imageAlign',
        'data-text-align': textAlign || 'left',
        'data-image-mode': imageMode,
        style: textAlign ? `text-align: ${textAlign}` : undefined,
      },
      imageMarkup,
    ]

    if (caption) {
      figureMarkup.push([
        'figcaption',
        {
          class: 'RichEditor-imageCaption',
        },
        caption,
      ])
    }

    return figureMarkup
  },

  parseHTML() {
    return [
      {
        tag: 'span.RichEditor-imageInlineWrap img[src]',
        priority: 65,
        getAttrs: (element) => {
          const src = element.getAttribute('src')
          if (!src) return false
          const parent = element.parentElement
          return {
            src,
            alt: element.getAttribute('alt'),
            title: element.getAttribute('title'),
            width: element.getAttribute('width'),
            height: element.getAttribute('height'),
            textAlign: parent?.getAttribute('data-text-align') || 'left',
            imageMode: element.getAttribute('data-image-mode') || 'inlineWithText',
            caption:
              element.getAttribute('data-image-caption') ||
              parent?.querySelector('.RichEditor-imageCaptionInline')?.textContent?.trim() ||
              null,
          }
        },
      },
      {
        tag: 'figure.RichEditor-imageAlign img[src]',
        priority: 60,
        getAttrs: (element) => {
          const src = element.getAttribute('src')
          if (!src) return false
          const parent = element.parentElement
          return {
            src,
            alt: element.getAttribute('alt'),
            title: element.getAttribute('title'),
            width: element.getAttribute('width'),
            height: element.getAttribute('height'),
            textAlign:
              parent?.getAttribute('data-text-align') ||
              parent?.style?.textAlign ||
              'left',
            imageMode:
              parent?.getAttribute('data-image-mode') ||
              element.getAttribute('data-image-mode') ||
              'blockFullWidth',
            caption:
              element.getAttribute('data-image-caption') ||
              parent?.querySelector('figcaption')?.textContent?.trim() ||
              null,
          }
        },
      },
      {
        tag: 'div.RichEditor-imageAlign img[src]',
        priority: 60,
        getAttrs: (element) => {
          const src = element.getAttribute('src')
          if (!src) return false
          const parent = element.parentElement
          return {
            src,
            alt: element.getAttribute('alt'),
            title: element.getAttribute('title'),
            width: element.getAttribute('width'),
            height: element.getAttribute('height'),
            textAlign:
              parent?.getAttribute('data-text-align') ||
              parent?.style?.textAlign ||
              'left',
            imageMode:
              parent?.getAttribute('data-image-mode') ||
              element.getAttribute('data-image-mode') ||
              'blockFullWidth',
            caption:
              element.getAttribute('data-image-caption') ||
              parent?.querySelector('figcaption')?.textContent?.trim() ||
              null,
          }
        },
      },
      {
        tag: 'img[src]',
        getAttrs: (element) => ({
          src: element.getAttribute('src'),
          alt: element.getAttribute('alt'),
          title: element.getAttribute('title'),
          width: element.getAttribute('width'),
          height: element.getAttribute('height'),
          imageMode: element.getAttribute('data-image-mode') || 'inlineWithText',
          textAlign: 'left',
          caption: element.getAttribute('data-image-caption') || null,
        }),
      },
    ]
  },
})
