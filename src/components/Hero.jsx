import { useEffect, useState } from 'react'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import KeychainFigure from './KeychainFigure.jsx'
import './Hero.css'

export default function Hero() {
  const { t } = useLanguage()
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const frame = requestAnimationFrame(() => setLoaded(true))
    return () => cancelAnimationFrame(frame)
  }, [])

  const tickerItems = t('hero.ticker')
  const tickerText = Array.isArray(tickerItems) ? tickerItems.join(' ★ ') : ''
  const titleLines = t('hero.titleLines')
  const lines = Array.isArray(titleLines) ? titleLines : ['Second', 'Shift', 'Studio']

  return (
    <section id="top" className={`hero${loaded ? ' is-loaded' : ''}`} aria-label="Intro">
      <div className="hero-grid-bg" aria-hidden="true" />
      <div className="wrap hero-wrap">
        <div className="hero-type">
          <p className="sticker hero-sticker" data-anim="1">
            <span aria-hidden="true">★</span> Second Shift Studio
          </p>
          <h1 className="display hero-title">
            <span className="hero-line" data-anim="2">
              {lines[0]}
            </span>
            <span className="hero-line" data-anim="3">
              {lines[1]}
            </span>
            <span
              className="hero-line hero-line-outline"
              data-anim="4"
              aria-label={lines[2]}
            >
              {lines[2]}
            </span>
          </h1>
          <p className="hero-sub" data-anim="5">
            {t('hero.sub')} <strong>{t('hero.subStrong')}</strong>
          </p>
          <div className="hero-ctas" data-anim="6">
            <a href="#work" className="btn btn-ink">
              {t('hero.ctaWork')} <span className="arr" aria-hidden="true">→</span>
            </a>
            <a href="#order" className="btn btn-primary">
              {t('hero.ctaOrder')} <span className="arr" aria-hidden="true">→</span>
            </a>
          </div>
          <dl className="hero-meta" data-anim="7">
            <div>
              <dt>{t('hero.metaFinishLabel')}</dt>
              <dd>{t('hero.metaFinishValue')}</dd>
            </div>
            <div>
              <dt>{t('hero.metaSizeLabel')}</dt>
              <dd>{t('hero.metaSizeValue')}</dd>
            </div>
            <div>
              <dt>{t('hero.metaViaLabel')}</dt>
              <dd>{t('hero.metaViaValue')}</dd>
            </div>
          </dl>
        </div>

        <div className="hero-visual" data-anim="5" aria-label={t('hero.visualLabel')}>
          <figure className="hero-key main">
            <KeychainFigure variant="blue" label={t('hero.tagMain')} />
            <figcaption className="sticker sticker-blue hero-tag tag-a">
              {t('hero.tagMain')}
            </figcaption>
          </figure>
          <figure className="hero-key alt" aria-hidden="true">
            <KeychainFigure variant="paper" label="" />
            <figcaption className="sticker hero-tag tag-b">5 × 2 cm</figcaption>
          </figure>
          <p className="sticker hero-tag tag-c" aria-hidden="true">
            {t('hero.tagHere')}
          </p>
        </div>
      </div>

      <div className="ticker hero-ticker" aria-hidden="true">
        <div className="ticker-track">
          {[0, 1].map((half) => (
            <span key={half}>
              {tickerText} ★ {tickerText} ★&nbsp;
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
