import type { CSSProperties } from 'react'
import type { Meta, StoryObj } from '@storybook/react'

/**
 * Визуальный бренд-бук. Источник: `src/styles/tokens/brand-tokens.css`, мост Tailwind: `brand-tailwind-bridge.css`.
 */
const meta: Meta = {
  title: 'Docs/Brand book',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Токены `--brand-*` и классы `*-brand-*`. Тема — тулбар Storybook (светлая / тёмная).',
      },
    },
  },
}

export default meta

export const Tokens: StoryObj = {
  render: () => (
    <div className="min-h-screen bg-background p-8 text-foreground" style={{ fontFamily: 'var(--brand-font-sans)' }}>
      <div className="mx-auto max-w-5xl space-y-12">
        <header className="space-y-2">
          <h1
            className="text-3xl font-semibold tracking-tight"
            style={{ color: 'var(--brand-fg)' }}
          >
            Brand book
          </h1>
          <p className="max-w-2xl text-base leading-normal" style={{ color: 'var(--brand-fg-muted)' }}>
            CSS: <code className="rounded bg-brand-bg-muted px-1 font-mono text-sm">var(--brand-…)</code>
            . Tailwind: <code className="rounded bg-brand-bg-muted px-1 font-mono text-sm">bg-brand-accent</code>,{' '}
            <code className="rounded bg-brand-bg-muted px-1 font-mono text-sm">p-brand-4</code>,{' '}
            <code className="rounded bg-brand-bg-muted px-1 font-mono text-sm">shadow-brand-md</code>.
          </p>
        </header>

        <section className="space-y-4">
          <h2 className="border-b border-brand-border pb-2 text-xl" style={{ color: 'var(--brand-fg)' }}>
            Цвета
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <ColorSwatch name="accent" varName="--brand-accent" fgOnSwatch style={{ background: 'var(--brand-accent)' }} />
            <ColorSwatch name="accent muted" varName="--brand-accent-muted" style={{ background: 'var(--brand-accent-muted)' }} />
            <ColorSwatch name="bg" varName="--brand-bg" style={{ background: 'var(--brand-bg)' }} />
            <ColorSwatch name="bg elevated" varName="--brand-bg-elevated" style={{ background: 'var(--brand-bg-elevated)' }} />
            <ColorSwatch name="fg" varName="--brand-fg" style={{ background: 'var(--brand-fg)' }} lightText />
            <ColorSwatch name="fg muted" varName="--brand-fg-muted" textOnly style={{ color: 'var(--brand-fg-muted)' }} />
            <ColorSwatch name="border" varName="--brand-border" style={{ background: 'var(--brand-border)' }} />
            <ColorSwatch name="success" varName="--brand-success" fgOnSwatch style={{ background: 'var(--brand-success)' }} />
            <ColorSwatch name="warning" varName="--brand-warning" fgOnSwatch style={{ background: 'var(--brand-warning)' }} />
            <ColorSwatch name="danger" varName="--brand-danger" fgOnSwatch style={{ background: 'var(--brand-danger)' }} />
            <ColorSwatch name="info" varName="--brand-info" fgOnSwatch style={{ background: 'var(--brand-info)' }} />
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="border-b border-brand-border pb-2 text-xl" style={{ color: 'var(--brand-fg)' }}>
            Отступы (сетка 4px)
          </h2>
          <div className="flex flex-wrap items-end gap-6">
            {(['1', '2', '3', '4', '6', '8', '12', '16'] as const).map((step) => (
              <div key={step} className="flex flex-col items-center gap-1">
                <div
                  className="rounded-sm bg-brand-accent-muted"
                  style={{
                    width: `var(--brand-space-${step})`,
                    height: `var(--brand-space-${step})`,
                    minWidth: 4,
                    minHeight: 4,
                  }}
                />
                <span className="font-mono text-xs" style={{ color: 'var(--brand-fg-muted)' }}>
                  {step}
                </span>
              </div>
            ))}
          </div>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--brand-fg-muted)' }}>
            Через Tailwind те же шаги задаются утилитами{' '}
            <code className="rounded bg-brand-bg-muted px-1 font-mono text-xs">p-brand-*</code>,{' '}
            <code className="rounded bg-brand-bg-muted px-1 font-mono text-xs">m-brand-*</code>,{' '}
            <code className="rounded bg-brand-bg-muted px-1 font-mono text-xs">gap-brand-*</code> и т.д. (см.{' '}
            <code className="rounded bg-brand-bg-muted px-1 font-mono text-xs">brand-tailwind-bridge.css</code>).
          </p>
          <div className="flex flex-wrap items-end gap-6">
            <PaddingTailwindDemo step={2} />
            <PaddingTailwindDemo step={4} />
            <PaddingTailwindDemo step={8} />
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="border-b border-brand-border pb-2 text-xl" style={{ color: 'var(--brand-fg)' }}>
            Типографика
          </h2>
          <div
            className="space-y-3 rounded-xl border border-brand-border p-6"
            style={{ background: 'var(--brand-bg-elevated)' }}
          >
            <p className="text-4xl font-semibold leading-tight" style={{ color: 'var(--brand-fg)' }}>
              Display 4xl
            </p>
            <p className="text-3xl font-semibold leading-tight" style={{ color: 'var(--brand-fg)' }}>
              Heading 3xl
            </p>
            <p className="text-2xl leading-snug" style={{ color: 'var(--brand-fg)' }}>
              Title 2xl
            </p>
            <p className="text-xl leading-snug" style={{ color: 'var(--brand-fg)' }}>
              Subtitle xl
            </p>
            <p className="text-base leading-normal" style={{ color: 'var(--brand-fg)' }}>
              Body base — основной текст.
            </p>
            <p className="text-sm leading-normal" style={{ color: 'var(--brand-fg-muted)' }}>
              Body sm — вторичный текст.
            </p>
            <p className="font-mono text-sm" style={{ color: 'var(--brand-fg-muted)' }}>
              font-mono — код
            </p>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="border-b border-brand-border pb-2 text-xl" style={{ color: 'var(--brand-fg)' }}>
            Скругления
          </h2>
          <div className="flex flex-wrap gap-4">
            <RadiusDemo r="rounded-brand-sm" />
            <RadiusDemo r="rounded-brand-md" />
            <RadiusDemo r="rounded-brand-lg" />
            <RadiusDemo r="rounded-brand-xl" />
            <RadiusDemo r="rounded-brand-2xl" />
            <RadiusDemo r="rounded-brand-full" />
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="border-b border-brand-border pb-2 text-xl" style={{ color: 'var(--brand-fg)' }}>
            Тени
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <ShadowDemo c="shadow-brand-xs" />
            <ShadowDemo c="shadow-brand-sm" />
            <ShadowDemo c="shadow-brand-md" />
            <ShadowDemo c="shadow-brand-lg" />
            <ShadowDemo c="shadow-brand-xl" />
          </div>
        </section>

        <section className="space-y-4 pb-16">
          <h2 className="border-b border-brand-border pb-2 text-xl" style={{ color: 'var(--brand-fg)' }}>
            Motion
          </h2>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--brand-fg-muted)' }}>
            <code className="font-mono">--brand-duration-*</code>, <code className="font-mono">--brand-ease-*</code> — в CSS{' '}
            <code className="font-mono">transition</code>. В Tailwind: <code className="font-mono">duration-brand-fast</code>,{' '}
            <code className="font-mono">ease-brand-out</code>.
          </p>
        </section>
      </div>
    </div>
  ),
}

function ColorSwatch({
  name,
  varName,
  style,
  fgOnSwatch,
  lightText,
  textOnly,
}: {
  name: string
  varName: string
  style: CSSProperties
  fgOnSwatch?: boolean
  lightText?: boolean
  textOnly?: boolean
}) {
  const sample = 'Aa текст'
  const footer = (
    <div className="space-y-0.5 bg-brand-bg-elevated p-3">
      <p className="text-sm font-medium" style={{ color: 'var(--brand-fg)' }}>
        {name}
      </p>
      <p className="font-mono text-xs" style={{ color: 'var(--brand-fg-muted)' }}>
        {varName}
      </p>
    </div>
  )

  if (textOnly) {
    return (
      <div className="overflow-hidden rounded-lg border border-brand-border">
        <div className="flex h-24 items-center justify-center bg-brand-bg-muted p-4">
          <span className="text-lg" style={style}>
            {sample}
          </span>
        </div>
        {footer}
      </div>
    )
  }

  const textColor = fgOnSwatch
    ? 'var(--brand-fg-on-accent)'
    : lightText
      ? 'var(--brand-bg)'
      : 'var(--brand-fg)'

  return (
    <div className="overflow-hidden rounded-lg border border-brand-border">
      <div
        className="flex h-24 items-center justify-center px-3 text-center text-sm font-medium"
        style={{
          ...style,
          color: textColor,
        }}
      >
        {sample}
      </div>
      {footer}
    </div>
  )
}

function PaddingTailwindDemo({ step }: { step: 2 | 4 | 8 }) {
  const label = `p-brand-${step}`
  const box =
    step === 2 ? (
      <div className="rounded-sm bg-brand-accent-muted p-brand-2">
        <div className="h-3 w-3 rounded-sm bg-brand-accent" />
      </div>
    ) : step === 4 ? (
      <div className="rounded-sm bg-brand-accent-muted p-brand-4">
        <div className="h-3 w-3 rounded-sm bg-brand-accent" />
      </div>
    ) : (
      <div className="rounded-sm bg-brand-accent-muted p-brand-8">
        <div className="h-3 w-3 rounded-sm bg-brand-accent" />
      </div>
    )
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="rounded border border-dashed border-brand-border bg-brand-bg-muted p-1">{box}</div>
      <span className="font-mono text-xs" style={{ color: 'var(--brand-fg-muted)' }}>
        {label}
      </span>
    </div>
  )
}

function RadiusDemo({ r }: { r: string }) {
  const label = r.replace('rounded-brand-', '')
  return (
    <div className="flex flex-col items-center gap-1">
      <div className={`h-16 w-16 bg-brand-accent-muted ${r}`} />
      <span className="font-mono text-xs text-brand-fg-muted">{label}</span>
    </div>
  )
}

function ShadowDemo({ c }: { c: string }) {
  const label = c.replace('shadow-brand-', '')
  return (
    <div className={`rounded-lg bg-brand-bg-elevated p-6 ${c}`}>
      <span className="font-mono text-sm" style={{ color: 'var(--brand-fg)' }}>
        {c}
      </span>
      <p className="mt-1 text-xs" style={{ color: 'var(--brand-fg-muted)' }}>
        {label}
      </p>
    </div>
  )
}
