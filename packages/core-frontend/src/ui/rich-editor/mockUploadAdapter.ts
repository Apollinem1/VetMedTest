import type {
  UploadFile,
  UploadedFile,
  UploadImageFile,
  UploadedImage,
  UploadImageUrl,
} from './richEditorTypes'
import { fileNameFromUrl } from './imageUtils'

async function fetchAsBlob(sourceUrl: string): Promise<Blob> {
  const response = await fetch(sourceUrl)
  if (!response.ok) {
    throw new Error(`Mock upload failed: ${response.status}`)
  }
  return response.blob()
}

export const mockUploadImageFile: UploadImageFile = async (file) => {
  return {
    url: URL.createObjectURL(file),
    alt: file.name,
    title: file.name,
  }
}

export const mockUploadImageUrl: UploadImageUrl = async (sourceUrl) => {
  try {
    const blob = await fetchAsBlob(sourceUrl)
    const fileName = fileNameFromUrl(sourceUrl)
    return {
      url: URL.createObjectURL(blob),
      alt: fileName,
      title: fileName,
    }
  } catch {
    return {
      url: sourceUrl,
      alt: fileNameFromUrl(sourceUrl),
      title: fileNameFromUrl(sourceUrl),
    }
  }
}

export const mockUploadFile: UploadFile = async (file) => {
  const uploaded: UploadedFile = {
    url: URL.createObjectURL(file),
    name: file.name,
    mimeType: file.type || undefined,
    size: file.size || undefined,
  }
  return uploaded
}

export function resolveUploadHandlers(handlers: {
  uploadImageFile?: UploadImageFile
  uploadImageUrl?: UploadImageUrl
  uploadFile?: UploadFile
}) {
  return {
    uploadImageFile: handlers.uploadImageFile ?? mockUploadImageFile,
    uploadImageUrl: handlers.uploadImageUrl ?? mockUploadImageUrl,
    uploadFile: handlers.uploadFile ?? mockUploadFile,
  }
}
