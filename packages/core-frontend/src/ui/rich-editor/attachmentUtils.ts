import type { Editor, JSONContent } from '@tiptap/core'
import { isImageFile } from './imageUtils'
import type {
  AttachmentViewModel,
  ImageMode,
  RenderAttachment,
  UploadFile,
  UploadImageFile,
  UploadedImage,
} from './richEditorTypes'

const ALLOWED_DOC_MIMES = new Set([
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'application/rtf',
  'text/rtf',
  'application/vnd.ms-excel',
  'application/vnd.ms-powerpoint',
  'application/vnd.oasis.opendocument.text',
  'application/vnd.oasis.opendocument.spreadsheet',
  'application/vnd.oasis.opendocument.presentation',
])

const DOC_EXTENSIONS =
  /\.(pdf|doc|docx|rtf|ppt|pptx|ppsx|xls|xlsx|xlsm|odt|ods|odp)$/i

export const RICH_EDITOR_FILE_ACCEPT = ['image/*', ...ALLOWED_DOC_MIMES].join(',')

export function isAllowedAttachmentFile(file: File): boolean {
  if (isImageFile(file)) return true
  if (file.type && ALLOWED_DOC_MIMES.has(file.type)) return true
  return DOC_EXTENSIONS.test(file.name)
}

function defaultAttachmentContent(attachment: AttachmentViewModel): JSONContent {
  return {
    type: 'paragraph',
    content: [
      {
        type: 'text',
        text: attachment.name,
        marks: [
          {
            type: 'link',
            attrs: {
              href: attachment.url,
              target: '_blank',
              rel: 'noopener noreferrer',
              class: 'RichEditor-link RichEditor-fileLink',
              title: attachment.url,
            },
          },
        ],
      },
    ],
  }
}

function toImageNode(image: UploadedImage, fallbackName: string, mode: ImageMode): JSONContent {
  return {
    type: 'image',
    attrs: {
      src: image.url,
      alt: image.alt ?? fallbackName,
      title: image.title ?? fallbackName,
      imageMode: mode,
    },
  }
}

type InsertAttachmentsOptions = {
  editor: Editor
  files: File[]
  insertAt: number
  imageMode: ImageMode
  uploadImageFile: UploadImageFile
  uploadFile: UploadFile
  renderAttachment?: RenderAttachment
}

export async function insertAttachmentFiles(options: InsertAttachmentsOptions): Promise<void> {
  const acceptedFiles = options.files.filter(isAllowedAttachmentFile)
  if (!acceptedFiles.length) return

  const contentNodes: JSONContent[] = []
  for (const file of acceptedFiles) {
    if (isImageFile(file)) {
      const uploadedImage = await options.uploadImageFile(file)
      contentNodes.push(toImageNode(uploadedImage, file.name, options.imageMode))
      continue
    }

    const uploadedFile = await options.uploadFile(file)
    const attachmentModel: AttachmentViewModel = {
      url: uploadedFile.url,
      name: uploadedFile.name || file.name,
      mimeType: uploadedFile.mimeType ?? file.type ?? undefined,
      size: uploadedFile.size ?? file.size ?? undefined,
    }
    const attachmentContent = options.renderAttachment
      ? options.renderAttachment(attachmentModel, {
          defaultContent: () => defaultAttachmentContent(attachmentModel),
        })
      : defaultAttachmentContent(attachmentModel)

    contentNodes.push(attachmentContent)
  }

  options.editor.chain().focus().insertContentAt(options.insertAt, contentNodes).run()
}
