import { useLanguage } from '../i18n/LanguageContext.jsx'
import Reveal from './Reveal.jsx'

export default function BrandIntro() {
  const { t } = useLanguage()
  return (
    <section className="section intro" aria-label="About Second Shift Studio">
      <div className="wrap intro-wrap">
        <Reveal>
          <p className="kicker">{t('intro.kicker')}</p>
        </Reveal>
        <Reveal delay={120}>
          <p className="display intro-statement">
            {t('intro.statementA')} <span>{t('intro.statementB')}</span>
          </p>
        </Reveal>
        <Reveal delay={220}>
          <div className="intro-cols">
            <p>{t('intro.colA')}</p>
            <p>{t('intro.colB')}</p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
