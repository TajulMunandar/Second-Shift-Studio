import { useLanguage } from '../i18n/LanguageContext.jsx'
import Reveal from './Reveal.jsx'

export default function FinalCta() {
  const { t } = useLanguage()
  return (
    <section className="section final" aria-label={t('final.titleA')}>
      <div className="wrap">
        <Reveal>
          <p className="display final-title">
            {t('final.titleA')}
            <br />
            <span>{t('final.titleB')}</span>
          </p>
        </Reveal>
        <Reveal delay={150}>
          <div className="final-row">
            <a href="#order" className="btn btn-primary btn-big">
              {t('final.btn')} <span className="arr" aria-hidden="true">→</span>
            </a>
            <p className="final-note">{t('final.note')}</p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
