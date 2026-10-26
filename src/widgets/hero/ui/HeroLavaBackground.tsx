/**
 * Декоративный фон Hero: зелёные блобы с плавной анимацией «лава-лампа».
 * Не интерактивный (pointer-events: none), только визуал.
 */
export function HeroLavaBackground() {
  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ transform: 'translateZ(0)' }}
      aria-hidden
    >
      {/* Блобы: на мобилке мельче и приглушённее, с md — как на десктопе */}
      <div
        className="hero-blob-3d hero-blob-mobile absolute w-[min(38vw,140px)] h-[min(38vw,140px)] md:w-[min(90vw,520px)] md:h-[min(90vw,520px)] rounded-[32%_68%_58%_42%/62%_38%_62%_38%]"
        style={{
          top: '-5%',
          right: '-10%',
          ['--blob-base' as string]: 'rgba(52, 211, 153, 0.78)',
          ['--blob-highlight' as string]: 'rgba(255, 255, 255, 0.28)',
          ['--blob-specular' as string]: 'rgba(255, 255, 255, 0.5)',
          ['--blob-shadow' as string]: 'rgba(0, 0, 0, 0.18)',
          animation:
            'hero-lava-rise 28s ease-in-out 0s infinite, hero-lava-morph 28s ease-in-out 0s infinite',
        }}
      />
      <div
        className="hero-blob-3d hero-blob-mobile absolute w-[min(32vw,120px)] h-[min(32vw,120px)] md:w-[min(70vw,380px)] md:h-[min(70vw,380px)] rounded-[60%_40%_50%_50%/50%_60%_40%_50%]"
        style={{
          bottom: '-5%',
          left: '-8%',
          ['--blob-base' as string]: 'rgba(45, 212, 191, 0.72)',
          ['--blob-highlight' as string]: 'rgba(255, 255, 255, 0.26)',
          ['--blob-specular' as string]: 'rgba(255, 255, 255, 0.48)',
          ['--blob-shadow' as string]: 'rgba(0, 0, 0, 0.16)',
          animation:
            'hero-lava-sink 32s ease-in-out 0s infinite, hero-lava-morph 32s ease-in-out 0s infinite',
        }}
      />
      <div
        className="hero-blob-3d hero-blob-mobile absolute w-[min(28vw,100px)] h-[min(28vw,100px)] md:w-[min(50vw,280px)] md:h-[min(50vw,280px)] rounded-[45%_55%_60%_40%/55%_45%_55%_45%]"
        style={{
          top: '45%',
          left: '10%',
          ['--blob-base' as string]: 'rgba(110, 231, 183, 0.75)',
          ['--blob-highlight' as string]: 'rgba(255, 255, 255, 0.24)',
          ['--blob-specular' as string]: 'rgba(255, 255, 255, 0.44)',
          ['--blob-shadow' as string]: 'rgba(0, 0, 0, 0.14)',
          animation:
            'hero-lava-sink 30s ease-in-out 0s infinite, hero-lava-morph 30s ease-in-out 0s infinite',
        }}
      />
      <div
        className="hero-blob-3d hero-blob-mobile absolute w-[min(24vw,88px)] h-[min(24vw,88px)] md:w-[min(45vw,240px)] md:h-[min(45vw,240px)] rounded-[50%_50%_45%_55%/55%_45%_50%_50%]"
        style={{
          top: '5%',
          right: '20%',
          ['--blob-base' as string]: 'rgba(94, 234, 212, 0.7)',
          ['--blob-highlight' as string]: 'rgba(255, 255, 255, 0.25)',
          ['--blob-specular' as string]: 'rgba(255, 255, 255, 0.45)',
          ['--blob-shadow' as string]: 'rgba(0, 0, 0, 0.12)',
          animation:
            'hero-lava-rise 26s ease-in-out 0s infinite, hero-lava-morph 26s ease-in-out 0s infinite',
        }}
      />
      <div
        className="hero-blob-3d hero-blob-mobile absolute w-[min(20vw,72px)] h-[min(20vw,72px)] md:w-[min(35vw,180px)] md:h-[min(35vw,180px)] rounded-[55%_45%_50%_50%/45%_55%_45%_55%]"
        style={{
          bottom: '15%',
          right: '15%',
          ['--blob-base' as string]: 'rgba(110, 231, 183, 0.68)',
          ['--blob-highlight' as string]: 'rgba(255, 255, 255, 0.22)',
          ['--blob-specular' as string]: 'rgba(255, 255, 255, 0.4)',
          ['--blob-shadow' as string]: 'rgba(0, 0, 0, 0.12)',
          animation:
            'hero-lava-rise 24s ease-in-out 0s infinite, hero-lava-morph 24s ease-in-out 0s infinite',
        }}
      />
    </div>
  )
}
