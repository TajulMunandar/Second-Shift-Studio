import { useLanguage } from '../i18n/LanguageContext.jsx'
import { socials } from '../data/socials.js'

export default function Footer() {
  const { t } = useLanguage()
  const baseSections = [t('nav.home'), t('nav.work'), t('nav.order'), t('nav.social')].join(
    ' · ',
  )
  return (
    <footer className="footer">
      <div className="wrap footer-grid">
        <div className="footer-brand">
          <p className="display footer-logo">
            Second Shift
            <br />
            Studio
          </p>
          <p className="footer-tag">
            {t('footer.tagA')}
            <br />
            {t('footer.tagB')}
          </p>
        </div>
        <nav className="footer-nav" aria-label={t('footer.navLabel')}>
          <a href="#work">{t('nav.work')}</a>
          <a href="#process">{t('nav.process')}</a>
          <a href="#order">{t('nav.order')}</a>
          <a href="#social">{t('nav.social')}</a>
        </nav>
        <div className="footer-contact">
          <a href={socials.whatsapp} target="_blank" rel="noreferrer" className="btn btn-ink btn-sm">
            {t('footer.chat')}
          </a>
          <p className="footer-small">{t('footer.small')}</p>
        </div>
      </div>
      <div className="wrap footer-base">
        <p>
          {t('footer.poweredBy')}{' '}
          <a
            href="https://developerdadakan.com/"
            target="_blank"
            rel="noreferrer"
          >
            Developer Dadakan
          </a>
        </p>
        <p>{baseSections}</p>
      </div>
    </footer>
  )
}
