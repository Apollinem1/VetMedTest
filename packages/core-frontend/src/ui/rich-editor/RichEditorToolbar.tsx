import type { Editor } from '@tiptap/core'
import {
  ArrowUturnCcwLeft,
  ArrowUturnCwRight,
  Bold,
  Italic,
  LetterAUnderline,
  ListOl,
  ListUl,
  Paintbrush,
  QuoteOpen,
  Strikethrough,
  TextAlignCenter,
  TextAlignJustify,
  TextAlignLeft,
  TextAlignRight,
  Underline,
} from '@gravity-ui/icons'
import { Separator, Toolbar } from '@heroui/react'
import type { ImageMode } from './richEditorTypes'
import { FONT_SIZES } from './constants'
import { AttachmentFileButton } from './components/AttachmentFileButton'
import { ColorPopoverControl } from './components/ColorPopoverControl'
import { ImageCaptionPopoverControl } from './components/ImageCaptionPopoverControl'
import { ImageUrlPopoverControl } from './components/ImageUrlPopoverControl'
import { LinkPopoverControl } from './components/LinkPopoverControl'
import { ToolbarButton } from './components/ToolbarButton'
import { VideoUrlPopoverControl } from './components/VideoUrlPopoverControl'
import { richEditorStyles } from './richEditorStyles'

type RichEditorToolbarProps = {
  editor: Editor
  currentAlign: string
  currentColor?: string
  currentFontSize?: string
  currentImageMode?: ImageMode
  textColor: string
  highlightColor: string
  recentTextColors: string[]
  onRecentTextColorsChange: (colors: string[]) => void
  recentHighlightColors: string[]
  onRecentHighlightColorsChange: (colors: string[]) => void
  onTextColorChange: (value: string) => void
  onHighlightColorChange: (value: string) => void
  onInsertFiles: (files: File[], insertAt: number) => Promise<void>
  onInsertImageByUrl: (url: string) => Promise<void>
  onInsertVideoByUrl: (url: string) => Promise<void>
}

export function RichEditorToolbar({
  editor,
  currentAlign,
  currentColor,
  currentFontSize,
  currentImageMode,
  textColor,
  highlightColor,
  recentTextColors,
  onRecentTextColorsChange,
  recentHighlightColors,
  onRecentHighlightColorsChange,
  onTextColorChange,
  onHighlightColorChange,
  onInsertFiles,
  onInsertImageByUrl,
  onInsertVideoByUrl,
}: RichEditorToolbarProps) {
  const chain = () => editor.chain().focus()
  const imageMode = currentImageMode ?? 'blockFullWidth'
  const isImageActive = editor.isActive('image')
  const isVideoActive = editor.isActive('youtube')

  return (
    <Toolbar aria-label="Форматирование текста" className={richEditorStyles.toolbar}>
      <div className={richEditorStyles.section}>
        <div className={richEditorStyles.buttonGroup}>
          <ToolbarButton
            onPress={() => chain().toggleBold().run()}
            disabled={!editor.can().toggleBold()}
            active={editor.isActive('bold')}
            iconOnly
            label="Жирный"
          >
            <Bold />
          </ToolbarButton>
          <ToolbarButton
            onPress={() => chain().toggleItalic().run()}
            disabled={!editor.can().toggleItalic()}
            active={editor.isActive('italic')}
            iconOnly
            label="Курсив"
          >
            <Italic />
          </ToolbarButton>
          <ToolbarButton
            onPress={() => chain().toggleUnderline().run()}
            disabled={!editor.can().toggleUnderline()}
            active={editor.isActive('underline')}
            iconOnly
            label="Подчёркивание"
          >
            <Underline />
          </ToolbarButton>
          <ToolbarButton
            onPress={() => chain().toggleStrike().run()}
            disabled={!editor.can().toggleStrike()}
            active={editor.isActive('strike')}
            iconOnly
            label="Зачёркивание"
          >
            <Strikethrough />
          </ToolbarButton>
        </div>
      </div>

      <Separator orientation="vertical" className={richEditorStyles.separator} />

      <div className={richEditorStyles.section}>
        <div className={richEditorStyles.buttonGroup}>
          <ToolbarButton
            onPress={() => chain().toggleHeading({ level: 1 }).run()}
            active={editor.isActive('heading', { level: 1 })}
            label="Заголовок 1"
          >
            H1
          </ToolbarButton>
          <ToolbarButton
            onPress={() => chain().toggleHeading({ level: 2 }).run()}
            active={editor.isActive('heading', { level: 2 })}
            label="Заголовок 2"
          >
            H2
          </ToolbarButton>
          <ToolbarButton
            onPress={() => chain().toggleHeading({ level: 3 }).run()}
            active={editor.isActive('heading', { level: 3 })}
            label="Заголовок 3"
          >
            H3
          </ToolbarButton>
          <ToolbarButton
            onPress={() => chain().setParagraph().run()}
            active={editor.isActive('paragraph')}
            label="Обычный текст"
          >
            P
          </ToolbarButton>
        </div>
      </div>

      <Separator orientation="vertical" className={richEditorStyles.separator} />

      <div className={richEditorStyles.section}>
        <div className={richEditorStyles.buttonGroup}>
          <ToolbarButton
            onPress={() => chain().toggleBulletList().run()}
            active={editor.isActive('bulletList')}
            iconOnly
            label="Маркированный список"
          >
            <ListUl />
          </ToolbarButton>
          <ToolbarButton
            onPress={() => chain().toggleOrderedList().run()}
            active={editor.isActive('orderedList')}
            iconOnly
            label="Нумерованный список"
          >
            <ListOl />
          </ToolbarButton>
          <ToolbarButton
            onPress={() => chain().toggleBlockquote().run()}
            active={editor.isActive('blockquote')}
            iconOnly
            label="Цитата"
          >
            <QuoteOpen />
          </ToolbarButton>
          <LinkPopoverControl editor={editor} />
          <ImageUrlPopoverControl
            isImageActive={isImageActive}
            onInsertImageUrl={onInsertImageByUrl}
          />
          <VideoUrlPopoverControl
            isVideoActive={isVideoActive}
            onInsertVideoUrl={onInsertVideoByUrl}
          />
          <ImageCaptionPopoverControl editor={editor} />
          <AttachmentFileButton
            getInsertPosition={() => editor.state.selection.from}
            onPickFiles={(files, insertAt) => onInsertFiles(files, insertAt)}
          />
        </div>
      </div>

      <Separator orientation="vertical" className={richEditorStyles.separator} />

      <div className={richEditorStyles.section}>
        <div className={richEditorStyles.buttonGroup}>
          <ToolbarButton
            onPress={() => chain().unsetTextAlign().run()}
            active={currentAlign === 'left'}
            iconOnly
            label="Выровнять по левому краю"
          >
            <TextAlignLeft />
          </ToolbarButton>
          <ToolbarButton
            onPress={() => chain().setTextAlign('center').run()}
            active={currentAlign === 'center'}
            iconOnly
            label="Выровнять по центру"
          >
            <TextAlignCenter />
          </ToolbarButton>
          <ToolbarButton
            onPress={() => chain().setTextAlign('right').run()}
            active={currentAlign === 'right'}
            iconOnly
            label="Выровнять по правому краю"
          >
            <TextAlignRight />
          </ToolbarButton>
          <ToolbarButton
            onPress={() => chain().setTextAlign('justify').run()}
            active={currentAlign === 'justify'}
            iconOnly
            label="Выровнять по ширине"
          >
            <TextAlignJustify />
          </ToolbarButton>
        </div>
      </div>

      <Separator orientation="vertical" className={richEditorStyles.separator} />

      <div className={richEditorStyles.section}>
        <div className={richEditorStyles.buttonGroup}>
          <ToolbarButton
            onPress={() =>
              chain().updateAttributes('image', { imageMode: 'inlineWithText' }).run()
            }
            active={isImageActive && imageMode === 'inlineWithText'}
            label="В тексте"
          >
            В тексте
          </ToolbarButton>
          <ToolbarButton
            onPress={() => chain().updateAttributes('image', { imageMode: 'wrapText' }).run()}
            active={isImageActive && imageMode === 'wrapText'}
            label="С обтеканием"
          >
            Обтекание
          </ToolbarButton>
          <ToolbarButton
            onPress={() =>
              chain().updateAttributes('image', { imageMode: 'blockFullWidth' }).run()
            }
            active={isImageActive && imageMode === 'blockFullWidth'}
            label="По ширине страницы"
          >
            По ширине
          </ToolbarButton>
        </div>
      </div>

      <Separator orientation="vertical" className={richEditorStyles.separator} />

      <div className={richEditorStyles.sectionTools}>
        <select
          value={currentFontSize ?? ''}
          onChange={(event) => {
            const value = event.target.value
            if (!value) {
              chain().unsetFontSize().run()
              return
            }
            chain().setFontSize(value).run()
          }}
          className={richEditorStyles.fontSelect}
        >
          <option value="">Кегль</option>
          {FONT_SIZES.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>

        <ColorPopoverControl
          label="Цвет текста"
          color={textColor}
          active={!!currentColor}
          icon={<LetterAUnderline />}
          recentColors={recentTextColors}
          onRecentColorsChange={onRecentTextColorsChange}
          onApplyColor={(value) => {
            onTextColorChange(value)
            chain().setColor(value).run()
          }}
          onClear={() => chain().unsetColor().run()}
        />

        <ColorPopoverControl
          label="Цвет маркера"
          color={highlightColor}
          active={editor.isActive('highlight')}
          icon={<Paintbrush />}
          recentColors={recentHighlightColors}
          onRecentColorsChange={onRecentHighlightColorsChange}
          onApplyColor={(value) => {
            onHighlightColorChange(value)
            chain().toggleHighlight({ color: value }).run()
          }}
          onClear={() => chain().unsetHighlight().run()}
        />
      </div>

      <Separator orientation="vertical" className={richEditorStyles.separator} />

      <div className={richEditorStyles.section}>
        <div className={richEditorStyles.buttonGroup}>
          <ToolbarButton
            onPress={() => chain().undo().run()}
            disabled={!editor.can().undo()}
            iconOnly
            label="Отменить"
          >
            <ArrowUturnCcwLeft />
          </ToolbarButton>
          <ToolbarButton
            onPress={() => chain().redo().run()}
            disabled={!editor.can().redo()}
            iconOnly
            label="Повторить"
          >
            <ArrowUturnCwRight />
          </ToolbarButton>
        </div>
      </div>
    </Toolbar>
  )
}
