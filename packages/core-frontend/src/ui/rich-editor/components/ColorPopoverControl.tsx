import { useMemo, useState, type CSSProperties, type ReactNode } from 'react'
import {
  Button,
  ColorArea,
  ColorPicker,
  ColorSlider,
  ColorSwatchPicker,
  Popover,
  parseColor,
} from '@heroui/react'
import { DEFAULT_RECENT_COLORS } from '../constants'
import { richEditorStyles } from '../richEditorStyles'

type ColorPopoverControlProps = {
  label: string
  color: string
  active?: boolean
  icon: ReactNode
  onApplyColor: (value: string) => void
  onClear: () => void
  /** Вместе с onRecentColorsChange — общий список «недавних» (например, тулбар и bubble) */
  recentColors?: string[]
  onRecentColorsChange?: (colors: string[]) => void
}

function normalizeHex(value: string): string | null {
  const raw = value.trim().toLowerCase()
  if (/^#[0-9a-f]{6}$/.test(raw)) return raw
  if (/^#[0-9a-f]{3}$/.test(raw)) {
    return `#${raw[1]}${raw[1]}${raw[2]}${raw[2]}${raw[3]}${raw[3]}`
  }
  return null
}

export function ColorPopoverControl({
  label,
  color,
  active,
  icon,
  onApplyColor,
  onClear,
  recentColors: recentColorsProp,
  onRecentColorsChange,
}: ColorPopoverControlProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [draftColor, setDraftColor] = useState(color)
  const [internalRecent, setInternalRecent] = useState<string[]>(DEFAULT_RECENT_COLORS)

  const isRecentControlled =
    recentColorsProp !== undefined && onRecentColorsChange !== undefined
  const recentColors = isRecentControlled ? recentColorsProp : internalRecent

  const displayedRecents = useMemo(() => {
    const padded = [...recentColors]
    while (padded.length < 6) {
      padded.push('#ffffff')
    }
    return padded.slice(0, 6)
  }, [recentColors])

  const pushRecentColor = (value: string) => {
    const normalized = value.toLowerCase()
    const next = (prev: string[]) => {
      const deduped = prev.filter((colorValue) => colorValue.toLowerCase() !== normalized)
      return [normalized, ...deduped].slice(0, 6)
    }
    if (isRecentControlled) {
      onRecentColorsChange(next(recentColors))
    } else {
      setInternalRecent((prev) => next(prev))
    }
  }

  return (
    <Popover
      isOpen={isOpen}
      onOpenChange={(next) => {
        setIsOpen(next)
        if (next) {
          setDraftColor(color)
        }
      }}
    >
      <Popover.Trigger aria-label={label}>
        <Button
          size="sm"
          variant={active ? 'secondary' : 'tertiary'}
          isIconOnly
          aria-label={label}
          className={`${richEditorStyles.button} ${richEditorStyles.buttonIcon} RichEditor-colorBtn`}
          style={
            {
              ['--RichEditor-swatch' as string]: color,
            } as CSSProperties
          }
        >
          {icon}
        </Button>
      </Popover.Trigger>
      <Popover.Content className="RichEditor-colorPopover">
        <Popover.Dialog>
          <Popover.Arrow />
          <div className="RichEditor-colorPopoverBody">
            <ColorPicker
              className="flex w-full flex-col gap-2"
              value={parseColor(normalizeHex(draftColor) ?? color)}
              onChange={(next) => setDraftColor(next.toString('hex'))}
            >
              <ColorArea
                aria-label={`${label} палитра`}
                className="RichEditor-colorArea"
                colorSpace="hsb"
                xChannel="saturation"
                yChannel="brightness"
              >
                <ColorArea.Thumb />
              </ColorArea>
              <ColorSlider
                aria-label={`${label} тон`}
                channel="hue"
                className="RichEditor-colorHue w-full min-w-0"
                colorSpace="hsb"
                orientation="horizontal"
              >
                <ColorSlider.Track>
                  <ColorSlider.Thumb />
                </ColorSlider.Track>
              </ColorSlider>
            </ColorPicker>
            <div className="RichEditor-colorLabel">Недавние</div>
            <ColorSwatchPicker
              aria-label={`${label} недавние цвета`}
              className="RichEditor-colorPalette"
              size="xs"
              onChange={(next) => setDraftColor(next.toString('hex'))}
            >
              {displayedRecents.map((preset, idx) => (
                <ColorSwatchPicker.Item key={`${preset}-${idx}`} color={preset}>
                  <ColorSwatchPicker.Swatch className="RichEditor-colorSwatch" />
                </ColorSwatchPicker.Item>
              ))}
            </ColorSwatchPicker>
            <div className="RichEditor-popoverActions">
              <Button
                size="sm"
                variant="secondary"
                onPress={() => {
                  const normalized = normalizeHex(draftColor) ?? color
                  onApplyColor(normalized)
                  pushRecentColor(normalized)
                  setIsOpen(false)
                }}
              >
                Применить
              </Button>
              <Button
                size="sm"
                variant="tertiary"
                onPress={() => {
                  onClear()
                  setIsOpen(false)
                }}
              >
                Очистить
              </Button>
            </div>
          </div>
        </Popover.Dialog>
      </Popover.Content>
    </Popover>
  )
}
