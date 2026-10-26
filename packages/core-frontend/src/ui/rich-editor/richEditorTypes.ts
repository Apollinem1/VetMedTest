import type { JSONContent } from '@tiptap/core'

export type ImageMode = 'inlineWithText' | 'wrapText' | 'blockFullWidth'

export type UploadedImage = {
  url: string
  alt?: string
  title?: string
}

export type UploadedFile = {
  url: string
  name: string
  mimeType?: string
  size?: number
}

export type UploadImageFile = (file: File) => Promise<UploadedImage>
export type UploadImageUrl = (url: string) => Promise<UploadedImage>
export type UploadFile = (file: File) => Promise<UploadedFile>

export type AttachmentViewModel = {
  url: string
  name: string
  mimeType?: string
  size?: number
}

export type RenderAttachment = (
  attachment: AttachmentViewModel,
  helpers: { defaultContent: () => JSONContent },
) => JSONContent
