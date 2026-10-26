import type { Editor } from '@tiptap/core'
import { BubbleMenu } from '@tiptap/react/menus'
import {
  Bold,
  Italic,
  LetterAUnderline,
  Paintbrush,
  Strikethrough,
  TextAlignCenter,
  TextAlignLeft,
  TextAlignRight,
  Underline,
} from '@gravity-ui/icons'
import { FONT_SIZES } from './constants'
import { ColorPopoverControl } from './components/ColorPopoverControl'
import { ImageCaptionPopoverControl } from './components/ImageCaptionPopoverControl'
import { LinkPopoverControl } from './components/LinkPopoverControl'
import { ToolbarButton } from './components/ToolbarButton'
import { richEditorStyles } from './richEditorStyles'

type RichEditorBubbleMenuProps = {
  editor: Editor
  currentAlign: string
  currentColor?: string
  currentFontSize?: string
  textColor: string
  highlightColor: string
  recentTextColors: string[]
  onRecentTextColorsChange: (colors: string[]) => void
  recentHighlightColors: string[]
  onRecentHighlightColorsChange: (colors: string[]) => void
  onTextColorChange: (value: string) => void
  onHighlightColorChange: (value: string) => void
  options: { placement: 'top'; offset: number }
}

export function RichEditorBubbleMenu({
  editor,
  currentAlign,
  currentColor,
  currentFontSize,
  textColor,
  highlightColor,
  recentTextColors,
  onRecentTextColorsChange,
  recentHighlightColors,
  onRecentHighlightColorsChange,
  onTextColorChange,
  onHighlightColorChange,
  options,
}: RichEditorBubbleMenuProps) {
  const chain = () => editor.chain().focus()

  return (
    <BubbleMenu editor={editor} className={richEditorStyles.bubble} options={options}>
      <div className={richEditorStyles.buttonGroup}>
        <ToolbarButton
          onPress={() => chain().toggleBold().run()}
          active={editor.isActive('bold')}
          iconOnly
          label="Жирный"
        >
          <Bold />
        </ToolbarButton>
        <ToolbarButton
          onPress={() => chain().toggleItalic().run()}
          active={editor.isActive('italic')}
          iconOnly
          label="Курсив"
        >
          <Italic />
        </ToolbarButton>
        <ToolbarButton
          onPress={() => chain().toggleUnderline().run()}
          active={editor.isActive('underline')}
          iconOnly
          label="Подчёркивание"
        >
          <Underline />
        </ToolbarButton>
        <ToolbarButton
          onPress={() => chain().toggleStrike().run()}
          active={editor.isActive('strike')}
          iconOnly
          label="Зачёркивание"
        >
          <Strikethrough />
        </ToolbarButton>
        <LinkPopoverControl editor={editor} />
        <ImageCaptionPopoverControl editor={editor} />
      </div>
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
      </div>
      <select
        value={currentFontSize ?? ''}
        onChange={(event) => {
          const value = event.target.value
          if (!value) {
            chain().unsetFontSize().run()
          } else {
            chain().setFontSize(value).run()
          }
        }}
        className={`${richEditorStyles.fontSelect} RichEditor-fontSelectBubble`}
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
    </BubbleMenu>
  )
}
