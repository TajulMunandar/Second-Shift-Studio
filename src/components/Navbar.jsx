import { useEffect, useState } from 'react'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import LanguageSwitcher from './LanguageSwitcher.jsx'
import './Navbar.css'

export default function Navbar() {
  const { t } = useLanguage()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const LINKS = [
    { href: '#top', label: t('nav.home') },
    { href: '#work', label: t('nav.work') },
    { href: '#process', label: t('nav.process') },
    { href: '#order', label: t('nav.order') },
    { href: '#social', label: t('nav.social') },
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`nav${scrolled ? ' is-scrolled' : ''}`}>
      <div className="nav-inner">
        <a href="#top" className="nav-brand" aria-label={t('nav.brandBack')}>
          <img
            src="/logo.png"
            alt="Second Shift Studio"
            className="nav-logo"
            width="1920"
            height="960"
          />
        </a>

        <nav className="nav-links" aria-label={t('nav.primaryLabel')}>
          {LINKS.slice(1).map((l) => (
            <a key={l.href} href={l.href} className="nav-link">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="nav-cta">
          <LanguageSwitcher />
          <a href="#order" className="btn btn-primary btn-sm">
            {t('nav.cta')}
          </a>
          <button
            type="button"
            className={`nav-burger${open ? ' is-open' : ''}`}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t('nav.closeMenu') : t('nav.openMenu')}
            onClick={() => setOpen((v) => !v)}
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </button>
        </div>
      </div>

      <nav
        id="mobile-menu"
        className={`nav-mobile${open ? ' is-open' : ''}`}
        aria-label={t('nav.mobileLabel')}
      >
        {LINKS.map((l, i) => (
          <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
            <span className="nav-mobile-no" aria-hidden="true">
              0{i + 1}
            </span>
            {l.label}
          </a>
        ))}
        <a href="#order" className="btn btn-primary" onClick={() => setOpen(false)}>
          {t('nav.cta')} <span className="arr" aria-hidden="true">→</span>
        </a>
      </nav>
    </header>
  )
}
