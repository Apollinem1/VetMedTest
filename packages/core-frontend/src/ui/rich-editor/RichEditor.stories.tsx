import type { JSONContent } from '@tiptap/core'
import type { Meta, StoryObj } from '@storybook/react'
import { createServer } from 'miragejs'
import { RichEditor } from './RichEditor'
import type {
  AttachmentViewModel,
  RenderAttachment,
  UploadFile,
  UploadImageFile,
  UploadImageUrl,
} from './richEditorTypes'

let mirageServerStarted = false

function ensureMirageServer() {
  if (mirageServerStarted || typeof window === 'undefined') {
    return
  }

  createServer({
    environment: 'development',
    routes() {
      this.namespace = 'mock-api'

      this.post('/upload/image', () => {
        return { ok: true }
      })

      this.post('/upload/image-url', (_schema, request) => {
        const payload = JSON.parse(request.requestBody || '{}') as { url?: string }
        return {
          ok: true,
          url: payload.url || '',
        }
      })

      this.post('/upload/file', () => {
        return { ok: true }
      })
    },
  })

  mirageServerStarted = true
}

const uploadImageFileMock: UploadImageFile = async (file) => {
  ensureMirageServer()
  await fetch('/mock-api/upload/image', {
    method: 'POST',
    body: JSON.stringify({ name: file.name, type: file.type }),
    headers: { 'Content-Type': 'application/json' },
  })
  return {
    url: URL.createObjectURL(file),
    alt: file.name,
    title: file.name,
  }
}

const uploadImageUrlMock: UploadImageUrl = async (sourceUrl) => {
  ensureMirageServer()
  const response = await fetch('/mock-api/upload/image-url', {
    method: 'POST',
    body: JSON.stringify({ url: sourceUrl }),
    headers: { 'Content-Type': 'application/json' },
  })
  const payload = (await response.json()) as { url?: string }
  return {
    url: payload.url || sourceUrl,
    alt: 'image',
    title: 'image',
  }
}

const uploadFileMock: UploadFile = async (file) => {
  ensureMirageServer()
  await fetch('/mock-api/upload/file', {
    method: 'POST',
    body: JSON.stringify({ name: file.name, type: file.type, size: file.size }),
    headers: { 'Content-Type': 'application/json' },
  })
  return {
    url: URL.createObjectURL(file),
    name: file.name,
    mimeType: file.type,
    size: file.size,
  }
}

const attachmentCardRenderer: RenderAttachment = (
  attachment: AttachmentViewModel,
  helpers: { defaultContent: () => JSONContent },
) => {
  const fallbackContent = helpers.defaultContent()
  return {
    type: 'paragraph',
    content: [
      {
        type: 'text',
        text: 'Файл: ',
      },
      ...(fallbackContent.content ?? []),
      {
        type: 'text',
        text: attachment.size ? ` (${Math.ceil(attachment.size / 1024)} KB)` : '',
      },
    ],
  }
}

const meta: Meta<typeof RichEditor> = {
  title: 'Core/UI/RichEditor',
  component: RichEditor,
  tags: ['autodocs'],
  args: {
    uploadImageFile: uploadImageFileMock,
    uploadImageUrl: uploadImageUrlMock,
    uploadFile: uploadFileMock,
  },
}

export default meta

type Story = StoryObj<typeof RichEditor>

export const Default: Story = {
  render: (args) => (
    <div className="w-full max-w-[1920px] bg-background p-4">
      <RichEditor
        {...args}
        defaultContent="<p>Выделите текст и используйте панель или горячие клавиши (например, Ctrl+B).</p>"
      />
    </div>
  ),
}

export const InlineImageMode: Story = {
  render: (args) => (
    <div className="w-full max-w-[1440px] bg-background p-4">
      <RichEditor
        {...args}
        imageDefaultMode="inlineWithText"
        defaultContent="<p>В этом режиме картинка может жить внутри строки, рядом с текстом.</p>"
      />
    </div>
  ),
}

export const WithCustomAttachmentRender: Story = {
  render: (args) => (
    <div className="w-full max-w-[1920px] rounded-lg bg-background p-6">
      <RichEditor
        {...args}
        renderAttachment={attachmentCardRenderer}
        defaultContent="<p>Вставьте PDF/DOCX, чтобы увидеть кастомный рендер вложения.</p>"
      />
    </div>
  ),
}
